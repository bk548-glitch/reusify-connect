import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Upload as UploadIcon, Sparkles, Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Header } from "@/components/Header";
import { US_CITIES } from "@/data/usCities";
import { cn } from "@/lib/utils";

const categories = [
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

const Upload = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    quantity: 1,
    image: null as File | null
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuggestingCategory, setIsSuggestingCategory] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("You must be logged in to list items");
      navigate("/auth");
      return;
    }
    
    if (!formData.title || !formData.category || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;

      // Upload image if present
      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${user.id}/${Math.random()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('item-images')
          .upload(fileName, formData.image);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('item-images')
          .getPublicUrl(fileName);
          
        imageUrl = publicUrl;
      }

      // Insert item into database
      const { error: insertError } = await supabase
        .from('items')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          location: formData.location,
          quantity: formData.quantity,
          image_url: imageUrl
        });

      if (insertError) throw insertError;

      toast.success("Item listed successfully!");
      navigate("/browse");
    } catch (error) {
      console.error('Error listing item:', error);
      toast.error("Failed to list item. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const generateFromImage = async () => {
    if (!formData.image) {
      toast.error("Please upload an image first");
      return;
    }

    setIsGenerating(true);
    try {
      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(formData.image);
      
      reader.onload = async () => {
        const base64 = reader.result?.toString().split(',')[1];
        
        const { data, error } = await supabase.functions.invoke('generate-content', {
          body: { type: 'image', imageBase64: base64 }
        });

        if (error) throw error;

      setFormData({
        ...formData,
        description: data.description
      });
        
        toast.success("Description generated from image!");
      };
    } catch (error) {
      console.error('Error generating from image:', error);
      toast.error("Failed to generate content from image");
    } finally {
      setIsGenerating(false);
    }
  };

  const enhanceDescription = async () => {
    if (!formData.description && !formData.title) {
      toast.error("Please provide some text to enhance");
      return;
    }

    setIsGenerating(true);
    try {
      const text = formData.description || formData.title;
      
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: { type: 'text', text }
      });

      if (error) throw error;

      setFormData({
        ...formData,
        description: data.description,
        category: data.tags[0] || formData.category,
      });
      
      toast.success("Description enhanced!");
    } catch (error) {
      console.error('Error enhancing description:', error);
      toast.error("Failed to enhance description");
    } finally {
      setIsGenerating(false);
    }
  };

  const suggestCategory = async () => {
    if (!formData.title && !formData.image) {
      toast.error("Please enter a title or upload an image first");
      return;
    }

    setIsSuggestingCategory(true);
    try {
      let imageBase64 = null;
      
      // Convert image to base64 if present
      if (formData.image) {
        const reader = new FileReader();
        await new Promise((resolve) => {
          reader.onload = () => {
            imageBase64 = reader.result?.toString().split(',')[1];
            resolve(null);
          };
          reader.readAsDataURL(formData.image);
        });
      }

      const { data, error } = await supabase.functions.invoke('suggest-category', {
        body: { 
          title: formData.title || null,
          imageBase64: imageBase64 
        }
      });

      if (error) {
        if (error.message?.includes('429')) {
          toast.error("Rate limit exceeded. Please try again in a moment.");
        } else if (error.message?.includes('402')) {
          toast.error("AI credits exhausted. Please add credits to continue.");
        } else {
          throw error;
        }
        return;
      }

      if (data?.category) {
        setFormData({ ...formData, category: data.category });
        toast.success(`Category suggested: ${data.category}`);
      }
    } catch (error) {
      console.error('Error suggesting category:', error);
      toast.error("Failed to suggest category");
    } finally {
      setIsSuggestingCategory(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        backButton={{
          label: "Back to Home",
          icon: ArrowLeft,
          onClick: () => navigate("/")
        }}
      />

      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">List an Item</h1>
          <p className="text-muted-foreground">
            Help others find materials they need while keeping items out of landfills
          </p>
        </div>

        <Card className="p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Item Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Wooden dining table"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="category">Category *</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={suggestCategory}
                  disabled={isSuggestingCategory || (!formData.title && !formData.image)}
                  className="gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  {isSuggestingCategory ? "AI Suggesting..." : "AI Suggest"}
                </Button>
              </div>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
                required
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={locationOpen}
                    className="w-full justify-between bg-background"
                  >
                    {formData.location || "Select a city..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search cities..." />
                    <CommandList>
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup>
                        {US_CITIES.map((city) => (
                          <CommandItem
                            key={city}
                            value={city}
                            onSelect={(currentValue) => {
                              setFormData({ ...formData, location: currentValue });
                              setLocationOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.location === city ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {city}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                placeholder="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="description">Description</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={enhanceDescription}
                  disabled={isGenerating}
                  className="gap-2"
                >
                  <Sparkles className="h-3 w-3" />
                  {isGenerating ? "Generating..." : "Enhance with AI"}
                </Button>
              </div>
              <Textarea
                id="description"
                placeholder="Tell us more about the item, its condition, dimensions, etc."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Upload Image</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                <UploadIcon className="h-5 w-5 text-muted-foreground" />
              </div>
              {formData.image && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Selected: {formData.image.name}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateFromImage}
                    disabled={isGenerating}
                    className="gap-2 w-full"
                  >
                    <Sparkles className="h-3 w-3" />
                    {isGenerating ? "Analyzing..." : "Generate from Image"}
                  </Button>
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Listing Item..." : "List Item"}
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default Upload;
