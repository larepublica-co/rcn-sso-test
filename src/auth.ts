import { UserManager, WebStorageStateStore, Log } from "oidc-client-ts";

export interface AuthLogEntry {
  type: "debug" | "info" | "warn" | "error";
  message: string;
  timestamp: string;
}
export const authLogs: AuthLogEntry[] = [];
const logHandler = {
  debug: (...args: any[]) => {
    const msg = args.map(String).join(" ").trimStart();
    authLogs.push({
      type: "debug",
      message: msg,
      timestamp: new Date().toISOString(),
    });
    console.debug(...args);
  },
  info: (...args: any[]) => {
    const msg = args.map(String).join(" ").trimStart();
    authLogs.push({
      type: "info",
      message: msg,
      timestamp: new Date().toISOString(),
    });
    console.info(...args);
  },
  warn: (...args: any[]) => {
    const msg = args.map(String).join(" ").trim();
    authLogs.push({
      type: "warn",
      message: msg,
      timestamp: new Date().toISOString(),
    });
    console.warn(...args);
  },
  error: (...args: any[]) => {
    const msg = args.map(String).join(" ").trim();
    authLogs.push({
      type: "error",
      message: msg,
      timestamp: new Date().toISOString(),
    });
    console.error(...args);
  },
};
Log.setLogger(logHandler);
Log.setLevel(Log.DEBUG);
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
