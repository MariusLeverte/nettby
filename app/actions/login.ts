"use server";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { redirect } from "next/navigation";
import { getUserInfo, updateUserLastActive } from "./firestore";

export const login = async (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      await fetch("/api/auth", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${await userCredential.user.getIdToken()}`,
        },
      });

      const user = await getUserInfo(userCredential.user.uid);
      await updateUserLastActive(user.id);

      redirect(`/${user.slug}`);
    })
    .catch((error) => {
      console.log("Error signing in:", error);
    });
};
