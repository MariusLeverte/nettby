import { Tabs } from "@/components/tabs";

export default function UserLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { username: string };
}>) {
  return (
    <div>
      <Tabs
        items={[
          { label: "Profil", href: `/${params.username}` },
          { label: "Gjestebok", href: `/${params.username}/gjestebok` },
          { label: "Venner", href: "#" },
          { label: "Bilder", href: "#" },
        ]}
      />
      <main>{children}</main>
    </div>
  );
}