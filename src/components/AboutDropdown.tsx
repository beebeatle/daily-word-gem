import { Info, Target, BarChart3, History } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const AboutDropdown = () => {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button className="group flex items-center justify-center w-8 h-8 rounded-full bg-secondary/80 hover:bg-secondary text-secondary-foreground transition-all duration-300">
              <Info className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>About</p>
        </TooltipContent>
      </Tooltip>
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
