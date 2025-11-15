import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Search, MapPin, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "All",
  "Furniture",
  "Electronics",
  "Textiles",
  "Building Materials",
  "Art Supplies",
  "Kitchen Items",
  "Tools",
  "Books",
  "Toys",
  "Other",
];

const mockItems = [
  {
    id: 1,
    title: "Leftover Plywood Sheets",
    category: "Building Materials",
    location: "Brooklyn Construction Site",
    image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=400",
    description: '20+ sheets of 3/4" plywood from residential project. Good condition, some minor cuts.',
    quantity: "20 sheets",
  },
  {
    id: 2,
    title: "Lab Equipment - Beakers & Glassware",
    category: "Other",
    location: "NYU Chemistry Lab",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400",
    description:
      "College clearing old lab equipment. 50+ glass beakers (various sizes), 30 test tubes, 15 glass jars with lids.",
    quantity: "50+ beakers, 30 test tubes, 15 jars",
  },
  {
    id: 3,
    title: "Metal Sheet Offcuts",
    category: "Building Materials",
    location: "Queens Manufacturing Plant",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400",
    description:
      "Aluminum and steel sheet offcuts from manufacturing. Perfect for small projects. 100+ pieces available.",
    quantity: "100+ pieces",
  },
  {
    id: 4,
    title: "Fabric Remnants - Designer Textiles",
    category: "Textiles",
    location: "Manhattan Fashion District",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    description:
      "High-quality fabric scraps from garment production. Great for quilting, crafts, upholstery. 200+ yards total.",
    quantity: "200+ yards",
  },
  {
    id: 5,
    title: "Reclaimed Wood Pallets",
    category: "Building Materials",
    location: "Bronx Warehouse",
    image: "https://images.unsplash.com/photo-1601366315781-1495e0bc9461?w=400",
    description: "Clean wooden pallets ready for upcycling into furniture or garden projects. 50 pallets available.",
    quantity: "50 pallets",
  },
  {
    id: 6,
    title: "Office Furniture - Desks & Chairs",
    category: "Furniture",
    location: "Manhattan Office Building",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400",
    description: "Company downsizing. 25 quality office chairs and 15 desks available for nonprofits/schools.",
    quantity: "25 chairs, 15 desks",
  },
  {
    id: 7,
    title: "Paint & Art Supplies",
    category: "Art Supplies",
    location: "Brooklyn Art Studio",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
    description:
      "Artist clearing studio. 40+ tubes of acrylic paints, 20 brushes, 10 blank canvases, and other supplies.",
    quantity: "40+ paint tubes, 20 brushes, 10 canvases",
  },
  {
    id: 8,
    title: "Kitchen Appliances",
    category: "Electronics",
    location: "Staten Island",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    description: "Moving sale - 2 microwaves, 3 toasters, 2 blenders, 4 coffee makers. All working condition.",
    quantity: "11 appliances total",
  },
  {
    id: 9,
    title: "PVC Pipes & Fittings",
    category: "Building Materials",
    location: "Queens Plumbing Supply",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400",
    description: "Leftover plumbing materials from construction jobs. Various sizes and fittings. 200+ feet of pipe.",
    quantity: "200+ feet",
  },
  {
    id: 10,
    title: "Textbooks & Educational Materials",
    category: "Books",
    location: "Columbia University",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    description: "College library donation. 300+ science, math, and engineering textbooks available for schools.",
    quantity: "300+ books",
  },
  {
    id: 11,
    title: "Ceramic Tiles - Various Colors",
    category: "Building Materials",
    location: "Brooklyn Renovation Site",
    image: "https://images.unsplash.com/photo-1615873968403-89e068629265?w=400",
    description: "Leftover ceramic tiles from bathroom renovation. Mix of colors and patterns. 500+ tiles.",
    quantity: "500+ tiles",
  },
  {
    id: 12,
    title: "Electronics - Computers & Monitors",
    category: "Electronics",
    location: "Manhattan Tech Company",
    image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=400",
    description: "Tech company upgrade. 30 working desktops and 40 monitors available for nonprofits.",
    quantity: "30 computers, 40 monitors",
  },
  {
    id: 13,
    title: "Glass Jars & Containers",
    category: "Kitchen Items",
    location: "Queens Restaurant Supply",
    image: "https://images.unsplash.com/photo-1505944357793-35f4ed44a0b0?w=400",
    description:
      "Restaurant closing. 100+ glass jars with lids (various sizes from 8oz to 32oz). Perfect for storage, canning, or crafts.",
    quantity: "100+ glass jars",
  },
  {
    id: 14,
    title: "Cardboard Boxes & Packing Materials",
    category: "Other",
    location: "Brooklyn Shipping Warehouse",
    image: "https://images.unsplash.com/photo-1605900283622-b38b9c3c5c4f?w=400",
    description: "Moving boxes, bubble wrap, packing paper. 200+ boxes in various sizes, great for moving or storage.",
    quantity: "200+ boxes",
  },
  {
    id: 15,
    title: "Plant Pots & Garden Supplies",
    category: "Other",
    location: "Bronx Garden Center",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
    description: "Nursery clearance. 150+ plastic and ceramic plant pots, trays, soil bags, and garden tools.",
    quantity: "150+ pots",
  },
  {
    id: 16,
    title: "Electrical Wire & Components",
    category: "Building Materials",
    location: "Manhattan Electrician",
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400",
    description: "Leftover from commercial projects. 1000+ feet of copper wire, outlets, switches, and junction boxes.",
    quantity: "1000+ feet wire",
  },
  {
    id: 17,
    title: "Foam & Upholstery Materials",
    category: "Textiles",
    location: "Queens Furniture Shop",
    image: "https://images.unsplash.com/photo-1567016546367-1dfdc8b43fe9?w=400",
    description:
      "Furniture maker retiring. High-density foam, batting, upholstery fabric, and tools. 50+ sheets of foam.",
    quantity: "50+ foam sheets",
  },
  {
    id: 18,
    title: "Mason Jars & Canning Supplies",
    category: "Kitchen Items",
    location: "Staten Island Home",
    image: "https://images.unsplash.com/photo-1590337075489-a48f4c7c4394?w=400",
    description: "Downsizing. 60 vintage mason jars with lids and rings. Various sizes, perfect for canning or crafts.",
    quantity: "60 mason jars",
  },
  {
    id: 19,
    title: "Lumber - 2x4s & 2x6s",
    category: "Building Materials",
    location: "Brooklyn Construction Site",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400",
    description: "Project surplus. Clean, straight 2x4s and 2x6s in 8ft and 10ft lengths. 300+ pieces total.",
    quantity: "300+ pieces",
  },
  {
    id: 20,
    title: "Laboratory Glassware Set",
    category: "Other",
    location: "Pratt Institute Science Lab",
    image: "https://images.unsplash.com/photo-1578594002389-7f751f62f3a1?w=400",
    description:
      "College lab upgrade. 25 glass beakers, 20 flasks, 30 graduated cylinders, 40 petri dishes, 15 glass storage jars.",
    quantity: "25 beakers, 15 jars, more",
  },
];

