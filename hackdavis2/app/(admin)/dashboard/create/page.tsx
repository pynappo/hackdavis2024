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
  } else {
    redirectToLoginPage();
  }
}
