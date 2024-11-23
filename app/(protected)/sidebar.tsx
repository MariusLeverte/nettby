"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export const Sidebar = ({ currentUserSlug }: { currentUserSlug?: string }) => {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { label: "Profil", href: `/${currentUserSlug}`, icon: "😊" },
    { label: "Borgere", href: "/borgere", icon: "👥" },
    { label: "Postkasse", href: "/postkasse", icon: "📩", badge: 34 },
    // { label: "Charity", href: "/charity", icon: "💝", badge: 22 },
    // { label: "Friends", href: "/friends", icon: "👥" },
    // { label: "Community", href: "/community", icon: "🤝" },
  ];

  return (
    <nav className="w-64 pr-4">
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className={`flex items-center justify-between p-3 rounded-lg  
                ${
                  pathname === item.href
                    ? "bg-white shadow-md font-semibold"
                    : "hover:bg-gray-200"
                }`}
            >
              <div className="flex items-center gap-3">
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-1 text-sm text-white bg-red-500 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
