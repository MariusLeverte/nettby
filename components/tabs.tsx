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
    <div>
      <div className="border-b border-neutral-200 px-2">
        <nav className="-mb-px flex gap-6">
          {items?.map(({ label, href }) => {
            const isActive = href === pathname;

            return (
              <Link
                key={label.toLocaleLowerCase()}
                href={href}
                className={cn(
                  "shrink-0 border border-transparent p-3 text-sm font-medium text-neutral-500 hover:text-neutral-700",
                  {
                    "rounded-t-md border border-neutral-300 border-b-white font-bold text-neutral-800":
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
    </div>
  );
};
