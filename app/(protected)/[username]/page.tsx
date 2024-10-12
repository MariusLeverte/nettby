import { getCachedUser } from "@/app/actions/cache";
import { Card } from "@/components/card";
import { Progress } from "@/components/progress";
import { PhotoIcon } from "@heroicons/react/16/solid";

interface UserPageProps {
  params: { username: string };
}

export default async function UserPage({ params }: UserPageProps) {
  const user = await getCachedUser();

  console.log("User:", user);

  return (
    <div className="grid grid-cols-12 w-full">
      <div className="col-span-4 p-2 flex flex-col gap-4">
        <div className="bg-neutral-300 rounded-md w-full h-[250px]" />
        <span className="underline flex items-center gap-2">
          <PhotoIcon className="w-4 text-neutral-600" /> Legg til profilbilde
        </span>

        <Card title="Aktivitet">
          <Progress label="Poeng i dag" value={0} />
          <Progress label="Poeng totalt" value={30} />
        </Card>

        <Card title="Fakta">
          <p>Kommer data</p>
        </Card>
      </div>
      <div className="col-span-8 p-4">
        <div className="flex gap-4 justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{params.username}</h1>
            <h3>Klar for relansering!</h3>
            <p className="underline">@Oslo</p>
          </div>
          <div className="min-w-[120px]">
            <Progress label="Politi" value={35} />
          </div>
        </div>
      </div>
    </div>
  );
}
