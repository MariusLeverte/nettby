"use client";

import Image from "next/image";

export const ProfileCard = ({
  profileUrl,
  userName,
  status,
}: {
  profileUrl?: string;
  userName: string;
  status?: string;
}) => {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-lg">
      <div className="relative mx-auto w-32 h-32">
        {profileUrl ? (
          <Image
            src={profileUrl}
            alt={`Profilbilde - ${userName}`}
            className="object-cover rounded-full"
            fill
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
            <svg
              className="w-20 h-20 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
      </div>
      <h1 className="text-center text-lg font-bold leading-8 text-gray-900">
        {userName}
      </h1>
      {status && (
        <p className="text-center text-sm leading-6 text-gray-500">{status}</p>
      )}
      <ul className="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
        <li className="flex items-center py-3 text-sm">
          <span>Adresse</span>
          <span className="ml-auto">
            <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
              Hjemløs
            </span>
          </span>
        </li>

        <li className="flex items-center py-3 text-sm">
          <span>Yrke</span>
          <span className="ml-auto">
            <span className="rounded-full bg-blue-200 py-1 px-2 text-xs font-medium text-blue-700">
              Uteligger
            </span>
          </span>
        </li>

        <li className="flex items-center py-3 text-sm">
          <span>Flyttet inn</span>
          <span className="ml-auto">Apr 08, 2022</span>
        </li>
      </ul>
    </div>
  );
};
