import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeft, Search, MapPin } from "lucide-react";

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
  "Other"
];

const mockItems = [
  {
    id: 1,
    title: "Vintage Wooden Chair",
    category: "Furniture",
    location: "Brooklyn, NY",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400",
    description: "Beautiful vintage chair in good condition"
  },
  {
    id: 2,
    title: "Fabric Scraps Bundle",
    category: "Textiles",
    location: "Manhattan, NY",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    description: "Various colorful fabric pieces perfect for crafts"
  },
  {
    id: 3,
    title: "Reclaimed Wood Planks",
    category: "Building Materials",
    location: "Queens, NY",
    image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=400",
    description: "Solid wood planks from old barn"
  },
  {
    id: 4,
    title: "Art Supply Collection",
    category: "Art Supplies",
    location: "Bronx, NY",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
    description: "Paint, brushes, and canvases"
  },
  {
    id: 5,
    title: "Kitchen Utensils Set",
    category: "Kitchen Items",
    location: "Staten Island, NY",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    description: "Complete set of kitchen tools"
  },
  {
    id: 6,
    title: "Children's Books",
    category: "Books",
    location: "Brooklyn, NY",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
    description: "Collection of kids books in great condition"
  }
];

const Browse = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = mockItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            <Button onClick={() => navigate("/upload")}>
              List an Item
            </Button>
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search materials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
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
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} available
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
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {item.description}
                </p>
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
            <p className="text-muted-foreground text-lg">
              No items found. Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Browse;
