import { EmailLogin } from "./email-login";

export default function Page() {
  return (
    <main className="max-w-screen-lg mx-auto py-40 px-8 flex gap-4 flex-wrap ">
      <div className="md:max-w-xs mx-auto space-y-2 md:space-y-6">
        <h1 className="text-7xl font-semibold text-blue-600">Nettby</h1>
        <p className="text-lg text-slate-600">
          Connect with friends and the world around you on Facebook.
        </p>
      </div>
      <EmailLogin />
    </main>
  );
}
