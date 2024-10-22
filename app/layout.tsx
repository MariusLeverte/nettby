import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getLastActiveUsers } from "./actions/firestore";
import { ListUsers } from "./list-users";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lastActiveUsers = await getLastActiveUsers();

  return (
    <html lang="nb">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ListUsers users={lastActiveUsers} />
        <header className="max-w-screen-lg mx-auto bg-white w-full px-4 py-8">
          <span>Logo</span>
        </header>
        <main className="flex-1 grid">{children}</main>
      </body>
    </html>
  );
}
