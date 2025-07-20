import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'GameDev Documentation',
  description: 'ゲーム開発のための包括的なドキュメント',
  lang: 'ja',
  base: '/test-vitepress/',
  ignoreDeadLinks: true,
  
  locales: {
    root: {
      label: '日本語',
      lang: 'ja',
      title: 'GameDev Documentation',
      description: 'ゲーム開発のための包括的なドキュメント',
      
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
      }
    },
    
    en: {
      label: 'English',
      lang: 'en',
      title: 'GameDev Documentation',
      description: 'Comprehensive documentation for game development',
      
      themeConfig: {
        logo: '/logo.svg',
        
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Game Design', link: '/en/design/' },
          { text: 'Programming', link: '/en/programming/' },
          { text: 'Art', link: '/en/art/' },
          { text: 'Sound', link: '/en/sound/' },
          { text: 'API Reference', link: '/en/api/' }
        ],

        sidebar: {
          '/en/design/': [
            {
              text: 'Game Design',
              items: [
                { text: 'Overview', link: '/en/design/' },
                { text: 'Game Design Document', link: '/en/design/game-design-document' },
                { text: 'Level Design', link: '/en/design/level-design' },
                { text: 'UI/UX Design', link: '/en/design/ui-ux-design' },
                { text: 'Balancing', link: '/en/design/balancing' }
              ]
            }
          ],
          
          '/en/programming/': [
            {
              text: 'Programming',
              items: [
                { text: 'Overview', link: '/en/programming/' },
                { text: 'Architecture', link: '/en/programming/architecture' },
                { text: 'Game Loop', link: '/en/programming/game-loop' },
                { text: 'Physics Engine', link: '/en/programming/physics' },
                { text: 'AI System', link: '/en/programming/ai-system' },
                { text: 'Networking', link: '/en/programming/networking' },
                { text: 'Performance Optimization', link: '/en/programming/optimization' }
              ]
            }
          ],
          
          '/en/art/': [
            {
              text: 'Art',
              items: [
                { text: 'Overview', link: '/en/art/' },
                { text: '2D Art', link: '/en/art/2d-art' },
                { text: '3D Modeling', link: '/en/art/3d-modeling' },
                { text: 'Animation', link: '/en/art/animation' },
                { text: 'Effects', link: '/en/art/effects' },
                { text: 'Lighting', link: '/en/art/lighting' }
              ]
            }
          ],
          
          '/en/sound/': [
            {
              text: 'Sound',
              items: [
                { text: 'Overview', link: '/en/sound/' },
                { text: 'BGM Production', link: '/en/sound/bgm' },
                { text: 'Sound Effects', link: '/en/sound/sfx' },
                { text: 'Voice', link: '/en/sound/voice' },
                { text: 'Implementation', link: '/en/sound/implementation' }
              ]
            }
          ],
          
          '/en/api/': [
            {
              text: 'API Reference',
              items: [
                { text: 'Overview', link: '/en/api/' },
                { text: 'Player Class', link: '/en/api/player' },
                { text: 'Enemy Class', link: '/en/api/enemy' },
                { text: 'GameManager', link: '/en/api/game-manager' },
                { text: 'AudioManager', link: '/en/api/audio-manager' },
                { text: 'InputManager', link: '/en/api/input-manager' }
              ]
            }
          ]
        },

        editLink: {
          pattern: 'https://github.com/testkun08080/test-vitepress/edit/main/my-docs/docs/:path',
          text: 'Edit this page'
        },

        lastUpdated: {
          text: 'Last Updated',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium'
          }
        }
      }
    }
  },
  
  themeConfig: {
    logo: '/logo.svg',
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/testkun08080/test-vitepress' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2025 GameDev Team'
    },

    search: {
      provider: 'local'
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
      port: 12001,
      allowedHosts: true,
      cors: true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  }
})