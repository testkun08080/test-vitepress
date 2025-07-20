# GameManager

`GameManager` クラスは、ゲーム全体の状態管理、シーン遷移、ゲームフロー制御を担当する中核的なクラスです。ゲームの初期化、保存/読み込み、ゲームモード切り替えなどの機能を提供します。

## 概要

```typescript
class GameManager {
  // シングルトンインスタンス
  public static readonly instance: GameManager;
  
  // ゲームマネージャーの機能
}
```

`GameManager` クラスはシングルトンパターンを使用して実装されており、ゲーム内に1つのインスタンスのみ存在します。ゲーム起動時に自動的に初期化され、ゲーム終了まで存在し続けます。

## 定数

| 名前 | 型 | 説明 |
|------|------|------|
| `VERSION` | `string` | ゲームのバージョン番号 |
| `MAX_PLAYERS` | `number` | サポートする最大プレイヤー数 |
| `DEFAULT_DIFFICULTY` | `GameDifficulty` | デフォルトの難易度設定 |
| `SAVE_SLOT_COUNT` | `number` | 利用可能なセーブスロット数 |

## プロパティ

| 名前 | 型 | 説明 |
|------|------|------|
| `gameState` | `GameState` | 現在のゲーム状態（メニュー、プレイ中、一時停止など） |
| `difficulty` | `GameDifficulty` | 現在の難易度設定 |
| `currentLevel` | `Level` | 現在読み込まれているレベル |
| `player` | `Player` | プレイヤーへの参照 |
| `timeScale` | `number` | ゲーム時間のスケール（1.0が通常速度） |
| `gameTime` | `number` | ゲーム内経過時間（秒） |
| `realTime` | `number` | 実時間の経過時間（秒） |
| `isPaused` | `boolean` | ゲームが一時停止中かどうか |
| `isGameOver` | `boolean` | ゲームオーバー状態かどうか |
| `currentSaveSlot` | `number` | 現在使用中のセーブスロット |
| `settings` | `GameSettings` | ゲーム設定 |
| `achievementManager` | `AchievementManager` | 実績管理システム |
| `inputManager` | `InputManager` | 入力管理システム |
| `audioManager` | `AudioManager` | オーディオ管理システム |
| `uiManager` | `UIManager` | UI管理システム |

## メソッド

### ゲーム初期化と終了

```typescript
/**
 * ゲームを初期化します
 */
initialize(): void;

/**
 * ゲームを開始します
 * @param newGame 新規ゲームかどうか
 * @param saveSlot 使用するセーブスロット（新規ゲームの場合は無視）
 */
startGame(newGame: boolean = true, saveSlot: number = 0): void;

/**
 * ゲームを終了します
 * @param saveBeforeQuit 終了前に保存するかどうか
 */
quitGame(saveBeforeQuit: boolean = true): void;

/**
 * ゲームをリセットします
 */
resetGame(): void;
```

### ゲーム状態管理

```typescript
/**
 * ゲーム状態を変更します
 * @param newState 新しいゲーム状態
 */
changeGameState(newState: GameState): void;

/**
 * ゲームを一時停止します
 */
pauseGame(): void;

/**
 * ゲームを再開します
 */
resumeGame(): void;

/**
 * 難易度を設定します
 * @param difficulty 新しい難易度
 */
setDifficulty(difficulty: GameDifficulty): void;

/**
 * ゲームオーバー処理を行います
 * @param reason ゲームオーバーの理由
 */
gameOver(reason: GameOverReason): void;

/**
 * ゲームクリア処理を行います
 */
completeGame(): void;
```

### レベルと進行管理

```typescript
/**
 * レベルを読み込みます
 * @param levelId 読み込むレベルのID
 * @param showLoadingScreen ロード画面を表示するかどうか
 * @returns 読み込みが完了したPromise
 */
loadLevel(levelId: string, showLoadingScreen: boolean = true): Promise<void>;

/**
 * 現在のレベルを再読み込みします
 * @returns 読み込みが完了したPromise
 */
reloadCurrentLevel(): Promise<void>;

/**
 * 次のレベルに進みます
 * @returns 読み込みが完了したPromise
 */
loadNextLevel(): Promise<void>;

/**
 * チェックポイントを設定します
 * @param position チェックポイントの位置
 * @param checkpointId チェックポイントのID
 */
setCheckpoint(position: Vector3, checkpointId: string): void;

/**
 * 最後のチェックポイントからリスポーンします
 */
respawnAtCheckpoint(): void;
```

### セーブとロード

