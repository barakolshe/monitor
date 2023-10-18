import { Button } from "@/components/ui/Button/Button";
import { Separator } from "@/components/ui/Separator/Separator";
import { PREDEFINED_LOCATIONS_FITLERS } from "@/configs/main";
import { cn } from "@/lib/utils/tailwindUtils";
import {
  LocationFilter,
  RocketsFilter,
} from "@/types/rockets/RocketsFilter.interface";
import cloneDeep from "lodash.clonedeep";
import React, { FunctionComponent } from "react";

interface LocationButtonsProps {
  filter: RocketsFilter;
  setFilter: (filter: RocketsFilter) => void;
}

interface PredefinedLocationFilter {
  title: string;
  locations: string[];
}

const LocationButtons: FunctionComponent<LocationButtonsProps> = ({
  filter,
  setFilter,
}) => {
  const isFilterSelected = (predefinedFilter: PredefinedLocationFilter) => {
    if (filter === null) {
      return false;
    }
    for (const currArea of filter.locationFilter) {
      for (const currLocation of currArea.locations) {
        if (
          predefinedFilter.locations.includes(currLocation.location) &&
          !currLocation.active
        ) {
          return false;
        }
        if (
          !predefinedFilter.locations.includes(currLocation.location) &&
          currLocation.active
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const setPredefinedFilter = (predefinedFilter: PredefinedLocationFilter) => {
    const locationFilterCopy: LocationFilter | null = cloneDeep(
      filter?.locationFilter
    );

    if (locationFilterCopy !== null) {
      for (const area of locationFilterCopy) {
        area.locations.forEach((currLocation) => {
          if (predefinedFilter.locations.includes(currLocation.location)) {
            currLocation.active = true;
          } else {
            currLocation.active = false;
          }
        });
      }
    }
    setFilter({
      ...filter,
      locationFilter: locationFilterCopy,
    });
  };

  const handleFilterClick = (predefinedFilter: PredefinedLocationFilter) => {
    isFilterSelected(predefinedFilter)
      ? resetFilter()
      : setPredefinedFilter(predefinedFilter);
  };

  const resetFilter = () => {
    const locationFilterCopy: LocationFilter | null = cloneDeep(
      filter?.locationFilter
    );
    if (locationFilterCopy !== null) {
      for (const area of locationFilterCopy) {
        area.locations.forEach((currLocation) => {
          currLocation.active = false;
        });
      }
    }
    setFilter({
      ...filter,
      locationFilter: locationFilterCopy,
    });
  };

  return (
    <div className="flex flex-row-reverse justify-center items-center h-5 space-x-4">
      {PREDEFINED_LOCATIONS_FITLERS.map((currFilter, index) => (
        <React.Fragment key={currFilter.title}>
          <Button
            variant="ghost"
            className={cn({
              "bg-accent": isFilterSelected(currFilter),
              "ml-4": index === 0,
            })}
            onClick={() => handleFilterClick(currFilter)}
          >
            {currFilter.title}
          </Button>
          {index !== PREDEFINED_LOCATIONS_FITLERS.length - 1 && (
            <Separator orientation="vertical" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default LocationButtons;
