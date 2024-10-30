"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface TabsProps {
  items: {
    label: string;
    href: string;
  }[];
}

export const Tabs = ({ items }: TabsProps) => {
  const pathname = usePathname();

  return (
    <div className="">
      <nav className="flex bg-neutral-100 rounded-md py-3 shadow-inner divide-x">
        {items?.map(({ label, href }) => {
          const isActive = href === pathname;

          return (
            <span key={label.toLocaleLowerCase()} className="px-2">
              <Link
                href={href}
                className={cn(
                  "relative rounded-full px-3 py-2 text-sm text-neutral-500",
                  {
                    "text-neutral-900": isActive,
                  }
                )}
                style={{
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <span
                  className={cn("relative z-10", { "font-medium": isActive })}
                >
                  {label}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-0 bg-white shadow-md rounded-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            </span>
          );
        })}
      </nav>
    </div>
  );
};
