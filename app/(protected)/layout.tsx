import { Input } from "@/components/input";
import { Sidebar } from "./sidebar";
import { getCachedCurrentUser } from "../actions/cache";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCachedCurrentUser();

  return (
    <div className="max-w-screen-2xl mr-auto p-6 h-full w-full flex">
      <aside className="w-64 flex flex-col gap-4">
        <div className="h-10">Logo?</div>
        <Sidebar currentUserSlug={currentUser?.slug} />
      </aside>
      <div className="grow flex flex-col gap-4">
        <div className="h-10">
          <Input placeholder="Søk etter venner eller grupper" />
        </div>
        <div className="h-full w-full flex flex-col">
          <div className="bg-white shadow-sm shadow-neutral-200 rounded-md flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
