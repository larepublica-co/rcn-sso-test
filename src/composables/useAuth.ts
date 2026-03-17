import { ref, onMounted } from "vue";
import { Log, User } from "oidc-client-ts";
import { handleCallback, userManager, login, logout } from "../auth";
export interface AuthLogEntry {
  type: "debug" | "info" | "warn" | "error";
  message: string;
  timestamp: string;
}

export function useAuth() {
  const user = ref<User | null>(null);
  const isProcessingCallback = ref(false);
  const error = ref<string | null>(null);

  const authLogs = ref<AuthLogEntry[]>([]);
  const logHandler = {
    debug: (...args: any[]) => {
      const msg = args.map(String).join(" ").trimStart();
      authLogs.value.push({
        type: "debug",
        message: msg,
        timestamp: new Date().toISOString(),
      });
      console.debug(...args);
    },
    info: (...args: any[]) => {
      const msg = args.map(String).join(" ").trimStart();
      authLogs.value.push({
        type: "info",
        message: msg,
        timestamp: new Date().toISOString(),
      });
      console.info(...args);
    },
    warn: (...args: any[]) => {
      const msg = args.map(String).join(" ").trim();
      authLogs.value.push({
        type: "warn",
        message: msg,
        timestamp: new Date().toISOString(),
      });
      console.warn(...args);
    },
    error: (...args: any[]) => {
      const msg = args.map(String).join(" ").trim();
      authLogs.value.push({
        type: "error",
        message: msg,
        timestamp: new Date().toISOString(),
      });
      console.error(...args);
    },
  };

  Log.setLogger(logHandler);
  Log.setLevel(Log.DEBUG);
  const processLoginCallback = async () => {
    isProcessingCallback.value = true;
    error.value = null;
    try {
      await handleCallback();
      globalThis.history.replaceState({}, document.title, "/");
      user.value = await userManager.getUser();
    } catch (e: any) {
      error.value = e?.message || "Error in login callback";
      console.error("Error callback", e);
    } finally {
      isProcessingCallback.value = false;
    }
  };

  onMounted(async () => {
    if (globalThis.location.search.includes("code=")) {
      await processLoginCallback();
      return;
    }
    user.value = await userManager.getUser();
  });

  return {
    user,
    isProcessingCallback,
    error,
    login,
    logout,
    authLogs,
  };
}
