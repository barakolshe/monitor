import CheckboxAccordion from "@/components/shared/CheckboxAccordion/CheckboxAccordion";
import { Button } from "@/components/ui/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog/Dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { FunctionComponent } from "react";

interface FiltersDialogProps extends DialogProps {}

const FiltersDialog: FunctionComponent<FiltersDialogProps> = ({ ...props }) => {
  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogTitle>Filters</DialogTitle>
        <DialogHeader>Choose the locations you want to view</DialogHeader>
        <DialogDescription>
          <CheckboxAccordion />
        </DialogDescription>
        <DialogFooter>
          <Button>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FiltersDialog;
