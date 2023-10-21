import { FunctionComponent, ReactNode } from "react";
import ReactQueryProvider from "./_providers/ReactQueryProvider";
import { TooltipProvider } from "@/components/ui/Tooltip/Tooltip";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
