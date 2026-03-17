import { ref, onMounted } from "vue";
import { User } from "oidc-client-ts";
import { handleCallback, userManager, login, logout, authLogs } from "../auth";

export function useAuth() {
  const user = ref<User | null>(null);
  const isProcessingCallback = ref(false);
  const error = ref<string | null>(null);

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
