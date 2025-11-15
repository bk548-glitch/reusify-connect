-- Create item_requests table
CREATE TABLE public.item_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  item_id UUID NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
  requester_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  item_id UUID REFERENCES public.items(id) ON DELETE CASCADE,
  request_id UUID REFERENCES public.item_requests(id) ON DELETE CASCADE,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.item_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS policies for item_requests
CREATE POLICY "Users can view requests for their items"
ON public.item_requests
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.items
    WHERE items.id = item_requests.item_id
    AND items.user_id = auth.uid()
  )
  OR requester_id = auth.uid()
);

CREATE POLICY "Users can create requests"
ON public.item_requests
FOR INSERT
WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update their own requests"
ON public.item_requests
FOR UPDATE
USING (auth.uid() = requester_id);

-- RLS policies for notifications
CREATE POLICY "Users can view their own notifications"
ON public.notifications
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
ON public.notifications
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
ON public.notifications
FOR INSERT
WITH CHECK (true);

-- Function to create notification when request is made
CREATE OR REPLACE FUNCTION public.create_request_notification()
RETURNS TRIGGER AS $$
BEGIN
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
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger to create notification on new request
CREATE TRIGGER on_item_request_created
  AFTER INSERT ON public.item_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.create_request_notification();

-- Trigger to update updated_at on item_requests
CREATE TRIGGER update_item_requests_updated_at
  BEFORE UPDATE ON public.item_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Create indexes for better performance
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(read);
CREATE INDEX idx_item_requests_item_id ON public.item_requests(item_id);
CREATE INDEX idx_item_requests_requester_id ON public.item_requests(requester_id);