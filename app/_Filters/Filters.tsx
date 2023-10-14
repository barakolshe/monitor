"use client";
import { Button } from "@/components/ui/Button/Button";
import { Separator } from "@/components/ui/Separator/Separator";
import React, { FunctionComponent } from "react";
import { domainToASCII } from "url";
import FiltersDialog from "./_FiltersDialog/FiltersDialog";

interface FiltersProps {}

const Filters: FunctionComponent<FiltersProps> = () => {
  const [dialogState, setDialogState] = React.useState(false);

  const openDialog = () => {
    setDialogState(true);
  };

  console.log({ dialogState });

  return (
    <>
      <div className="flex flex-row-reverse justify-center items-center h-5 space-x-4">
        <Button variant="ghost">Jersulem</Button>
        <Separator orientation="vertical" />
        <Button variant="ghost">Tel aviv</Button>
        <Separator orientation="vertical" />
        <Button variant="ghost" onClick={openDialog}>
          More
        </Button>
      </div>
      <FiltersDialog open={dialogState} onOpenChange={setDialogState} />
    </>
  );
};

export default Filters;
