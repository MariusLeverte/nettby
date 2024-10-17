import { Card } from "@/components/card";
import { Progress } from "@/components/progress";
import { UserIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { ProfileImageModal } from "./profile-image-modal";
import Image from "next/image";
import { getPageUser, getIsCurrentUser } from "./user";
import { SendFriendRequestButton } from "./friend-buttons";
import { getCachedUser } from "@/app/actions/cache";
import { serializer } from "@/components/SlateEditor/serialize";

interface UserPageProps {
  params: { username: string };
}

export default async function UserPage({ params }: UserPageProps) {
  const currentUser = await getCachedUser();
  const user = await getPageUser(params.username);
  const isCurrentUser = await getIsCurrentUser(params.username);

  return (
    <div className="grid grid-cols-12 w-full">
      <div className="col-span-4 p-2 flex flex-col gap-4">
        <div className="bg-neutral-300 rounded-md w-full h-[250px] relative overflow-hidden">
          {user.profileUrl && (
            <Image
              src={user.profileUrl}
              alt="Profile picture"
              width={250}
              height={250}
              className="object-center object-cover w-full h-full"
            />
          )}
        </div>
        {isCurrentUser ? (
          <div>
            <ProfileImageModal user={user} />

            <Link
              href={`/${user.slug}/rediger`}
              className="underline flex items-center gap-2 font-medium text-neutral-600 hover:text-neutral-900"
            >
              <UserIcon className="w-4" /> Rediger profil
            </Link>
          </div>
        ) : (
          <SendFriendRequestButton
            currentUserId={currentUser?.id}
            friendId={user.id}
          />
        )}

        <Card title="Aktivitet">
          <Progress label="Poeng i dag" value={0} />
          <Progress label="Poeng totalt" value={30} />
        </Card>

        <Card title="Fakta">
          <p>Kommer data</p>
        </Card>
      </div>
      <div className="col-span-8 p-4">
        <div className="flex gap-4 justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{user.userName}</h1>
            <h3>Klar for relansering!</h3>
            <p className="underline">@Oslo</p>
          </div>
          <div className="min-w-[120px]">
            <Progress label="Politi" value={35} />
          </div>
        </div>
        <div
          className="prose mt-10 max-w-full"
          dangerouslySetInnerHTML={{
            __html: serializer(JSON.parse(user?.bio || "[]")).join(""),
          }}
        />
      </div>
    </div>
  );
}
