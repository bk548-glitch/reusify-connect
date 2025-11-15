import { Button } from "@/components/ui/button";
import { LogOut, LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Notifications } from "./Notifications";

interface HeaderProps {
  backButton?: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
  };
}

export const Header = ({ backButton }: HeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out successfully",
      });
      navigate("/auth");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {backButton ? (
          <Button
            variant="ghost"
            onClick={backButton.onClick}
            className="gap-2"
          >
            <backButton.icon className="h-4 w-4" />
            {backButton.label}
          </Button>
        ) : (
          <div />
        )}
        
        <div className="flex items-center gap-2">
          <Notifications />
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
