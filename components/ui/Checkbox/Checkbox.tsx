"use client";
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils/tailwindUtils";
import { FunctionComponent } from "react";

export enum CheckboxState {
  Checked = "checked",
  SemiChecked = "SemiChecked",
  Unchecked = "Unchecked",
}

type CheckboxProps = {
  className?: string;
  checked?: CheckboxState | boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string;
};

const Checkbox: FunctionComponent<CheckboxProps> = ({
  className,
  checked,
  ...props
}) => {
  const getCheckboxProp = () => {
    if (typeof checked === "boolean" || checked === undefined) {
      return checked;
    }
    return checked === CheckboxState.Unchecked ? false : true;
  };

  const getCheckboxIndicator = () => {
    if (typeof checked === "boolean" || checked === undefined) {
      return (
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      );
    }
    let indicator: React.ReactNode | null = null;
    if (checked === CheckboxState.Checked) {
      indicator = <Check className="h-4 w-4" />;
    } else if (checked === CheckboxState.SemiChecked) {
      indicator = <Minus className="h-4 w-4" />;
    }
    return indicator !== null ? (
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
      >
        {indicator}
      </CheckboxPrimitive.Indicator>
    ) : null;
  };

  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className
      )}
      checked={getCheckboxProp()}
      {...props}
    >
      {getCheckboxIndicator()}
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
