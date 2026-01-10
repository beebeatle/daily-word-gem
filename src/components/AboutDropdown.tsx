import { Info, ChevronDown, Target, BarChart3, History } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AboutDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-all duration-300 font-sans text-xs font-medium">
          <Info className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
          About
          <ChevronDown className="w-3 h-3 opacity-60" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48 bg-popover border border-border z-50">
        <DropdownMenuItem asChild>
          <Link to="/about/why" className="flex items-center gap-2 cursor-pointer">
            <Target className="w-4 h-4 text-primary/70" />
            <span>Why Word Delight?</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/about/statistics" className="flex items-center gap-2 cursor-pointer">
            <BarChart3 className="w-4 h-4 text-primary/70" />
            <span>Usage Statistics</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/about/history" className="flex items-center gap-2 cursor-pointer">
            <History className="w-4 h-4 text-primary/70" />
            <span>Words of the Day</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AboutDropdown;
