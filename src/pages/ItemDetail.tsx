import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, User, Calendar } from "lucide-react";
import { toast } from "sonner";

const mockItem = {
  id: 1,
  title: "Vintage Wooden Chair",
  category: "Furniture",
  location: "Brooklyn, NY",
  image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800",
  description: "Beautiful vintage wooden chair in excellent condition. Has been well-maintained and comes from a smoke-free home. Perfect for someone looking to add character to their space or for upcycling projects. Minor wear on the legs but structurally sound.",
  postedBy: "Sarah M.",
  postedDate: "2 days ago"
};

const ItemDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleRequest = () => {
    toast.success("Request sent! The owner will be notified.");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
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
              <img
                src={mockItem.image}
                alt={mockItem.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {mockItem.title}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="default" className="text-base px-4 py-1">
                  {mockItem.category}
                </Badge>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{mockItem.location}</span>
                </div>
              </div>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {mockItem.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>Posted by {mockItem.postedBy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{mockItem.postedDate}</span>
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
