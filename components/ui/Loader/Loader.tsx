import { FunctionComponent } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/tailwindUtils";

interface LoaderProps {
  className?: string;
}

const Loader: FunctionComponent<LoaderProps> = ({ className }) => {
  return <Loader2 className={cn("h-8 w-8 animate-spin", className)} />;
};

export default Loader;
