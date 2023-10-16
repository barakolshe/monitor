import { cn } from "@/lib/utils/tailwindUtils";
import { FunctionComponent, ReactNode } from "react";

interface CellContainerProps {
  className?: string;
  children: ReactNode;
}

const CellContainer: FunctionComponent<CellContainerProps> = ({
  className,
  children,
}) => {
  return <p className={cn("text-center", className)}>{children}</p>;
};

export default CellContainer;
