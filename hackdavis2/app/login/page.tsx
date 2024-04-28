"use client";

import {
  useUser,
  useRedirectFunctions,
  useLogoutFunction,
} from "@propelauth/nextjs/client";
import { redirect } from "next/navigation";
const WelcomeMessage = () => {
  const { loading, user } = useUser();
  const { redirectToLoginPage, redirectToAccountPage } = useRedirectFunctions();
  const logoutFn = useLogoutFunction();

  if (loading) return <div>Loading...</div>;

  if (user) {
    return (
      <div>
        <p>You are logged in as {user.email}</p>
        <button onClick={() => redirectToAccountPage()}>Account</button>
        <button onClick={logoutFn}>Logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not logged in</p>
        <button onClick={() => redirectToLoginPage()}>Login</button>
      </div>
    );
  }
};
export default WelcomeMessage;
