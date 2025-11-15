import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";

interface Conversation {
  id: string;
  item_id: string;
  requester_id: string;
  owner_id: string;
  created_at: string;
  items: {
    title: string;
  };
  requester_profile: {
    display_name: string;
  };
  owner_profile: {
    display_name: string;
  };
}

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

const Messages = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchConversations();
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
      subscribeToMessages(selectedConversation);
    }
  }, [selectedConversation]);

  const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setCurrentUserId(user?.id || null);
  };

  const fetchConversations = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase
        .from('conversations')
        .select(`
          *,
          items:item_id (title),
          requester_profile:profiles!conversations_requester_id_fkey (display_name),
          owner_profile:profiles!conversations_owner_id_fkey (display_name)
        `)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Conversation fetch error:', error);
        throw error;
      }
      
      console.log('Fetched conversations:', data);
      setConversations(data || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      toast.error("Failed to load conversations");
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error("Failed to load messages");
    }
  };

  const subscribeToMessages = (conversationId: string) => {
    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        },
        (payload) => {
          setMessages(prev => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('messages')
        .insert({
          conversation_id: selectedConversation,
          sender_id: user.id,
          content: newMessage.trim()
        });

      if (error) throw error;

      setNewMessage("");
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("Failed to send message");
    }
  };

  const getOtherUserName = (conversation: Conversation) => {
    if (currentUserId === conversation.requester_id) {
      return conversation.owner_profile?.display_name || 'Owner';
    }
    return conversation.requester_profile?.display_name || 'Requester';
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        backButton={{
          label: "Back to Browse",
          icon: ArrowLeft,
          onClick: () => navigate("/browse")
        }}
      />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-foreground">Messages</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="col-span-1 overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-y-auto h-full">
                {conversations.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No conversations yet
                  </div>
                ) : (
                  conversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`w-full p-4 text-left border-b hover:bg-accent transition-colors ${
                        selectedConversation === conversation.id ? 'bg-accent' : ''
                      }`}
                    >
                      <p className="font-semibold mb-1">{getOtherUserName(conversation)}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.items?.title}
                      </p>
                    </button>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="col-span-1 md:col-span-2 overflow-hidden flex flex-col">
            {selectedConv ? (
              <>
                <div className="p-4 border-b bg-accent">
                  <h2 className="font-semibold">{getOtherUserName(selectedConv)}</h2>
                  <p className="text-sm text-muted-foreground">{selectedConv.items?.title}</p>
                </div>

                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender_id === currentUserId ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender_id === currentUserId
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-accent'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {new Date(message.created_at).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>

                <form onSubmit={sendMessage} className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Select a conversation to start chatting
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Messages;
