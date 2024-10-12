"use client";

import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { getUserInfo } from "./actions/firestore";

type Inputs = {
  email: string;
  password: string;
};

export const EmailLogin = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await fetch("/api/auth", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await userCredential.user.getIdToken()}`,
          },
        });

        const user = await getUserInfo(userCredential.user.uid);

        router.push(`/${user.slug}`);
      })
      .catch((error) => {
        console.log("Error signing in:", error);
      });
  };

  return (
    <div className="mx-auto max-w-md w-screen flex flex-col gap-4 h-fit p-4 rounded bg-slate-100 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <fieldset>
          <Label htmlFor="UserEmail">E-post</Label>
          <Input
            type="email"
            id="UserEmail"
            {...register("email", { required: true })}
          />
        </fieldset>

        <fieldset>
          <Label htmlFor="UserPassword">Passord</Label>
          <Input
            type="password"
            id="UserPassword"
            {...register("password", { required: true })}
          />
        </fieldset>

        <div className="flex flex-col items-center space-y-2">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-3 py-2 w-full"
          >
            Logg inn
          </button>
          <p className="text-blue-500 text-sm hover:underline">
            Glemt passord?
          </p>
        </div>
      </form>

      <div className="flex justify-center border-t border-slate-200 pt-4">
        <Link href="/signup">
          <button className="bg-lime-500 text-white rounded-md px-3 py-2">
            Bli innbygger
          </button>
        </Link>
      </div>
    </div>
  );
};
