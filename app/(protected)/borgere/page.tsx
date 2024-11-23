import { getAllUsers, getUsersCount } from "@/app/actions/firestore/users";
import { UserGrid } from "./user-grid";
import { Pagination } from "@/components/pagenation";

export default async function UsersPage() {
  const userCount = await getUsersCount();
  const { users, hasMore } = await getAllUsers();

  return (
    <div className="p-4 h-full flex flex-col justify-between gap-6 overflow-hidden">
      <div>
        <UserGrid initialUsers={users} initialHasMore={hasMore} />
      </div>
      <Pagination count={userCount} />
    </div>
  );
}
