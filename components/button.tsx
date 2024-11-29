import clsx from "clsx";
import { ButtonHTMLAttributes, cloneElement } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement;
  variant?: "primary" | "outline" | "white";
  loading?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  icon,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center rounded-lg px-5 py-2 text-sm font-medium",
        {
          "bg-neutral-900 text-white": variant === "primary",
          "bg-white": variant === "white",
          "border border-neutral-900": variant === "outline",
          "opacity-45": props.disabled,
        },
        props.className
      )}
      disabled={props.disabled || loading}
    >
      {children}
      {icon && cloneElement(icon, { className: "shrink-0 w-5 ml-4" })}
    </button>
  );
};
