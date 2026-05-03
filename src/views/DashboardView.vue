<template>
  <div class="dashboard">
    <div class="page-header">
      <h1>{{ $t('dashboard.title') }}</h1>
      <el-button type="primary" :icon="Refresh" :loading="loading" @click="fetchBalance" round>
        {{ $t('dashboard.refresh') }}
      </el-button>
    </div>

    <div class="balance-hero glass">
      <div class="balance-label">{{ $t('dashboard.totalBalance') }}</div>
      <div class="balance-amount">
        <span class="currency">₫</span>
        <span class="amount">{{ formatMoney(balance?.totalBalance ?? 0) }}</span>
      </div>
      <div class="balance-currency">{{ balance?.currencyEquivalent || "VND" }}</div>
    </div>

    <div class="section-header">
      <h2>Accounts</h2>
      <el-tag type="info" effect="dark" round>{{ accounts.length }} {{ $t('dashboard.accounts') }}</el-tag>
    </div>

    <div class="accounts-grid" v-if="accounts.length">
      <el-card
        v-for="acct in accounts"
        :key="acct.number"
        class="account-card"
        shadow="hover"
      >
        <div class="acct-header">
          <div class="acct-icon"><el-icon><CreditCard /></el-icon></div>
          <el-tag size="small" type="info" effect="plain">{{ acct.currency }}</el-tag>
        </div>
        <div class="acct-name">{{ acct.name }}</div>
        <div class="acct-number">{{ maskAccount(acct.number) }}</div>
        <div class="acct-balance">
          <span class="acct-balance-label">{{ $t('dashboard.balance') }}</span>
          <span class="acct-balance-value">{{ formatMoney(acct.balance) }}</span>
        </div>
        <el-button
          type="primary"
          size="small"
          class="acct-action"
          @click="viewTransactions(acct.number)"
        >
          {{ $t('dashboard.viewTransactions') }}
        </el-button>
      </el-card>
    </div>

    <el-empty v-else-if="!loading" :description="$t('dashboard.noAccounts')" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Refresh, CreditCard } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import api from "../api";

interface Account {
  number: string;
  name: string;
  currency: string;
  balance: number;
}

interface BalanceData {
  totalBalance: number;
  currencyEquivalent: string;
  accounts: Account[];
}

const router = useRouter();
const loading = ref(false);
const balance = ref<BalanceData | null>(null);
const accounts = ref<Account[]>([]);

const formatMoney = (val: number | string): string => {
  const n = typeof val === "string" ? parseFloat(val) : val;
  if (isNaN(n)) return "0";
  return n.toLocaleString("vi-VN");
};

const maskAccount = (num: string): string => {
  if (num.length <= 4) return num;
  return "•••• " + num.slice(-4);
};

const fetchBalance = async () => {
  loading.value = true;
  try {
    const { data } = await api.post("/balance");
    if (data.success && data.data) {
      balance.value = data.data;
      accounts.value = data.data.accounts || [];
    } else {
      ElMessage.error(data.message || "Failed to fetch balance");
    }
  } catch (err: any) {
    const msg = err.response?.data?.message || err.message;
    if (msg.includes("Not logged in") || msg.includes("Session expired")) {
      ElMessage.warning("Please login first");
      localStorage.removeItem('isAuthenticated');
      router.push("/login");
    } else {
      ElMessage.error(msg);
    }
  } finally {
    loading.value = false;
  }
};

const viewTransactions = (accountNumber: string) => {
  router.push({ path: "/transactions", query: { account: accountNumber } });
};

onMounted(fetchBalance);
</script>

<style scoped>
.dashboard {
  width: 100%;
  animation: slideUp 0.6s ease;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.balance-hero {
  padding: 48px;
  border-radius: 24px;
  margin-bottom: 40px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(16, 185, 129, 0.05));
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.balance-hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--accent-glow), transparent);
  filter: blur(60px);
  z-index: 0;
}

.balance-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
}

.balance-amount {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 8px;
  position: relative;
  z-index: 1;
}

.currency {
  font-size: 32px;
  font-weight: 600;
  color: var(--text-secondary);
}

.amount {
  font-size: 56px;
  font-weight: 900;
  letter-spacing: -0.04em;
  background: linear-gradient(135deg, var(--text-primary), var(--accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.balance-currency {
  color: var(--text-muted);
  font-size: 14px;
  font-weight: 500;
  position: relative;
  z-index: 1;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.section-header h2 {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.accounts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.account-card {
  cursor: default;
}

.account-card :deep(.el-card__body) {
  padding: 32px;
}

.acct-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.acct-icon {
  font-size: 36px;
  color: var(--accent);
  opacity: 0.8;
}

.acct-name {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 6px;
  color: var(--text-primary);
}

.acct-number {
  font-size: 15px;
  color: var(--text-muted);
  font-family: 'Inter', monospace;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
}

.acct-balance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid var(--border-color);
  margin-bottom: 12px;
}

.acct-balance-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-muted);
}

.acct-balance-value {
  font-size: 22px;
  font-weight: 800;
  color: var(--success);
}

.acct-action {
  width: 100%;
  height: 40px;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 28px;
  }
  
  .balance-hero {
    padding: 32px;
    border-radius: 20px;
  }
  
  .amount {
    font-size: 40px;
  }
  
  .accounts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
