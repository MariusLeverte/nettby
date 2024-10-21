"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TabsProps {
  items: {
    label: string;
    href: string;
  }[];
}

export const Tabs = ({ items }: TabsProps) => {
  const pathname = usePathname();

  return (
    <div className="border-b border-neutral-200 w-full">
      <nav className="-mb-px flex gap-6">
        {items?.map(({ label, href }) => {
          const isActive = href === pathname;

          return (
            <Link
              key={label.toLocaleLowerCase()}
              href={href}
              className={cn(
                "rounded-t-md shrink-0 border border-transparent p-3 text-sm font-medium text-neutral-400 hover:text-neutral-700",
                {
                  "border border-neutral-200 border-b-white text-neutral-900 bg-white":
                    isActive,
                }
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
