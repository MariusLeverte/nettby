import { getCachedCurrentUser } from "@/app/actions/cache";

export const getIsCurrentUser = async (slug: string) => {
  const currentUser = await getCachedCurrentUser();
  return currentUser?.slug === slug;
};
