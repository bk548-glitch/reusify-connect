import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Recycle, Search, MessageCircle, Heart } from "lucide-react";
import heroImage from "@/assets/hero-reuse.jpg";
import vijayImage from "@/assets/vijay.jpeg";
import billImage from "@/assets/bill.jpeg";
import { Header } from "@/components/Header";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/60" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            Turn Waste Into Worth
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Connect materials with makers. Give usable items a second life instead of sending them to landfills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/browse")}
              className="text-lg px-8"
            >
              Browse Materials
            </Button>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/upload")}
              className="text-lg px-8"
            >
              List an Item
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-accent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Items Shared</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50 Tons</div>
              <div className="text-muted-foreground">Waste Diverted</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Card className="text-center transition-all hover:shadow-lg">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Upload</h3>
              <p className="text-muted-foreground">
                List items you no longer need with photos and details
              </p>
            </CardContent>
          </Card>

          <Card className="text-center transition-all hover:shadow-lg">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Search</h3>
              <p className="text-muted-foreground">
                Browse by category or location to find what you need
              </p>
            </CardContent>
          </Card>

          <Card className="text-center transition-all hover:shadow-lg">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Match</h3>
              <p className="text-muted-foreground">
                Connect with people who need your materials
              </p>
            </CardContent>
          </Card>

          <Card className="text-center transition-all hover:shadow-lg">
            <CardContent className="pt-8 pb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">4. Connect</h3>
              <p className="text-muted-foreground">
                Arrange pickup and give items new purpose
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            The Impact We Make Together
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Every item shared is one less thing in a landfill. By connecting materials with people who need them, 
            we're building a circular economy where nothing goes to waste and everyone benefits.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/upload")}
            className="text-lg px-8"
          >
            Start Making a Difference
          </Button>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <Card className="text-center">
            <CardContent className="pt-8 pb-6">
              <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-muted-foreground">BS</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">Bhavani Sai</h3>
              <p className="text-sm text-muted-foreground">Co-founder</p>
              <p className="text-sm text-muted-foreground">M.Eng in Engineering Management</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-8 pb-6">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src={billImage} 
                  alt="Bill Park"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1">Bill Park</h3>
              <p className="text-sm text-muted-foreground">Co-founder</p>
              <p className="text-sm text-muted-foreground">B.A. in Computer Science</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-8 pb-6">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden">
                <img 
                  src={vijayImage} 
                  alt="Vijay Krishnamoorthy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1">Vijay Krishnamoorthy</h3>
              <p className="text-sm text-muted-foreground">Co-founder</p>
              <p className="text-sm text-muted-foreground">B.A. in Computer Science</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-8 pb-6">
              <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl text-muted-foreground">HA</span>
              </div>
              <h3 className="text-lg font-semibold mb-1">Himani Agarwal</h3>
              <p className="text-sm text-muted-foreground">Co-founder</p>
              <p className="text-sm text-muted-foreground">M.Eng in Engineering Management</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-card">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 ReUse. Building a sustainable future together.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
