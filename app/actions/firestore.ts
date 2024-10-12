// "use server";

// import { adminDb } from "@/lib/firebase-admin";
// import { QuerySnapshot } from "firebase-admin/firestore";
// import { DecodedIdToken } from "firebase-admin/auth";
// import { App, Content, Term } from "@/types/firestore";
// import { revalidateTag } from "next/cache";

// export const updateAppInfo = async (id: string, data: Partial<App>) => {
//   const snapshot = await adminDb.collection("apps").doc(id).get();

//   if (snapshot.exists) {
//     await snapshot.ref.update(data);
//   } else {
//     await snapshot.ref.set(data);
//   }
//   revalidateTag("apps");
// };
