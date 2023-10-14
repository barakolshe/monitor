import CheckboxAccordion, {
  CheckedType,
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
import { DialogProps } from "@radix-ui/react-dialog";
import React, { FunctionComponent } from "react";
import { useContext } from "react";

interface FiltersDialogProps extends DialogProps {}

const FiltersDialog: FunctionComponent<FiltersDialogProps> = ({
  onOpenChange,
  ...props
}) => {
  const { filter: originState, setFilter: setOriginState } =
    useContext(FilterContext);
  const [checked, setChecked] = React.useState<CheckedType | null>(null);

  const applyChanges = () => {
    setOriginState(checked);
    onOpenChange ? onOpenChange(false) : null;
  };

  return (
    <Dialog onOpenChange={onOpenChange} {...props}>
      <DialogContent>
        <DialogTitle>Filters</DialogTitle>
        <DialogHeader>Choose the locations you want to view</DialogHeader>
        <DialogDescription className="max-h-[60vh] overflow-y-auto no-scrollbar">
          <CheckboxAccordion
            initialState={originState !== null ? originState : {}}
            checked={checked}
            setChecked={setChecked}
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
