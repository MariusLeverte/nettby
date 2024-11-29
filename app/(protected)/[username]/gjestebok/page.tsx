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
      <h1 className="text-3xl font-bold">{user.userName} gjestebok</h1>
      <p>Send en hilsen i gjesteboka</p>
      <hr className="my-2" />
      {!isCurrentUser && (
        <NewMessage userId={user.id} senderId={currentUser?.id || ""} />
      )}
      <div className="mt-10">
        <Posts userId={user.id} page={0} />
      </div>
    </div>
  );
}
