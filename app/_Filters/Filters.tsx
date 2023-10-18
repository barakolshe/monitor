"use client";
import { Button } from "@/components/ui/Button/Button";
import React, { FunctionComponent } from "react";
import FiltersDialog, { TabsType } from "./_FiltersDialog/FiltersDialog";
import { FilterContext } from "@/context/FilterContext";
import LocationButtons from "../_LocationButtons/LocationButtons";
import DateButtons from "./_DateButtons/DateButtons";

interface FiltersProps {}

const Filters: FunctionComponent<FiltersProps> = () => {
  const { filter, setFilter } = React.useContext(FilterContext);
  const [dialogState, setDialogState] = React.useState(false);

  return (
    <>
      <div className="flex flex-col gap-8">
        <LocationButtons filter={filter} setFilter={setFilter} />
        <DateButtons filter={filter} setFilter={setFilter} />
      </div>
      <Button
        key="Advanced"
        variant="outline"
        className="absolute top-[-12px] left-6"
        onClick={() => setDialogState(true)}
      >
        Advanced
      </Button>

      <FiltersDialog
        open={dialogState}
        onOpenChange={(open) => setDialogState(open)}
      />
    </>
  );
};

export default Filters;
