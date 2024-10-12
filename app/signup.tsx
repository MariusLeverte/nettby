/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Card } from "@/components/card";
import { updateUserInfo } from "./actions/firestore";
import { User } from "@/types/firestore";
import { generateUniqueId } from "@/utils/username-util";
import { useState } from "react";

interface Inputs extends User {
  email: string;
  password: string;
}

export const SignupEmail = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = ({
    userName,
    firstName,
    lastName,
    birthdate,
    email,
    password,
  }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        try {
          await fetch("/api/auth", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${await userCredential.user.getIdToken()}`,
            },
          });

          const slug = generateUniqueId(userName);
          await updateUserInfo(userCredential.user.uid, {
            userName,
            slug,
            firstName,
            lastName,
            birthdate,
          });
          router.push(`/${slug}`);
        } catch (error) {
          console.log("Error creating user:", error);
        }
      })
      .catch((error) => {
        console.log("Error signing in:", error);
      });
  };

  return (
    <Card title="Bli innbygger">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <fieldset className="grow">
            <Input
              id="UserName"
              placeholder="Brukernavn"
              {...register("userName", { required: true, maxLength: 20 })}
            />
          </fieldset>
          <div className="flex gap-2 flex-wrap">
            <fieldset className="grow">
              <Input
                id="FirstName"
                placeholder="Navn"
                {...register("firstName", { required: true, maxLength: 20 })}
              />
            </fieldset>
            <fieldset className="grow">
              <Input
                id="LastName"
                placeholder="Etternavn"
                {...register("lastName", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
              />
            </fieldset>
          </div>

          <fieldset>
            <Label htmlFor="Birthdate">Fødselsdato</Label>
            <Input
              id="Birthdate"
              type="date"
              {...register("birthdate", { required: true })}
            />
          </fieldset>

          <fieldset>
            <Label htmlFor="email">E-post</Label>
            <Input
              id="email"
              type="email"
              {...register("email", { required: true })}
            />
          </fieldset>
          <fieldset>
            <Label htmlFor="password">Passord</Label>
            <Input
              id="password"
              type="password"
              {...register("password", { required: true })}
            />
          </fieldset>

          <p className="text-xs text-slate-500 max-w-xs">
            Ved å klikke på Bli innbygger godtar du våre{" "}
            <a className="hover:underline text-blue-500 cursor-pointer">
              betingelser
            </a>
            . Les mer om hvordan vi samler inn, bruker og deler dataene dine, i
            våre{" "}
            <a className="hover:underline text-blue-500 cursor-pointer">
              retningslinjer for personvern
            </a>
            , og hvordan vi bruker informasjonskapsler og lignende teknologi, i
            våre{" "}
            <a className="hover:underline text-blue-500 cursor-pointer">
              retningslinjer for informasjonskapsler
            </a>
            . Det kan være du får SMS-varsler fra oss, men disse kan du når som
            helst velge bort.
          </p>

          <div className="text-center flex flex-col gap-2">
            <button
              type="submit"
              className="bg-lime-500 text-white rounded-md px-3 py-2"
            >
              Bli innbygger
            </button>

            <Link
              href="/login"
              className="text-blue-500 text-sm font-semibold hover:underline"
            >
              Har du allerede en konto?
            </Link>
          </div>
        </div>
      </form>
    </Card>
  );
};
