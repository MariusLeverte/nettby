import { LabelHTMLAttributes } from "react";

export const Label = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label {...props} className="block text-xs font-medium text-gray-700" />
  );
};
