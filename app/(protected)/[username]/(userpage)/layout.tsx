export default function UsergroupLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { username: string };
}>) {
  return (
    <div className="grid grid-cols-12 w-full">
      <div className="col-span-4 p-2 flex flex-col gap-4">
        <div className="bg-neutral-300 rounded-md w-full h-[250px]" />
        <h1 className="text-3xl font-bold">{params.username}</h1>
      </div>
      <div className="col-span-8 p-4">{children}</div>
    </div>
  );
}
