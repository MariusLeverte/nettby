"use client";

import { updateUserInfo } from "@/app/actions/firestore";
import { uploadImage } from "@/app/actions/storage";
import { Label } from "@/components/label";
import { Modal } from "@/components/modal";
import { User } from "@/types/firestore";
import { PhotoIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  image?: string;
};

export const ProfileImageModal = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting, defaultValues },
  } = useForm<Inputs>({
    defaultValues: {
      image: "",
    },
  });

  const file = watch("image") as unknown as FileList;

  const preview = file?.[0]
    ? URL.createObjectURL(file[0])
    : defaultValues?.image;

  useEffect(() => {
    if (isOpen) return;

    reset();
  }, [isOpen, reset]);

  const onSubmit: SubmitHandler<Inputs> = async ({ image }) => {
    if (typeof image === "object") {
      const formData = new FormData();
      formData.append("file", image[0] as File);
      const uploadedUrl = await uploadImage(user.id, formData);

      updateUserInfo(user.id, { profileUrl: uploadedUrl }).then(() => {
        setIsOpen(false);
      });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="underline flex items-center gap-2 font-medium text-neutral-600 hover:text-neutral-900"
      >
        <PhotoIcon className="w-4" /> Legg til profilbilde
      </button>

      {isOpen && (
        <Modal
          title="Profilbilde"
          subTitle="Velg en bilde for ditt profilbilde"
          onClose={() => setIsOpen(false)}
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
        >
          <form>
            <div className="w-full h-[250px] bg-neutral-200 relative rounded-md overflow-hidden mb-4">
              {preview && (
                <Image
                  src={preview}
                  alt="image preview"
                  fill
                  className="object-center object-cover"
                />
              )}
            </div>
            <fieldset>
              <Label htmlFor="image">Velg bilde</Label>
              <input
                type="file"
                accept="image/*"
                className="mt-1 w-full sm:text-sm"
                {...register("image", { required: true })}
              />
            </fieldset>
          </form>
        </Modal>
      )}
    </>
  );
};
