import Topbar from "@/components/layout/Topbar/Topbar";
import "./globals.css";
import type { Metadata } from "next";
import Providers from "@/providers/Providers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="min-h-[inherit] w-full flex flex-col gap-6">
            <Topbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
