import { getCachedUser } from "@/app/actions/cache";
import { getUserBySlug } from "@/app/actions/firestore";

export const getIsCurrentUser = async (slug: string) => {
  const currentUser = await getCachedUser();
  return currentUser?.slug === slug;
};

export const getPageUser = async (slug: string) => {
  // Fetch logged in user
  const currentUser = await getCachedUser();
  if (currentUser?.slug === slug) return currentUser;

  return await getUserBySlug(slug);
};