```typescript
/**
 * ゲームを保存します
 * @param slotIndex 保存先のスロットインデックス
 * @param saveDescription 保存データの説明
 * @returns 保存に成功したかどうか
 */
saveGame(slotIndex: number = -1, saveDescription: string = ""): boolean;

/**
 * ゲームを読み込みます
 * @param slotIndex 読み込むスロットインデックス
 * @returns 読み込みに成功したかどうか
 */
loadGame(slotIndex: number): boolean;

/**
 * セーブデータの存在を確認します
 * @param slotIndex 確認するスロットインデックス
 * @returns セーブデータが存在するかどうか
 */
hasSaveData(slotIndex: number): boolean;

/**
 * セーブデータの情報を取得します
 * @param slotIndex スロットインデックス
 * @returns セーブデータの情報
 */
getSaveInfo(slotIndex: number): SaveGameInfo | null;

/**
 * セーブデータを削除します
 * @param slotIndex 削除するスロットインデックス
 * @returns 削除に成功したかどうか
 */
deleteSaveData(slotIndex: number): boolean;
```

### ユーティリティ

```typescript
/**
 * 現在のゲーム時間を取得します
 * @param formatted 整形された文字列で取得するかどうか
 * @returns ゲーム時間（秒または整形された文字列）
 */
getGameTime(formatted: boolean = false): number | string;

/**
 * ゲーム時間のスケールを設定します
 * @param scale 新しい時間スケール
 */
setTimeScale(scale: number): void;

/**
 * スクリーンショットを撮影します
 * @param filename ファイル名
 * @returns 保存に成功したかどうか
 */
takeScreenshot(filename: string = ""): boolean;

/**
 * デバッグモードを切り替えます
 * @param enabled 有効にするかどうか
 */
setDebugMode(enabled: boolean): void;

/**
 * ゲーム設定を適用します
 * @param settings 適用する設定
 */
applySettings(settings: GameSettings): void;
```

## イベント

`GameManager` クラスは以下のイベントを発行します：

| イベント名 | パラメータ | 説明 |
|------------|------------|------|
| `onGameStateChanged` | `newState, oldState` | ゲーム状態が変化したとき |
| `onLevelLoaded` | `levelId` | レベルが読み込まれたとき |
| `onLevelCompleted` | `levelId` | レベルがクリアされたとき |
| `onGamePaused` | なし | ゲームが一時停止されたとき |
| `onGameResumed` | なし | ゲームが再開されたとき |
| `onGameSaved` | `slotIndex` | ゲームが保存されたとき |
| `onGameLoaded` | `slotIndex` | ゲームが読み込まれたとき |
| `onCheckpointReached` | `checkpointId` | チェックポイントに到達したとき |
| `onPlayerRespawned` | `checkpointId` | プレイヤーがリスポーンしたとき |
| `onGameOver` | `reason` | ゲームオーバーになったとき |
| `onGameCompleted` | なし | ゲームがクリアされたとき |
| `onDifficultyChanged` | `newDifficulty` | 難易度が変更されたとき |

## 使用例

### ゲーム初期化と開始

```typescript
// ゲーム起動時の初期化
function initializeGame() {
  // GameManagerの初期化
  GameManager.instance.initialize();
  
  // 設定の読み込み
  const savedSettings = SettingsStorage.loadSettings();
  if (savedSettings) {
    GameManager.instance.applySettings(savedSettings);
  }
  
  // メインメニューの表示
  UIManager.instance.showMainMenu();
  
  // イベントリスナーの設定
  GameManager.instance.onGameStateChanged.addListener(handleGameStateChanged);
  GameManager.instance.onGameOver.addListener(handleGameOver);
}

// 新規ゲーム開始
function startNewGame() {
  // 難易度選択ダイアログの表示
  UIManager.instance.showDifficultySelection((selectedDifficulty) => {
    // 難易度の設定
    GameManager.instance.setDifficulty(selectedDifficulty);
    
    // 新規ゲームの開始
    GameManager.instance.startGame(true);
    
    // ローディング画面の表示
    UIManager.instance.showLoadingScreen();
  });
}

// 保存されたゲームの読み込み
function loadSavedGame(slotIndex: number) {
  // セーブデータの存在確認
  if (GameManager.instance.hasSaveData(slotIndex)) {
    // セーブ情報の取得と表示
    const saveInfo = GameManager.instance.getSaveInfo(slotIndex);
    UIManager.instance.showSaveInfo(saveInfo);
    
    // ゲームの読み込み
    GameManager.instance.loadGame(slotIndex);
    
    // ローディング画面の表示
    UIManager.instance.showLoadingScreen();
  } else {
    UIManager.instance.showMessage("セーブデータが見つかりません");
  }
}
```

