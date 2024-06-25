import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme_provider";
import Heading from "@/components/heading";
import Logout from "@/components/logout";

const josefin_sans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Todo List",
  description: "Frontend Mentor Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={josefin_sans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-w-[375px] px-5 container h-screen bg-light-theme-very-light-gray bg-bg-mobile-light dark:bg-bg-mobile-dark sm:bg-bg-desktop-light sm:dark:bg-bg-desktop-dark dark:bg-dark-theme-very-dark-blue bg-no-repeat bg-contain sm:bg-auto ">
            <div className="mx-auto sm:w-[540px]">
              <Heading>
                <Logout />
              </Heading>
              {children}
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
