# ネットワーク

ゲームのネットワーキングは、複数のプレイヤーが同じゲーム世界で対話できるようにするための技術です。効果的なネットワークシステムは、遅延、パケットロス、帯域幅制限などの課題に対処しながら、一貫したゲーム体験を提供します。

## ネットワークアーキテクチャ

### クライアント・サーバーモデル

中央サーバーがゲーム状態を管理し、クライアントと通信するモデル。

- **利点**: 一貫性の高い状態管理、チート防止、新規参加の容易さ
- **欠点**: サーバーコスト、単一障害点、サーバー遅延

### ピア・ツー・ピアモデル

各プレイヤーが直接他のプレイヤーと通信するモデル。

- **利点**: 低遅延（理想的な条件下）、サーバーコスト不要
- **欠点**: 同期の複雑さ、チート防止の難しさ、NAT通過の問題

### ハイブリッドモデル

クライアント・サーバーとピア・ツー・ピアの要素を組み合わせたモデル。

- **例**: 権威サーバーと直接P2P通信の組み合わせ
- **利点**: 柔軟性、特定のゲームニーズへの適応性
- **欠点**: 実装の複雑さ

## 同期メカニズム

### 状態同期

サーバーが定期的に完全または部分的なゲーム状態を送信する方法。

```javascript
// サーバー側
function broadcastGameState() {
  const gameState = {
    players: getPlayerStates(),
    entities: getEntityStates(),
    timestamp: getCurrentTime()
  };
  
  broadcastToAllClients(gameState);
}
```

- **利点**: 実装の単純さ、堅牢性
- **欠点**: 帯域幅使用量、更新頻度の制限

### 入力同期（ロックステップ）

各プレイヤーの入力のみを送信し、すべてのクライアントで同一のシミュレーションを実行する方法。

```javascript
// クライアント側
function sendPlayerInput() {
  const input = {
    playerId: localPlayerId,
    actions: getCurrentInput(),
    timestamp: getCurrentTime()
  };
  
  sendToServer(input);
}
```

- **利点**: 低帯域幅、高い応答性（理想的な条件下）
- **欠点**: 決定論的シミュレーションの必要性、遅延の影響を受けやすい

### イベント同期

重要なイベントのみを送信する方法。

```javascript
// サーバー側
function broadcastEvent(eventType, eventData) {
  const event = {
    type: eventType,
    data: eventData,
    timestamp: getCurrentTime()
  };
  
  broadcastToAllClients(event);
}
```

- **利点**: 非常に低い帯域幅、特定のゲームタイプに最適
- **欠点**: 複雑な状態管理、同期エラーの可能性

## 遅延対策技術

### クライアント側予測

クライアントが自身の入力の結果を即座に予測し、後でサーバーからの確認で修正する技術。

```javascript
// クライアント側
function applyLocalInput(input) {
  // 予測を適用
  applyInputLocally(input);
  
  // サーバーに送信
  sendToServer(input);
  
  // 予測履歴に保存
  storePrediction(input, getCurrentState());
}

function receiveServerState(serverState) {
  // サーバー状態と予測の差異を調整
  reconcileWithPredictions(serverState);
}
```

- **利点**: 応答性の向上、遅延の知覚的軽減
- **欠点**: 実装の複雑さ、予測エラー時の視覚的不整合

### エンティティ補間

受信したスナップショット間を滑らかに補間する技術。

```javascript
// クライアント側
function renderEntity(entity, renderTime) {
  // 過去の2つの状態間を補間
  const prevState = getEntityStateBeforeTime(entity.id, renderTime);
  const nextState = getEntityStateAfterTime(entity.id, renderTime);
  
  if (prevState && nextState) {
    const t = calculateInterpolationFactor(prevState, nextState, renderTime);
    const interpolatedState = interpolate(prevState, nextState, t);
    renderEntityAtState(entity, interpolatedState);
  }
}
```

- **利点**: 滑らかな視覚表現、ジッターの軽減
- **欠点**: 表示遅延の増加

### ラグ補償

サーバーがクライアントの遅延を考慮して過去の状態を再構築する技術。

```javascript
// サーバー側
function processPlayerAction(playerId, action, clientTime) {
  // プレイヤーの遅延を推定
  const latency = estimatePlayerLatency(playerId);
  
  // 過去の状態を再構築
  const pastState = rewindGameState(getCurrentTime() - latency);
  
  // 過去の状態でアクションを処理
  const result = executeActionInState(pastState, action);
  
  // 結果を現在の状態に適用
  applyActionResultToCurrentState(result);
}
```

- **利点**: 高遅延環境での公平性向上
- **欠点**: サーバー負荷の増加、時間的不整合の可能性

## セキュリティ考慮事項

- **権威サーバー**: 重要なゲームロジックをサーバーで実行
- **入力検証**: クライアントからの入力の妥当性確認
- **暗号化**: 機密データの保護
- **チート検出**: 異常な動作やパターンの監視
- **レート制限**: サーバーリソースの保護

## 参考資料

- "Multiplayer Game Programming" by Joshua Glazer and Sanjay Madhav
- "Networking for Game Programmers" by Glenn Fiedler
- "Fast-Paced Multiplayer" by Gabriel Gambetta