import { Tabs } from "@/components/tabs";
import { UserHeader } from "./user-header";

export default function UserLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { username: string };
}>) {
  return (
    <div>
      <UserHeader username={params.username} />
      <div className="py-10 px-6">
        <div className="flex justify-between items-center mb-4">
          <Tabs
            items={[
              { label: "Profil", href: `/${params.username}` },
              { label: "Gjestebok", href: `/${params.username}/gjestebok` },
              { label: "Venner", href: `/${params.username}/venner` },
              { label: "Bilder", href: `/${params.username}/bilder` },
            ]}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
