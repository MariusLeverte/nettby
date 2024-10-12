// import { unstable_cache } from "next/cache";
// import { getAppContents, getAppTerms, getUserApps } from "./firestore";
// import { getSessionUser } from "./auth";

// export const getCachedApps = async () => {
//   const user = await getSessionUser();

//   if (!user) return null;

//   const cachedFn = unstable_cache(getUserApps, ["apps", user.uid], {
//     tags: ["apps"],
//     revalidate: 600,
//   });

//   return cachedFn(user);
// };
