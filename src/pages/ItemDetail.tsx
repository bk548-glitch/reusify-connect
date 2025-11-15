import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, User, Calendar, Package } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";

interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  quantity: number;
  image_url: string | null;
  created_at: string;
  user_id: string;
  profiles?: {
    display_name: string;
  };
}

const ItemDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select(`
          *,
          profiles (
            display_name
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      setItem(data);
    } catch (error) {
      console.error('Error fetching item:', error);
      toast.error("Failed to load item");
      navigate("/browse");
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = () => {
    toast.success("Request sent! The owner will be notified.");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading item...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Item not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/browse")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Browse
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-accent flex items-center justify-center">
                  <Package className="h-32 w-32 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {item.title}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="default" className="text-base px-4 py-1">
                  {item.category}
                </Badge>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{item.location}</span>
                </div>
                {item.quantity > 1 && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Package className="h-4 w-4" />
                    <span>Qty: {item.quantity}</span>
                  </div>
                )}
              </div>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description || "No description provided."}
                  </p>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Posted by {item.profiles?.display_name || "Anonymous"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              size="lg" 
              className="w-full"
              onClick={handleRequest}
            >
              Request This Item
            </Button>

            <p className="text-sm text-muted-foreground text-center">
              Your request will be sent to the owner. They'll contact you with pickup details.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="overflow-hidden cursor-pointer transition-all hover:shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400"
                alt="Similar item"
                className="w-full aspect-video object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold">Oak Dining Table</h3>
                <p className="text-sm text-muted-foreground">Manhattan, NY</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden cursor-pointer transition-all hover:shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400"
                alt="Similar item"
                className="w-full aspect-video object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold">Wooden Bookshelf</h3>
                <p className="text-sm text-muted-foreground">Queens, NY</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden cursor-pointer transition-all hover:shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=400"
                alt="Similar item"
                className="w-full aspect-video object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-semibold">Vintage Cabinet</h3>
                <p className="text-sm text-muted-foreground">Bronx, NY</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ItemDetail;
