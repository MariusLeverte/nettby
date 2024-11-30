import { getCachedCurrentUser, getCachedUser } from "@/app/actions/cache";
import { getIsCurrentUser } from "../user";
import { NewMessage } from "./new-message";
import { Posts } from "./posts";

export default async function GjestebokPage({
  params,
}: {
  params: { username: string };
}) {
  const user = await getCachedUser(params.username);
  const isCurrentUser = await getIsCurrentUser(params.username);
  const currentUser = await getCachedCurrentUser();

  return (
    <div>
      <div className="mt-10">
        {!isCurrentUser && (
          <NewMessage userId={user.id} senderId={currentUser?.id || ""} />
        )}
        <Posts userId={user.id} page={0} />
      </div>
    </div>
  );
}
