import { UserManager, WebStorageStateStore } from "oidc-client-ts";

export const userManager = new UserManager({
  authority: import.meta.env.VITE_OIDC_AUTHORITY,
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
  response_type: import.meta.env.VITE_OIDC_RESPONSE_TYPE,
  scope: import.meta.env.VITE_OIDC_SCOPE,
  post_logout_redirect_uri: import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI,
  userStore: new WebStorageStateStore({ store: globalThis.localStorage }),
});

export async function login() {
  return userManager.signinRedirect();
}

export async function logout() {
  return userManager.signoutRedirect();
}

export async function getUser() {
  return userManager.getUser();
}

export async function handleCallback() {
  return userManager.signinCallback();
}