const Browse = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiRankedIds, setAiRankedIds] = useState<number[]>([]);

  const handleAiSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Enter a search query",
        description: "Please type what you're looking for",
        variant: "destructive",
      });
      return;
    }

    setIsAiSearching(true);
    try {
      const { data, error } = await supabase.functions.invoke("ai-search", {
        body: {
          query: searchQuery,
          items: mockItems,
        },
      });

      if (error) throw error;

      setAiRankedIds(data.rankedIds || []);
      toast({
        title: "AI Search Complete",
        description: `Found ${data.rankedIds?.length || 0} relevant items`,
      });
    } catch (error) {
      console.error("AI search error:", error);
      toast({
        title: "Search failed",
        description: "Could not complete AI search. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsAiSearching(false);
    }
  };

  const filteredItems = (() => {
    let items = mockItems.filter((item) => {
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      return matchesCategory;
    });

    // If AI search has results, sort by AI ranking
    if (aiRankedIds.length > 0) {
      items = items
        .sort((a, b) => {
          const aIndex = aiRankedIds.indexOf(a.id);
          const bIndex = aiRankedIds.indexOf(b.id);

          if (aIndex === -1 && bIndex === -1) return 0;
          if (aIndex === -1) return 1;
          if (bIndex === -1) return -1;
          return aIndex - bIndex;
        })
        .filter((item) => aiRankedIds.includes(item.id));
    } else if (searchQuery) {
      // Regular keyword search
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return items;
  })();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <Button onClick={() => navigate("/upload")}>List an Item</Button>
          </div>

          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setAiRankedIds([]);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleAiSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleAiSearch} disabled={isAiSearching} className="gap-2">
              <Sparkles className="h-4 w-4" />
              {isAiSearching ? "Searching..." : "AI Search"}
            </Button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer whitespace-nowrap transition-all hover:scale-105"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Browse Materials</h1>
          <p className="text-muted-foreground">
            {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"} available
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02]"
              onClick={() => navigate(`/item/${item.id}`)}
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform hover:scale-110"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{item.category}</Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {item.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No items found. Try adjusting your filters or search query.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Browse;
