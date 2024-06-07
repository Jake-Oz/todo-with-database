"use client";
import { useTheme } from "next-themes";
import moon from "@/public/icon-moon.svg";
import sun from "@/public/icon-sun.svg";
import Image from "next/image";

import React, { useEffect } from "react";

const Heading = () => {
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-row justify-between items-baseline w-full pt-10 sm:pt-20">
      <h1 className="text-3xl sm:text-4xl font-bold text-light-theme-very-light-gray  uppercase tracking-[1rem]">
        Todo
      </h1>

      {isClient && theme === "light" && (
        <div className="cursor-pointer" onClick={() => setTheme("dark")}>
          <Image src={moon} alt="moon" />
        </div>
      )}
      {isClient && theme === "dark" && (
        <div className="cursor-pointer" onClick={() => setTheme("light")}>
          <Image src={sun} alt="sun" />
        </div>
      )}
    </div>
  );
};

export default Heading;
