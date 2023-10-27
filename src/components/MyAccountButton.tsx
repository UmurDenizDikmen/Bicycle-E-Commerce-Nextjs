"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useCallback, useState } from "react";

interface MyAccountButtonProps {
  session: Session | null;
}

export function MyAccountButton({ session }: MyAccountButtonProps) {
  const user = session?.user;

  const [open, setOpen] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, [open]);

  return (
    <div className="flex flex-col items-center relative">
      <div className="z-10">
        <button
          onClick={handleClick}
          id="dropdown"
          data-dropdown-toggle="dropdown"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
          type="button"
        >
          My Account{" "}
          <svg
            className="w-2.5 h-2.5 ml-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
      </div>{" "}
      {open && (
        <div className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 mt-12">
          <ul className="py-6 text-sm text-gray-700 dark:text-gray-200">
            <li className="text-2xl pl-1 font-bold">
              {user ? (
                <>
                  <button onClick={() => signOut({ callbackUrl: "/" })}>
                    Sign Out
                  </button>
                  <p className="text-sm pt-2">{user.name}</p>
                </>
              ) : (
                <button className="pl-1 pr-3" onClick={() => signIn()}>
                  Sign Up
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
