"use client";

import { User } from "@/types/firestore";
import Image from "next/image";
import Link from "next/link";

export const ListUsers = ({ users }: { users: User[] }) => {
  return (
    <ul className="flex gap-4 items-center">
      {users.map((user) => {
        console.log({ user });
        return (
          <li key={user.id} className="px-3 py-2">
            <Link href={`/${user.slug}`}>
              <div className="relative w-20 h-20 bg-slate-200">
                {user.profileUrl && (
                  <Image
                    src={user.profileUrl}
                    alt={user.userName!}
                    className="rounded"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>
              {user.userName}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
