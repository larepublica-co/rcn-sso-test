<script setup lang="ts">
import { useAuth } from './composables/useAuth';
import JsonViewer from 'vue3-json-viewer';
import './normalize.css';
import './style.scss';
import { ref, watch, nextTick } from 'vue';
const { user, isProcessingCallback, error, login, logout, authLogs } = useAuth();

const logListRef = ref<HTMLElement | null>(null);
watch(
  () => authLogs.length,
  async () => {
    await nextTick();
    if (logListRef.value) {
      logListRef.value.scrollTop = logListRef.value.scrollHeight;
    }
  }
);
</script>
<template>
  <div class="container">
    <h1>SSO RCN Test Application</h1>

    <div v-if="isProcessingCallback">Processing login...</div>

    <div v-else>
      <div v-if="user" class="card logged-in">
        <h2>Hello, {{ user.profile.name || 'User' }}</h2>
        <div style="margin: 16px 0;">
          <JsonViewer :value="user" copyable boxed sort theme="dark" />
        </div>
        <button @click="logout">Sign Out</button>
      </div>

      <div v-else class="card logged-out">
        <h2>Hi!</h2>
        <p>You are not authenticated.</p>
        <button @click="login">Sign In (SSO)</button>
      </div>
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <div class="auth-log-block">
      <h3 class="auth-log-title">Authentication Log</h3>
      <div class="auth-log-list" ref="logListRef">
        <div v-for="(log, idx) in [...authLogs].slice().reverse()" :key="idx"
          :class="['auth-log-item', 'auth-log-' + log.type]">
          <span class="auth-log-label">[{{ log.type.toUpperCase() }}]</span>
          <span class="auth-log-timestamp" style="color:#888; font-size:0.7em; margin-left:4px;">{{ new
            Date(log.timestamp).toLocaleTimeString() }}</span>
          <span class="auth-log-message">{{ log.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
