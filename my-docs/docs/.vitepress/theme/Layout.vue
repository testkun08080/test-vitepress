<script setup>
import DefaultTheme from 'vitepress/theme'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-content-before>
      <div class="language-switcher-container">
        <LanguageSwitcher />
      </div>
    </template>
  </Layout>
</template>

<style>
.language-switcher-container {
  display: flex;
  align-items: center;
}
</style>