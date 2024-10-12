// "use server";

// import { adminStorage } from "@/lib/firebase-admin";

// export const uploadAppIcon = async (id: string, formData: FormData) => {
//   const bucket = adminStorage.bucket();

//   const icon = formData.get("file") as File;

//   const buffer = await icon.arrayBuffer();
//   const fileBuffer = Buffer.from(buffer);

//   const file = bucket.file(`apps/${id}/icon`);

//   await file.save(fileBuffer, {
//     metadata: {
//       contentType: icon.type,
//     },
//     public: true,
//   });

//   const [metadata] = await file.getMetadata();
//   const url = metadata.mediaLink;

//   return url;
// };
