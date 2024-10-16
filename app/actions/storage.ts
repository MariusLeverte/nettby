"use server";

import { adminStorage } from "@/lib/firebase-admin";

export const uploadImage = async (userId: string, formData: FormData) => {
  const bucket = adminStorage.bucket();

  const icon = formData.get("file") as File;

  const buffer = await icon.arrayBuffer();
  const fileBuffer = Buffer.from(buffer);

  const file = bucket.file(`image/${userId}/profile`);

  await file.save(fileBuffer, {
    metadata: {
      contentType: icon.type,
    },
    public: true,
  });

  const [metadata] = await file.getMetadata();
  const url = metadata.mediaLink;

  return url;
};
