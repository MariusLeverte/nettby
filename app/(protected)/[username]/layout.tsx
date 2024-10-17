import { getCachedUser } from "@/app/actions/cache";
import { Tabs } from "@/components/tabs";
import Link from "next/link";
import { getIsCurrentUser } from "./user";

export default async function UserLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { username: string };
}>) {
  const currentUser = await getCachedUser();
  const isCurrentUser = await getIsCurrentUser(params.username);

  return (
    <div>
      <div className="flex justify-between items-center">
        <Tabs
          items={[
            { label: "Profil", href: `/${params.username}` },
            { label: "Gjestebok", href: `/${params.username}/gjestebok` },
            { label: "Venner", href: `/${params.username}/venner` },
            { label: "Bilder", href: `/${params.username}/bilder` },
          ]}
        />
        {!isCurrentUser && (
          <Link href={`/${currentUser?.slug}`}>
            <p className="text-sm text-neutral-500">
              Gå tilbake til din profil
            </p>
          </Link>
        )}
      </div>
      <main>{children}</main>
    </div>
  );
}
