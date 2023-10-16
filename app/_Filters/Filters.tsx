"use client";
import { Button } from "@/components/ui/Button/Button";
import { Separator } from "@/components/ui/Separator/Separator";
import React, { FunctionComponent } from "react";
import FiltersDialog from "./_FiltersDialog/FiltersDialog";
import { FilterContext } from "@/context/FilterContext";
import { RocketsFilter } from "@/types/rockets/RocketsFilter.interface";
import cloneDeep from "lodash.clonedeep";
import { cn } from "@/lib/tailwindUtils";

interface FiltersProps {}

interface PredifinedFilter {
  title: string;
  locations: string[];
}

const PREDEFINED_FITLERS = [
  {
    title: "Jersulem",
    locations: [
      "עמינדב",
      "אורה",
      "ירושלים - מרכז",
      "ירושלים - מערב",
      "ירושלים - דרום",
      "ירושלים - מזרח",
      "פנימיית עין כרם",
      "אבן ספיר",
      "מבשרת ציון",
      "בית זית",
      "ירושלים - צפון",
      "מוצא עילית",
      "גבעת זאב",
    ],
  },
];

const Filters: FunctionComponent<FiltersProps> = () => {
  const { filter: filter, setFilter: setFilter } =
    React.useContext(FilterContext);
  const [dialogState, setDialogState] = React.useState(false);

  const openDialog = () => {
    setDialogState(true);
  };

  const isFilterSelected = (predefinedFilter: PredifinedFilter) => {
    if (filter === null) {
      return false;
    }
    for (const currArea of filter) {
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

  const setPredefinedFilter = (predefinedFilter: PredifinedFilter) => {
    const filterCopy: RocketsFilter | null = cloneDeep(filter);
    if (filterCopy !== null) {
      for (const area of filterCopy) {
        area.locations.forEach((currLocation) => {
          if (predefinedFilter.locations.includes(currLocation.location)) {
            currLocation.active = true;
          } else {
            currLocation.active = false;
          }
        });
      }
    }
    setFilter(filterCopy);
  };

  const resetFilter = () => {
    const filterCopy: RocketsFilter | null = cloneDeep(filter);
    if (filterCopy !== null) {
      for (const area of filterCopy) {
        area.locations.forEach((currLocation) => {
          currLocation.active = false;
        });
      }
    }
    setFilter(filterCopy);
  };

  const handleFilterClick = (predefinedFilter: PredifinedFilter) => {
    console.log("im here", isFilterSelected(predefinedFilter));
    isFilterSelected(predefinedFilter)
      ? resetFilter()
      : setPredefinedFilter(predefinedFilter);
  };

  return (
    <>
      <div className="flex flex-row-reverse justify-center items-center h-5 space-x-4">
        {PREDEFINED_FITLERS.map((currFilter, index) => {
          if (index === 0) {
            return (
              <React.Fragment key={currFilter.title}>
                <Button
                  variant="ghost"
                  className={cn("ml-4", {
                    "bg-accent": isFilterSelected(currFilter),
                  })}
                  onClick={() => handleFilterClick(currFilter)}
                >
                  {currFilter.title}
                </Button>
                <Separator orientation="vertical" />
              </React.Fragment>
            );
          } else if (index !== PREDEFINED_FITLERS.length - 1) {
            return (
              <React.Fragment key={currFilter.title}>
                <Button
                  variant="ghost"
                  className={cn({ "bg-accent": isFilterSelected(currFilter) })}
                  onClick={() => handleFilterClick(currFilter)}
                >
                  {currFilter.title}
                </Button>
                <Separator orientation="vertical" />
              </React.Fragment>
            );
          }
        })}
        <Button key="More" variant="ghost" onClick={openDialog}>
          More
        </Button>
      </div>
      <FiltersDialog open={dialogState} onOpenChange={setDialogState} />
    </>
  );
};

export default Filters;