### ゲーム状態管理

```typescript
// ゲーム状態変更のハンドラ
function handleGameStateChanged(newState: GameState, oldState: GameState) {
  console.log(`Game state changed from ${oldState} to ${newState}`);
  
  switch (newState) {
    case GameState.MainMenu:
      // メインメニュー表示
      UIManager.instance.showMainMenu();
      // BGM変更
      AudioManager.instance.playMusic("menu_theme");
      break;
      
    case GameState.Playing:
      // ゲームUI表示
      UIManager.instance.showGameUI();
      // レベルBGM再生
      if (GameManager.instance.currentLevel) {
        AudioManager.instance.playMusic(GameManager.instance.currentLevel.musicTrack);
      }
      break;
      
    case GameState.Paused:
      // ポーズメニュー表示
      UIManager.instance.showPauseMenu();
      // 効果音
      AudioManager.instance.playSoundEffect("pause");
      break;
      
    case GameState.GameOver:
      // ゲームオーバー画面表示
      UIManager.instance.showGameOverScreen();
      // ゲームオーバーBGM
      AudioManager.instance.playMusic("game_over_theme");
      break;
  }
}

// ポーズボタン処理
function handlePauseButton() {
  if (GameManager.instance.gameState === GameState.Playing) {
    GameManager.instance.pauseGame();
  } else if (GameManager.instance.gameState === GameState.Paused) {
    GameManager.instance.resumeGame();
  }
}

// ゲームオーバーハンドラ
function handleGameOver(reason: GameOverReason) {
  console.log(`Game over: ${reason}`);
  
  // 死亡アニメーション
  if (reason === GameOverReason.PlayerDeath) {
    Player.instance.playDeathAnimation().then(() => {
      // リスポーンオプションの表示
      UIManager.instance.showRespawnOptions();
    });
  }
  
  // 統計情報の記録
  StatisticsManager.instance.recordGameOver(reason);
}
```

### セーブとロード

```typescript
// 自動セーブ
function performAutoSave() {
  // 自動セーブが有効か確認
  if (GameManager.instance.settings.enableAutoSave) {
    // 自動セーブスロットに保存
    const success = GameManager.instance.saveGame(0, "Auto Save");
    
    if (success) {
      // 通知表示
      UIManager.instance.showNotification("ゲームを自動保存しました");
    } else {
      console.error("Auto save failed");
    }
  }
}

// 手動セーブ
function handleSaveGameRequest() {
  // セーブスロット選択画面の表示
  UIManager.instance.showSaveSlotSelection((selectedSlot, description) => {
    // 選択されたスロットに保存
    const success = GameManager.instance.saveGame(selectedSlot, description);
    
    if (success) {
      UIManager.instance.showMessage("ゲームを保存しました");
    } else {
      UIManager.instance.showMessage("保存に失敗しました", "error");
    }
  });
}

// セーブデータの管理
function handleSaveDataManagement() {
  // 全セーブスロットの情報を取得
  const saveInfoList = [];
  for (let i = 0; i < GameManager.SAVE_SLOT_COUNT; i++) {
    if (GameManager.instance.hasSaveData(i)) {
      saveInfoList.push(GameManager.instance.getSaveInfo(i));
    } else {
      saveInfoList.push(null);
    }
  }
  
  // セーブデータ管理画面の表示
  UIManager.instance.showSaveDataManagement(saveInfoList, {
    onLoad: (slotIndex) => GameManager.instance.loadGame(slotIndex),
    onDelete: (slotIndex) => {
      // 削除確認ダイアログ
      UIManager.instance.showConfirmDialog(
        "セーブデータを削除しますか？",
        () => GameManager.instance.deleteSaveData(slotIndex)
      );
    }
  });
}
```

## 注意事項

- `GameManager` クラスはシングルトンパターンを使用しているため、`GameManager.instance` を通じてアクセスします。
- ゲームの状態遷移は必ず `changeGameState` メソッドを通じて行い、直接 `gameState` プロパティを変更しないでください。
- セーブデータの互換性を確保するため、ゲームのバージョンアップ時には適切なマイグレーション処理を実装する必要があります。
- 時間に関連する処理は `timeScale` の影響を受けるため、実時間が必要な場合は `realTime` プロパティを使用してください。
- 複数のシステム間の依存関係に注意し、初期化順序を適切に管理してください。