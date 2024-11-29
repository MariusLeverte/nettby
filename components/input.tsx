import { forwardRef, InputHTMLAttributes } from "react";

export const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ ...inputProps }, ref) => {
  return (
    <input
      className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
      ref={ref}
      {...inputProps}
    />
  );
});

Input.displayName = "Input";
