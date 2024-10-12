import Image from "next/image";

const mockFriendList = [
  {
    name: "John Doe",
    username: "johndoe",
  },
  {
    name: "Jane Doe",
    username: "janedoe",
  },
  {
    name: "Alice",
    username: "alice",
  },
];

export default function VennerPage() {
  return (
    <div className="w-full space-y-4">
      <p className="font-semibold">Antall venner: {mockFriendList.length}</p>
      <ul className="grid grid-cols-12 gap-4">
        {mockFriendList.map((friend) => (
          <li
            key={friend.username}
            className="col-span-4 rounded bg-slate-50 overflow-hidden"
          >
            <div className="h-40 bg-slate-200">
              <Image src={""} alt={""} />
            </div>
            <div className="p-4 flex flex-col gap-2">
              <p>{friend.name}</p>
              <button className="px-2 py-1 bg-slate-500 text-white text-sm rounded w-full">
                Godta
              </button>
              <button className="px-2 py-1 bg-slate-500 text-white text-sm rounded w-full">
                Fjern
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
