import { getCachedUser } from "@/app/actions/cache";
import { EditProfile } from "./edit";
import { notFound } from "next/navigation";

export default async function RedigerPage() {
  const user = await getCachedUser();

  if (!user) return notFound();

  return <EditProfile user={user} />;
}
