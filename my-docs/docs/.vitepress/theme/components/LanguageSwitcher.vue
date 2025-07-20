<template>
  <div class="language-switcher">
    <button class="language-button" @click="toggleDropdown">
      {{ currentLanguage.label }}
      <span class="arrow" :class="{ 'arrow-down': !isOpen, 'arrow-up': isOpen }"></span>
    </button>
    <ul class="language-dropdown" v-if="isOpen">
      <li v-for="locale in availableLanguages" :key="locale.lang">
        <a :href="getLocalePath(locale)" @click="isOpen = false">{{ locale.label }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useData, useRoute } from 'vitepress'

export default {
  setup() {
    const { site, localeIndex, theme, page } = useData()
    const route = useRoute()
    const isOpen = ref(false)

    const availableLanguages = computed(() => {
      return Object.values(site.value.locales || {})
    })

    const currentLanguage = computed(() => {
      return availableLanguages.value[localeIndex.value]
    })

    function toggleDropdown() {
      isOpen.value = !isOpen.value
    }

    function getLocalePath(locale) {
      // Handle root locale
      if (locale.lang === site.value.locales.root.lang) {
        // If we're in a nested page
        if (route.path.startsWith('/en/')) {
          return route.path.replace(/^\/en\//, '/')
        }
        return route.path
      }
      
      // Handle non-root locale (English)
      if (locale.lang === 'en') {
        // If we're already in the English section
        if (route.path.startsWith('/en/')) {
          return route.path
        }
        // If we're in the root locale, switch to English
        return route.path.replace(/^\/(.*?)/, '/en/$1')
      }
      
      return '/'
    }

    // Close dropdown when clicking outside
    if (typeof window !== 'undefined') {
      window.addEventListener('click', (e) => {
        if (!e.target.closest('.language-switcher')) {
          isOpen.value = false
        }
      })
    }

    return {
      isOpen,
      availableLanguages,
      currentLanguage,
      toggleDropdown,
      getLocalePath
    }
  }
}
</script>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
}

.language-button {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  color: var(--vp-c-text-1);
  transition: border-color 0.25s;
}

.language-button:hover {
  border-color: var(--vp-c-brand);
}

.arrow {
  margin-left: 6px;
  border: solid var(--vp-c-text-2);
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 2px;
  transition: transform 0.25s;
}

.arrow-down {
  transform: rotate(45deg);
}

.arrow-up {
  transform: rotate(-135deg);
}

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 4px 0;
  list-style: none;
  min-width: 120px;
  z-index: 100;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.language-dropdown li {
  padding: 0;
  margin: 0;
}

.language-dropdown a {
  display: block;
  padding: 8px 16px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  font-size: 14px;
  transition: background-color 0.25s;
}

.language-dropdown a:hover {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
}
</style>