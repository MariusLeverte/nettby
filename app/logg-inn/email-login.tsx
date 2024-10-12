"use client";

import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

export const EmailLogin = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await fetch("/api/auth", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await userCredential.user.getIdToken()}`,
          },
        });

        router.push("/min-side");
      })
      .catch((error) => {
        console.log("Error signing in:", error);

        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto mb-0 mt-8 max-w-md space-y-4"
    >
      <input type="email" {...register("email", { required: true })} />

      <input type="password" {...register("password", { required: true })} />

      <div className="flex flex-col items-center space-y-6">
        <div>
          <button type="submit">Logg inn</button>
        </div>
      </div>
    </form>
  );
};
