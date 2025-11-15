-- Create conversations table if not exists
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
  requester_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(item_id, requester_id)
);

-- Create messages table if not exists
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS policies for conversations
CREATE POLICY "Users can view their own conversations"
ON public.conversations
FOR SELECT
USING (auth.uid() = requester_id OR auth.uid() = owner_id);

CREATE POLICY "Users can create conversations"
ON public.conversations
FOR INSERT
WITH CHECK (auth.uid() = requester_id);

-- RLS policies for messages
CREATE POLICY "Users can view messages in their conversations"
ON public.messages
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.conversations
    WHERE conversations.id = messages.conversation_id
    AND (conversations.requester_id = auth.uid() OR conversations.owner_id = auth.uid())
  )
);

CREATE POLICY "Users can send messages in their conversations"
ON public.messages
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.conversations
    WHERE conversations.id = messages.conversation_id
    AND (conversations.requester_id = auth.uid() OR conversations.owner_id = auth.uid())
  )
  AND auth.uid() = sender_id
);

-- Update create_request_notification function to also create conversation
CREATE OR REPLACE FUNCTION public.create_request_notification()
RETURNS TRIGGER AS $$
DECLARE
  v_conversation_id UUID;
BEGIN
  -- Create notification for item owner
  INSERT INTO public.notifications (
    user_id,
    type,
    title,
    message,
    item_id,
    request_id
  )
  SELECT
    items.user_id,
    'item_request',
    'New Item Request',
    'Someone is interested in your item: ' || items.title,
    NEW.item_id,
    NEW.id
  FROM public.items
  WHERE items.id = NEW.item_id;
  
  -- Create conversation between requester and owner
  INSERT INTO public.conversations (
    item_id,
    requester_id,
    owner_id
  )
  SELECT
    NEW.item_id,
    NEW.requester_id,
    items.user_id
  FROM public.items
  WHERE items.id = NEW.item_id
  ON CONFLICT (item_id, requester_id) DO NOTHING
  RETURNING id INTO v_conversation_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for updated_at on conversations
CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON public.conversations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for messages and conversations
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.conversations;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_conversations_requester_id ON public.conversations(requester_id);
CREATE INDEX IF NOT EXISTS idx_conversations_owner_id ON public.conversations(owner_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON public.messages(sender_id);