import Image from "next/image";

interface UserProfileTeaserProps {
  userName: string;
  profileUrl?: string;
  children?: React.ReactNode;
}

export const UserProfileTeaser = ({
  userName,
  profileUrl,
  children,
}: UserProfileTeaserProps) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="w-10 h-10 bg-neutral-200 rounded-md overflow-hidden">
        {profileUrl && (
          <Image
            src={profileUrl}
            alt={`${userName} profilbilde`}
            width={40}
            height={40}
            className="w-full h-full object-cover object-center"
          />
        )}
      </div>
      <div>
        <span className="font-semibold text-sm">{userName}</span>
        {children}
      </div>
    </div>
  );
};
