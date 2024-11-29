import { getCachedUser } from "@/app/actions/cache";
import { serializer } from "@/components/SlateEditor/serialize";

interface UserPageProps {
  params: { username: string };
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await getCachedUser(params.username);

  return (
    <div
      className="prose mt-10 max-w-full"
      dangerouslySetInnerHTML={{
        __html: serializer(JSON.parse(user?.bio || "[]")).join(""),
      }}
    />
  );
}
