<template>
  <div class="login-page">
    <div class="login-bg">
      <div class="bg-orb bg-orb-1"></div>
      <div class="bg-orb bg-orb-2"></div>
      <div class="bg-orb bg-orb-3"></div>
    </div>

    <div class="login-container glass">
      <div class="login-header">
        <div class="logo">
          <el-icon>
            <Monitor />
          </el-icon>
        </div>
        <h1>{{ $t('login.title') }}</h1>
        <p class="subtitle">{{ $t('login.desc') }}</p>
      </div>

      <el-form :model="form" label-position="top" class="login-form" @submit.prevent="handleLogin">
        <el-form-item :label="$t('login.phone')">
          <el-input v-model="form.username" :placeholder="$t('login.phone')" :prefix-icon="User" size="large" />
        </el-form-item>

        <el-form-item :label="$t('login.password')">
          <el-input v-model="form.password" type="password" :placeholder="$t('login.password')" :prefix-icon="Lock"
            size="large" show-password />
        </el-form-item>

        <el-button type="primary" size="large" class="login-btn" :loading="loading" @click="handleLogin"
          native-type="submit">
          <template v-if="loading">
            <span>{{ statusText }}</span>
          </template>
          <template v-else>
            <el-icon>
              <Key />
            </el-icon>
            <span>{{ $t('login.loginBtn') }}</span>
          </template>
        </el-button>
      </el-form>

      <!-- Login progress -->
      <div v-if="loading" class="login-progress">
        <el-progress :percentage="progress" :stroke-width="4" :show-text="false" status="success" />
        <span class="progress-text">{{ statusText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { User, Lock, Key, Monitor } from "@element-plus/icons-vue";
import api from "../api";

const router = useRouter();
const loading = ref(false);
const progress = ref(0);
const statusText = ref("");

const form = reactive({
  username: "",
  password: "",
});

const handleLogin = async () => {
  if (!form.username || !form.password) {
    ElMessage.warning("Please fill in all fields");
    return;
  }

  loading.value = true;
  progress.value = 10;
  statusText.value = "🔐 Connecting to Core Bank...";

  try {
    // Simulate progress while auto-login runs
    const progressInterval = setInterval(() => {
      if (progress.value < 85) {
        progress.value += Math.random() * 15;
        const msgs = [
          "📥 Fetching captcha...",
          "🤖 Solving captcha with OCR...",
          "🔑 Encrypting credentials...",
          "📡 Authenticating...",
        ];
        statusText.value = msgs[Math.floor(Math.random() * msgs.length)];
      }
    }, 800);

    const { data } = await api.post("/login", {
      username: form.username,
      password: form.password,
    });

    clearInterval(progressInterval);

    if (data.success) {
      localStorage.setItem('isAuthenticated', 'true');
      progress.value = 100;
      statusText.value = "✅ Login successful!";
      ElMessage.success(
        `Login successful! (${data.attempts} attempt${data.attempts > 1 ? "s" : ""})`
      );
      setTimeout(() => router.push("/dashboard"), 500);
    } else {
      progress.value = 0;
      ElMessage.error(data.message || "Login failed");
    }
  } catch (err: any) {
    progress.value = 0;
    ElMessage.error(err.response?.data?.message || "Login failed");
  } finally {
    loading.value = false;
  }
};


</script>

<style scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: #020617; /* Deep midnight */
}

.login-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
  opacity: 0.4;
}

.bg-orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #2563eb, transparent);
  top: -200px;
  left: -100px;
  animation: float 12s ease-in-out infinite;
}

.bg-orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #7c3aed, transparent);
  bottom: -150px;
  right: -100px;
  animation: float 15s ease-in-out infinite reverse;
}

.bg-orb-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #10b981, transparent);
  top: 40%;
  left: 50%;
  animation: float 18s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
  33% { transform: translate(50px, -30px) rotate(5deg) scale(1.1); }
  66% { transform: translate(-30px, 40px) rotate(-5deg) scale(0.9); }
}

.login-container {
  width: 440px;
  max-width: 90%;
  padding: 48px;
  border-radius: 24px;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  position: relative;
  z-index: 10;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.logo {
  font-size: 64px;
  color: var(--accent);
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  filter: drop-shadow(0 0 20px var(--accent-glow));
}

.login-header h1 {
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 12px;
  letter-spacing: -0.04em;
}

.subtitle {
  color: #94a3b8;
  font-size: 15px;
  font-weight: 500;
}

.login-form :deep(.el-form-item__label) {
  color: #cbd5e1;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.login-btn {
  width: 100%;
  height: 52px;
  font-size: 16px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.login-progress {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.progress-text {
  font-size: 14px;
  color: #94a3b8;
  text-align: center;
  font-weight: 500;
}

.login-footer {
  text-align: center;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 13px;
  color: #64748b;
}
</style>
