import CheckboxAccordion, {
  DataType as AccordionDataType,
} from "@/components/shared/CheckboxAccordion/CheckboxAccordion";
import { Button } from "@/components/ui/Button/Button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog/Dialog";
import { LocationFilter } from "@/types/rockets/RocketsFilter.interface";
import React, { FunctionComponent } from "react";
import { FilterContext } from "@/context/FilterContext";

interface LocationTabProps {}

const filterToAccordionData = (filter: LocationFilter) => {
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

const LocationTab: FunctionComponent<LocationTabProps> = () => {
  const { filter: originState, setFilter: setOriginState } =
    React.useContext(FilterContext);
  const [filter, setFilter] = React.useState<AccordionDataType>(
    filterToAccordionData(originState.locationFilter)
  );

  const applyChanges = () => {
    setOriginState({
      ...originState,
      locationFilter: accordionDataToFilter(filter!),
    });
  };

  const initialState = React.useMemo(
    () => filterToAccordionData(originState.locationFilter),
    [originState]
  );

  return (
    <div className="flex flex-col gap-4">
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
    </div>
  );
};

export default LocationTab;
