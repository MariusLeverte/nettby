import { unstable_cache } from "next/cache";
import { getSessionUser } from "./auth";
import { getUserBySlug, getUserInfo } from "./firestore";

export const getCachedUser = async (slug: string) => {
  const cachedFn = unstable_cache(getUserBySlug, ["users", slug], {
    tags: ["users"],
    revalidate: 600,
  });

  return cachedFn(slug);
};

export const getCachedCurrentUser = async () => {
  const user = await getSessionUser();

  if (!user) return null;

  const cachedFn = unstable_cache(getUserInfo, ["users", user.uid], {
    tags: ["users"],
    revalidate: 600,
  });

  return cachedFn(user.uid);
};
