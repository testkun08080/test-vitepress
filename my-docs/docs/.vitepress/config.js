import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'GameDev Documentation',
  description: 'ゲーム開発のための包括的なドキュメント',
  lang: 'ja',
  base: '/test-vitepress/',
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'ホーム', link: '/' },
      { text: 'ゲーム設計', link: '/design/' },
      { text: 'プログラミング', link: '/programming/' },
      { text: 'アート', link: '/art/' },
      { text: 'サウンド', link: '/sound/' },
      { text: 'API リファレンス', link: '/api/' }
    ],

    sidebar: {
      '/design/': [
        {
          text: 'ゲーム設計',
          items: [
            { text: '概要', link: '/design/' },
            { text: 'ゲームデザイン文書', link: '/design/game-design-document' },
            { text: 'レベルデザイン', link: '/design/level-design' },
            { text: 'UI/UXデザイン', link: '/design/ui-ux-design' },
            { text: 'バランス調整', link: '/design/balancing' }
          ]
        }
      ],
      
      '/programming/': [
        {
          text: 'プログラミング',
          items: [
            { text: '概要', link: '/programming/' },
            { text: 'アーキテクチャ', link: '/programming/architecture' },
            { text: 'ゲームループ', link: '/programming/game-loop' },
            { text: '物理エンジン', link: '/programming/physics' },
            { text: 'AI システム', link: '/programming/ai-system' },
            { text: 'ネットワーク', link: '/programming/networking' },
            { text: 'パフォーマンス最適化', link: '/programming/optimization' }
          ]
        }
      ],
      
      '/art/': [
        {
          text: 'アート',
          items: [
            { text: '概要', link: '/art/' },
            { text: '2Dアート', link: '/art/2d-art' },
            { text: '3Dモデリング', link: '/art/3d-modeling' },
            { text: 'アニメーション', link: '/art/animation' },
            { text: 'エフェクト', link: '/art/effects' },
            { text: 'ライティング', link: '/art/lighting' }
          ]
        }
      ],
      
      '/sound/': [
        {
          text: 'サウンド',
          items: [
            { text: '概要', link: '/sound/' },
            { text: 'BGM制作', link: '/sound/bgm' },
            { text: '効果音', link: '/sound/sfx' },
            { text: 'ボイス', link: '/sound/voice' },
            { text: '実装', link: '/sound/implementation' }
          ]
        }
      ],
      
      '/api/': [
        {
          text: 'API リファレンス',
          items: [
            { text: '概要', link: '/api/' },
            { text: 'Player クラス', link: '/api/player' },
            { text: 'Enemy クラス', link: '/api/enemy' },
            { text: 'GameManager', link: '/api/game-manager' },
            { text: 'AudioManager', link: '/api/audio-manager' },
            { text: 'InputManager', link: '/api/input-manager' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/testkun08080/test-vitepress' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 GameDev Team'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/testkun08080/test-vitepress/edit/main/my-docs/docs/:path',
      text: 'このページを編集'
    },

    lastUpdated: {
      text: '最終更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  },

  markdown: {
    lineNumbers: true,
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },

  vite: {
    server: {
      host: '0.0.0.0',
      port: 12000,
      allowedHosts: ['work-1-hvjekwstiycnisxb.prod-runtime.all-hands.dev']
    }
  }
})