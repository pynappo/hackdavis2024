"use client";

import {
  useUser,
  useRedirectFunctions,
  useLogoutFunction,
} from "@propelauth/nextjs/client";

export default function Create() {
  const { loading, user } = useUser();
  const { redirectToLoginPage, redirectToAccountPage } = useRedirectFunctions();

  if (loading) return <div>Loading...</div>;

  if (user) {
    return (
      <main>
        <input
          className=" border-black border-2 rounded-md"
          placeholder="insert item name"
        ></input>
        <input
          className=" border-black border-2 rounded-md "
          placeholder="number"
        ></input>
        <button className="p-3  border-black border-2">+</button>
        <button className="p-3  border-black border-2">-</button>
      </main>
    );
  } else {
    redirectToLoginPage();
  }
}
