import { getCachedCurrentUser } from "@/app/actions/cache";
import { EditProfile } from "./edit";
import { notFound } from "next/navigation";

export default async function RedigerPage() {
  const user = await getCachedCurrentUser();

  if (!user) return notFound();

  return <EditProfile user={{ id: user.id, bio: user.bio }} />;
}
