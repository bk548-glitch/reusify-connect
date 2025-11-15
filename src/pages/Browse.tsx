import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Sparkles, MapPin, Package, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
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
}

const Browse = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch items from database
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setItems(data || []);
      setFilteredItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast.error("Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  const handleAISearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: { query: searchQuery, items }
      });

      if (error) throw error;

      if (data.rankedIds && data.rankedIds.length > 0) {
        const ranked = data.rankedIds
          .map((index: number) => items[index - 1])
          .filter(Boolean);
        setFilteredItems(ranked);
        toast.success(`Found ${ranked.length} relevant items`);
      } else {
        setFilteredItems([]);
        toast.info("No matching items found");
      }
    } catch (error) {
      console.error('Error with AI search:', error);
      toast.error("AI search failed. Try basic search instead.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleBasicSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredItems(items);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = items.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query)
    );
    setFilteredItems(filtered);
    toast.success(`Found ${filtered.length} items`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Browse Materials</h1>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading items...</p>
          </div>
        ) : (
          <>
            <div className="mb-8 max-w-2xl">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search for materials... (e.g., '10 glass jars', 'wooden tables')"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleBasicSearch()}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleBasicSearch} variant="secondary">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button 
                  onClick={handleAISearch}
                  disabled={isSearching}
                  className="gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  {isSearching ? "Searching..." : "AI Search"}
                </Button>
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  {items.length === 0 
                    ? "No items listed yet. Be the first to list an item!" 
                    : "No items found. Try a different search."}
                </p>
                <Button onClick={() => navigate("/upload")}>
                  List an Item
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card 
                    key={item.id} 
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/item/${item.id}`)}
                  >
                    {item.image_url ? (
                      <img 
                        src={item.image_url} 
                        alt={item.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-accent flex items-center justify-center">
                        <Package className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                        <Badge variant="secondary">{item.category}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {item.location}
                        </div>
                        {item.quantity > 1 && (
                          <div className="flex items-center gap-1">
                            <Package className="h-4 w-4" />
                            Qty: {item.quantity}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Browse;
