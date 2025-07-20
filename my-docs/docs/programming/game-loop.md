# ゲームループ

ゲームループは、ゲームプログラミングの中核となる構造で、ゲームの実行中に繰り返し実行される一連の処理を定義します。適切に設計されたゲームループは、スムーズなゲームプレイ体験と予測可能なパフォーマンスを提供します。

## ゲームループの基本構造

```javascript
function gameLoop() {
  processInput();
  update();
  render();
  
  requestAnimationFrame(gameLoop);
}

// ゲームループを開始
requestAnimationFrame(gameLoop);
```

### 主要コンポーネント

1. **入力処理 (processInput)**: ユーザー入力（キーボード、マウス、ゲームパッドなど）の検出と処理
2. **更新 (update)**: ゲーム状態の更新（物理シミュレーション、AI、ゲームロジックなど）
3. **描画 (render)**: 現在のゲーム状態の視覚的表現の生成

## 時間ベースのアニメーション

フレームレートに依存しないゲームプレイを実現するために、時間ベースのアニメーションが重要です。

```javascript
let lastTime = 0;

function gameLoop(timestamp) {
  // 前回のフレームからの経過時間（秒）を計算
  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;
  
  processInput();
  update(deltaTime);
  render();
  
  requestAnimationFrame(gameLoop);
}
```

## 固定タイムステップ vs 可変タイムステップ

### 固定タイムステップ

物理シミュレーションなど、一貫した結果が必要な場合に適しています。

```javascript
const FIXED_DELTA_TIME = 1/60; // 60FPSを想定
let accumulator = 0;

function gameLoop(timestamp) {
  const frameTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;
  
  // 蓄積器に経過時間を追加
  accumulator += frameTime;
  
  processInput();
  
  // 固定タイムステップで更新
  while (accumulator >= FIXED_DELTA_TIME) {
    update(FIXED_DELTA_TIME);
    accumulator -= FIXED_DELTA_TIME;
  }
  
  // 補間係数（次のフレームまでの進行度）
  const alpha = accumulator / FIXED_DELTA_TIME;
  render(alpha);
  
  requestAnimationFrame(gameLoop);
}
```

### 可変タイムステップ

シンプルで、視覚的な更新に適していますが、物理シミュレーションでは不安定になる可能性があります。

```javascript
function gameLoop(timestamp) {
  const deltaTime = (timestamp - lastTime) / 1000;
  lastTime = timestamp;
  
  processInput();
  update(deltaTime);
  render();
  
  requestAnimationFrame(gameLoop);
}
```

## パフォーマンス最適化

- **フレームレート制限**: 過剰なCPU/GPU使用を防ぐ
- **スレッド分離**: 更新と描画を別々のスレッドで実行
- **時間測定**: 各処理ステップの実行時間を監視
- **適応的な詳細レベル**: パフォーマンスに基づいて視覚的な複雑さを調整

## 一般的な問題と解決策

### スパイラルオブデス

問題: 処理に時間がかかると、次のフレームでより多くの処理が必要になり、さらに遅延が増加する悪循環。

解決策: 
- 固定タイムステップの使用
- 最大デルタ時間の制限
- 処理の優先順位付け

### 入力遅延

問題: 入力からゲーム内での反応までの遅延。

解決策:
- 入力処理の最適化
- 予測技術の実装
- 描画とロジックの分離

## 参考資料

- "Game Programming Patterns" by Robert Nystrom
- "Fix Your Timestep!" by Glenn Fiedler
- "Game Engine Architecture" by Jason Gregory