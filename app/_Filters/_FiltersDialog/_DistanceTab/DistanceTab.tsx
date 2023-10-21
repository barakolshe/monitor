import { Button } from "@/components/ui/Button/Button";
import { Checkbox, LabeledCheckbox } from "@/components/ui/Checkbox/Checkbox";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog/Dialog";
import { Slider } from "@/components/ui/Slider/Slider";
import { TextInput } from "@/components/ui/TextInput/TextInput";
import { DISTANCE_FILTER_OPTIONS } from "@/configs/consts";
import { initialLocationFilter } from "@/lib/utils/rockets/filterUtils";
import {
  DistanceFilter,
  RocketsFilter,
} from "@/types/rockets/RocketsFilter.interface";
import cloneDeep from "lodash.clonedeep";
import { FunctionComponent } from "react";

interface DistanceTabProps {
  filter: RocketsFilter;
  setFilter: (filter: RocketsFilter) => void;
  applyChanges: () => void;
}

const DistanceTab: FunctionComponent<DistanceTabProps> = ({
  filter,
  setFilter,
  applyChanges,
}) => {
  const handleCheckboxChange = (from: string, active: boolean) => {
    let distanceFilter: DistanceFilter[] = [];
    if (active) {
      distanceFilter.push({
        from: from,
        distance: 0,
      });
    } else {
      distanceFilter = cloneDeep(filter.distanceFilter);
      const targetIndex = distanceFilter.findIndex(
        (currFilter) => currFilter.from === from
      );
      if (targetIndex !== -1) {
        distanceFilter.splice(targetIndex, 1);
      }
    }

    setFilter({
      ...filter,
      locationFilter: [],
      distanceFilter: distanceFilter,
    });
  };

  const handleSliderChange = (sliderValue: number, from: string) => {
    setFilter({
      ...filter,
      locationFilter: initialLocationFilter,
      distanceFilter: [
        {
          from: from,
          distance: sliderValue,
        },
      ],
    });
  };

  const getSliderValue = (from: string) => {
    const targetDistance = filter.distanceFilter.find(
      (currFilter) => currFilter.from === from
    );

    return targetDistance ? targetDistance.distance : 0;
  };

  const isSliderActive = (from: string) => {
    const targetDistance = filter.distanceFilter.find(
      (currFilter) => currFilter.from === from
    );

    return targetDistance ? true : false;
  };

  const testTextInputValue = (value: string, maxValue: number) =>
    /^\d*\.?\d*$/.test(value) && Number(value) < maxValue; // Allow digits and '.' only, using a RegExp.

  return (
    <div className="flex flex-col gap-4 w-full ">
      <DialogTitle>Filters</DialogTitle>
      <DialogHeader>Choose the distance you want to view</DialogHeader>
      <DialogDescription className="h-[60vh] overflow-y-auto app-no-scrollbar ">
        <div className="flex flex-col gap-8 ">
          {DISTANCE_FILTER_OPTIONS.map(({ from, maxDistance }) => (
            <div key={from} className="flex flex-col gap-4 ">
              <LabeledCheckbox
                label={from}
                checked={filter.distanceFilter.some(
                  (currDistanceFilter) => currDistanceFilter.from === from
                )}
                onClick={() =>
                  handleCheckboxChange(from, !isSliderActive(from))
                }
              />
              <span className="flex items-center gap-1 justify-center">
                <div className="flex flex-row items-center gap-[2px]">
                  <TextInput
                    className="h-8 focus-visible:ring-0 pr-0 pl-1 w-10"
                    value={getSliderValue(from)}
                    onChange={(e) =>
                      testTextInputValue(e.target.value, maxDistance)
                        ? handleSliderChange(Number(e.target.value), from)
                        : null
                    }
                    disabled={!isSliderActive(from)}
                    maxLength={4}
                    size={1}
                  />
                  <p>km</p>
                </div>
                <span>/ {maxDistance}</span>
              </span>
              <Slider
                max={maxDistance}
                className="ml-3 w-[97%]"
                step={1}
                disabled={!isSliderActive(from)}
                value={getSliderValue(from)}
                onValueChange={(sliderValue) =>
                  handleSliderChange(sliderValue, from)
                }
              />
            </div>
          ))}
        </div>
      </DialogDescription>
      <DialogFooter>
        <Button onClick={applyChanges}>Apply</Button>
      </DialogFooter>
    </div>
  );
};

export default DistanceTab;
