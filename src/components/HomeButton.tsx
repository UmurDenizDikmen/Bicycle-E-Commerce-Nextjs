"use client";
import React from "react";
import { useRouter } from "next/navigation";

export const HomeButton = () => {
  const router = useRouter();
  return (
    <button
      className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700 mt-7"
      onClick={() => {
        router.push("/");
      }}
    >
      Home
    </button>
  );
};
