"use client";
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/tailwindUtils";
import { FunctionComponent } from "react";

export enum CheckboxState {
  Checked = "checked",
  SemiChecked = "SemiChecked",
  Unchecked = "Unchecked",
}

type CheckboxProps = {
  className?: string;
  checked?: CheckboxState;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string;
};

const Checkbox: FunctionComponent<CheckboxProps> = ({
  className,
  checked,
  ...props
}) => {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      checked={checked === CheckboxState.Unchecked ? false : true}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        {checked === CheckboxState.Checked && <Check className="h-4 w-4" />}
        {checked === CheckboxState.SemiChecked && <Minus className="h-4 w-4" />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};

type LabeledCheckboxProps = CheckboxProps & {
  label?: string;
};

const LabeledCheckbox: FunctionComponent<LabeledCheckboxProps> = ({
  className,
  checked,
  id,
  label,
  ...props
}) => (
  <div className={cn("flex flex-row items-center space-x-2", className)}>
    <Checkbox checked={checked} id={id} {...props} />
    <label htmlFor={id}>{label}</label>
  </div>
);

export { Checkbox, LabeledCheckbox };
