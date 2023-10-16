import CheckboxAccordion, {
  DataType as AccordionDataType,
} from "@/components/shared/CheckboxAccordion/CheckboxAccordion";
import { Button } from "@/components/ui/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog/Dialog";
import { FilterContext } from "@/context/FilterContext";
import { RocketsFilter } from "@/types/rockets/RocketsFilter.interface";
import { DialogProps } from "@radix-ui/react-dialog";
import React, { FunctionComponent } from "react";

interface FiltersDialogProps extends DialogProps {}

const filterToAccordionData = (filter: RocketsFilter) => {
  return filter.map((currArea) => ({
    id: currArea.area,
    label: currArea.area,
    value: currArea.area,
    checkboxes: currArea.locations.map((currLocation) => ({
      id: currLocation.location,
      label: currLocation.location,
      value: currLocation.location,
      active: currLocation.active,
    })),
  }));
};

const accordionDataToFilter = (accordionData: AccordionDataType) => {
  return accordionData.map((currAccordion) => ({
    area: currAccordion.value,
    locations: currAccordion.checkboxes.map((currCheckbox) => ({
      location: currCheckbox.value,
      active: currCheckbox.active,
    })),
  }));
};

const FiltersDialog: FunctionComponent<FiltersDialogProps> = ({
  onOpenChange,
  ...props
}) => {
  const { filter: originState, setFilter: setOriginState } =
    React.useContext(FilterContext);
  const [filter, setFilter] = React.useState<AccordionDataType>(
    filterToAccordionData(originState)
  );

  const applyChanges = () => {
    setOriginState(accordionDataToFilter(filter!));
    onOpenChange ? onOpenChange(false) : null;
  };

  const initialState = React.useMemo(
    () => filterToAccordionData(originState),
    [originState]
  );

  return (
    <Dialog onOpenChange={onOpenChange} {...props}>
      <DialogContent>
        <DialogTitle>Filters</DialogTitle>
        <DialogHeader>Choose the locations you want to view</DialogHeader>
        <DialogDescription className="h-[60vh] overflow-y-auto app-no-scrollbar">
          <CheckboxAccordion
            initialState={initialState}
            data={filter}
            setData={setFilter}
          />
        </DialogDescription>
        <DialogFooter>
          <Button onClick={applyChanges}>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersDialog;
