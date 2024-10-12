import { SignupEmail } from "../signup";

export default function Page() {
  return (
    <main className="max-w-screen-lg mx-auto py-40 px-8 flex flex-col gap-4 items-center">
      <h1 className="text-7xl font-semibold text-lime-500">Nettby</h1>
      <SignupEmail />
    </main>
  );
}
