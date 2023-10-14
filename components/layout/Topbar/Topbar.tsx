import React, { FunctionComponent } from "react";
import { cn } from "@/lib/utils";

interface Topbar {
  className?: string;
}

const Topbar: FunctionComponent<Topbar> = ({ className }) => {
  return (
    <div className={cn("w-full bg-red-500 h-fit", className)}>
      <div className="container py-4">
        <h1 className="font-brand text-3xl font-normal text-white">Monitor</h1>
      </div>
    </div>
  );
};

export default Topbar;
