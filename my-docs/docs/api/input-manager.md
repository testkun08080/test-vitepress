# InputManager

`InputManager` クラスは、ゲーム内のすべての入力処理を一元管理するシステムです。キーボード、マウス、ゲームパッド、タッチスクリーンなどの入力デバイスからの入力を検出し、ゲームの各部分に適切に伝達します。

## 概要

```typescript
class InputManager {
  // シングルトンインスタンス
  public static readonly instance: InputManager;
  
  // 入力管理機能
}
```

`InputManager` クラスはシングルトンパターンを使用して実装されており、ゲーム内に1つのインスタンスのみ存在します。ゲーム起動時に自動的に初期化され、すべての入力デバイスとその状態を管理します。

## プロパティ

| 名前 | 型 | 説明 |
|------|------|------|
| `isInitialized` | `boolean` | 初期化済みかどうか |
| `activeDevice` | `InputDevice` | 現在アクティブな入力デバイス |
| `keyboardEnabled` | `boolean` | キーボード入力が有効かどうか |
| `mouseEnabled` | `boolean` | マウス入力が有効かどうか |
| `gamepadEnabled` | `boolean` | ゲームパッド入力が有効かどうか |
| `touchEnabled` | `boolean` | タッチ入力が有効かどうか |
| `keyboardState` | `KeyboardState` | キーボードの現在の状態 |
| `mouseState` | `MouseState` | マウスの現在の状態 |
| `gamepadStates` | `Map<number, GamepadState>` | 接続されたゲームパッドの状態 |
| `touchState` | `TouchState` | タッチスクリーンの状態 |
| `inputMappings` | `Map<string, InputMapping>` | アクション名と入力のマッピング |
| `actionStates` | `Map<string, ActionState>` | 各アクションの現在の状態 |
| `vibrationEnabled` | `boolean` | 振動フィードバックが有効かどうか |
| `deadZone` | `number` | アナログ入力のデッドゾーン（0.0〜1.0） |
| `mouseSensitivity` | `number` | マウス感度の倍率 |
| `invertYAxis` | `boolean` | Y軸を反転するかどうか |

## メソッド

### 初期化と設定

```typescript
/**
 * 入力システムを初期化します
 */
initialize(): void;

/**
 * 入力設定を適用します
 * @param settings 適用する設定
 */
applySettings(settings: InputSettings): void;

/**
 * 入力デバイスの有効/無効を設定します
 * @param device 対象デバイス
 * @param enabled 有効にするかどうか
 */
setDeviceEnabled(device: InputDevice, enabled: boolean): void;

/**
 * デッドゾーンを設定します
 * @param value デッドゾーン値（0.0〜1.0）
 */
setDeadZone(value: number): void;

/**
 * マウス感度を設定します
 * @param value 感度倍率
 */
setMouseSensitivity(value: number): void;

/**
 * Y軸反転を設定します
 * @param inverted 反転するかどうか
 */
setInvertYAxis(inverted: boolean): void;
```

### 入力マッピング

```typescript
/**
 * 入力マッピングを登録します
 * @param actionName アクション名
 * @param mapping 入力マッピング
 */
registerMapping(actionName: string, mapping: InputMapping): void;

/**
 * 入力マッピングを削除します
 * @param actionName アクション名
 */
unregisterMapping(actionName: string): void;

/**
 * 入力マッピングをリセットします
 * @param defaultMappings デフォルトのマッピング（省略時は空になる）
 */
resetMappings(defaultMappings?: Map<string, InputMapping>): void;

/**
 * キーボードキーをアクションに割り当てます
 * @param actionName アクション名
 * @param key キーコード
 * @param modifiers 修飾キー（Shift, Ctrl, Alt）
 */
bindKeyToAction(actionName: string, key: KeyCode, modifiers?: KeyModifiers): void;

/**
 * マウスボタンをアクションに割り当てます
 * @param actionName アクション名
 * @param button マウスボタン
 */
bindMouseButtonToAction(actionName: string, button: MouseButton): void;

/**
 * ゲームパッドボタンをアクションに割り当てます
 * @param actionName アクション名
 * @param button ゲームパッドボタン
 * @param gamepadIndex ゲームパッドインデックス（省略時は全て）
 */
bindGamepadButtonToAction(actionName: string, button: GamepadButton, gamepadIndex: number = -1): void;

/**
 * ゲームパッドスティックをアクションに割り当てます
 * @param actionName アクション名
 * @param stick スティック
 * @param axis 軸（X or Y）
 * @param gamepadIndex ゲームパッドインデックス（省略時は全て）
 */
bindGamepadStickToAction(actionName: string, stick: GamepadStick, axis: Axis, gamepadIndex: number = -1): void;
```

### 入力状態の取得

```typescript
/**
 * ボタン入力の状態を取得します
 * @param actionName アクション名
 * @returns ボタンが押されているかどうか
 */
getButton(actionName: string): boolean;

/**
 * ボタンが押された瞬間かどうかを取得します
 * @param actionName アクション名
 * @returns ボタンが押された瞬間かどうか
 */
getButtonDown(actionName: string): boolean;

/**
 * ボタンが離された瞬間かどうかを取得します
 * @param actionName アクション名
 * @returns ボタンが離された瞬間かどうか
 */
getButtonUp(actionName: string): boolean;

/**
 * 軸入力の値を取得します
 * @param actionName アクション名
 * @returns -1.0〜1.0の値
 */
getAxis(actionName: string): number;

/**
 * 2D軸入力の値を取得します
 * @param xAxisName X軸のアクション名
 * @param yAxisName Y軸のアクション名
 * @returns Vector2オブジェクト
 */
getAxisVector(xAxisName: string, yAxisName: string): Vector2;

/**
 * キーが押されているかどうかを取得します
 * @param key キーコード
 * @returns キーが押されているかどうか
 */
getKey(key: KeyCode): boolean;

/**
 * キーが押された瞬間かどうかを取得します
 * @param key キーコード
 * @returns キーが押された瞬間かどうか
 */
getKeyDown(key: KeyCode): boolean;

/**
 * キーが離された瞬間かどうかを取得します
 * @param key キーコード
 * @returns キーが離された瞬間かどうか
 */
getKeyUp(key: KeyCode): boolean;

/**
 * マウスボタンが押されているかどうかを取得します
 * @param button マウスボタン
 * @returns ボタンが押されているかどうか
 */
getMouseButton(button: MouseButton): boolean;

/**
 * マウスボタンが押された瞬間かどうかを取得します
 * @param button マウスボタン
 * @returns ボタンが押された瞬間かどうか
 */
getMouseButtonDown(button: MouseButton): boolean;

/**
 * マウスボタンが離された瞬間かどうかを取得します
 * @param button マウスボタン
 * @returns ボタンが離された瞬間かどうか
 */
getMouseButtonUp(button: MouseButton): boolean;

/**
 * マウス位置を取得します
 * @returns スクリーン座標でのマウス位置
 */
getMousePosition(): Vector2;

/**
 * マウス移動量を取得します
 * @returns 前フレームからの移動量
 */
getMouseDelta(): Vector2;

/**
 * マウスホイールの値を取得します
 * @returns ホイールの回転量
 */
getMouseWheel(): number;

/**
 * ゲームパッドが接続されているかどうかを取得します
 * @param gamepadIndex ゲームパッドインデックス
 * @returns 接続されているかどうか
 */
isGamepadConnected(gamepadIndex: number = 0): boolean;

/**
 * ゲームパッドボタンが押されているかどうかを取得します
 * @param button ゲームパッドボタン
 * @param gamepadIndex ゲームパッドインデックス
 * @returns ボタンが押されているかどうか
 */
getGamepadButton(button: GamepadButton, gamepadIndex: number = 0): boolean;

/**
 * ゲームパッドスティックの値を取得します
 * @param stick スティック
 * @param axis 軸（X or Y）
 * @param gamepadIndex ゲームパッドインデックス
 * @returns -1.0〜1.0の値
 */
getGamepadStick(stick: GamepadStick, axis: Axis, gamepadIndex: number = 0): number;

/**
 * ゲームパッドトリガーの値を取得します
 * @param trigger トリガー（Left or Right）
 * @param gamepadIndex ゲームパッドインデックス
 * @returns 0.0〜1.0の値
 */
getGamepadTrigger(trigger: GamepadTrigger, gamepadIndex: number = 0): number;
```

### フィードバックと特殊機能

```typescript
/**
 * ゲームパッドを振動させます
 * @param intensity 強度（0.0〜1.0）
 * @param duration 継続時間（秒）
 * @param gamepadIndex ゲームパッドインデックス
 */
vibrate(intensity: number, duration: number, gamepadIndex: number = 0): void;

/**
 * 振動を停止します
 * @param gamepadIndex ゲームパッドインデックス
 */
stopVibration(gamepadIndex: number = 0): void;

/**
 * 振動機能の有効/無効を設定します
 * @param enabled 有効にするかどうか
 */
setVibrationEnabled(enabled: boolean): void;

/**
 * カーソルを表示/非表示にします
 * @param visible 表示するかどうか
 */
setCursorVisible(visible: boolean): void;

/**
 * カーソルをロックします
 * @param locked ロックするかどうか
 */
setCursorLocked(locked: boolean): void;
```

### システム管理

```typescript
/**
 * 入力状態を更新します（内部使用）
 */
update(): void;

/**
 * 入力状態をリセットします
 */
reset(): void;

/**
 * 入力処理を一時停止します
 */
pause(): void;

/**
 * 入力処理を再開します
 */
resume(): void;

/**
 * 入力システムを終了します
 */
shutdown(): void;
```

## イベント

`InputManager` クラスは以下のイベントを発行します：

| イベント名 | パラメータ | 説明 |
|------------|------------|------|
| `onDeviceChanged` | `device` | アクティブな入力デバイスが変更されたとき |
| `onGamepadConnected` | `gamepadIndex` | ゲームパッドが接続されたとき |
| `onGamepadDisconnected` | `gamepadIndex` | ゲームパッドが切断されたとき |
| `onKeyDown` | `key, modifiers` | キーが押されたとき |
| `onKeyUp` | `key, modifiers` | キーが離されたとき |
| `onMouseDown` | `button, position` | マウスボタンが押されたとき |
| `onMouseUp` | `button, position` | マウスボタンが離されたとき |
| `onMouseMove` | `position, delta` | マウスが移動したとき |
| `onMouseWheel` | `delta` | マウスホイールが回転したとき |
| `onTouchStart` | `touchId, position` | タッチが開始されたとき |
| `onTouchEnd` | `touchId, position` | タッチが終了したとき |
| `onTouchMove` | `touchId, position, delta` | タッチが移動したとき |
| `onActionPressed` | `actionName` | アクションが実行されたとき |
| `onActionReleased` | `actionName` | アクションが解除されたとき |
| `onAxisChanged` | `actionName, value` | 軸の値が変更されたとき |

## 使用例

### 基本的な入力設定

```typescript
// ゲーム起動時の入力設定
function setupInputSystem() {
  // InputManagerの初期化
  InputManager.instance.initialize();
  
  // デフォルトの入力マッピングを設定
  setupDefaultInputMappings();
  
  // 設定の読み込みと適用
  const savedSettings = SettingsStorage.loadInputSettings();
  if (savedSettings) {
    InputManager.instance.applySettings(savedSettings);
  }
  
  // イベントリスナーの設定
  InputManager.instance.onDeviceChanged.addListener(handleInputDeviceChanged);
  InputManager.instance.onGamepadConnected.addListener(handleGamepadConnected);
  InputManager.instance.onGamepadDisconnected.addListener(handleGamepadDisconnected);
}

// デフォルトの入力マッピングを設定
function setupDefaultInputMappings() {
  // 移動
  InputManager.instance.registerMapping("MoveHorizontal", {
    keyboard: { positive: KeyCode.D, negative: KeyCode.A },
    gamepad: { stick: GamepadStick.Left, axis: Axis.X }
  });
  
  InputManager.instance.registerMapping("MoveVertical", {
    keyboard: { positive: KeyCode.W, negative: KeyCode.S },
    gamepad: { stick: GamepadStick.Left, axis: Axis.Y }
  });
  
  // ジャンプ
  InputManager.instance.registerMapping("Jump", {
    keyboard: { key: KeyCode.Space },
    gamepad: { button: GamepadButton.A },
    mouse: { button: MouseButton.None }
  });
  
  // 攻撃
  InputManager.instance.registerMapping("Attack", {
    keyboard: { key: KeyCode.E },
    gamepad: { button: GamepadButton.X },
    mouse: { button: MouseButton.Left }
  });
  
  // 防御
  InputManager.instance.registerMapping("Defend", {
    keyboard: { key: KeyCode.Q },
    gamepad: { button: GamepadButton.B },
    mouse: { button: MouseButton.Right }
  });
  
  // ダッシュ
  InputManager.instance.registerMapping("Dash", {
    keyboard: { key: KeyCode.LeftShift },
    gamepad: { button: GamepadButton.RightShoulder }
  });
  
  // インタラクション
  InputManager.instance.registerMapping("Interact", {
    keyboard: { key: KeyCode.F },
    gamepad: { button: GamepadButton.Y }
  });
  
  // カメラ回転
  InputManager.instance.registerMapping("LookHorizontal", {
    mouse: { axis: MouseAxis.X },
    gamepad: { stick: GamepadStick.Right, axis: Axis.X }
  });
  
  InputManager.instance.registerMapping("LookVertical", {
    mouse: { axis: MouseAxis.Y },
    gamepad: { stick: GamepadStick.Right, axis: Axis.Y }
  });
  
  // メニュー
  InputManager.instance.registerMapping("Menu", {
    keyboard: { key: KeyCode.Escape },
    gamepad: { button: GamepadButton.Start }
  });
}
```

### プレイヤー制御での使用

```typescript
// プレイヤーの移動制御
function updatePlayerMovement(deltaTime: number) {
  // 移動入力の取得
  const horizontalInput = InputManager.instance.getAxis("MoveHorizontal");
  const verticalInput = InputManager.instance.getAxis("MoveVertical");
  
  // 入力ベクトルの作成
  const moveDirection = new Vector3(horizontalInput, 0, verticalInput);
  
  // 入力の大きさが一定以上なら移動処理
  if (moveDirection.magnitude > 0.1) {
    // 入力ベクトルの正規化
    const normalizedDirection = moveDirection.normalized;
    
    // カメラの向きに合わせて入力方向を変換
    const cameraRelativeDirection = transformDirectionRelativeToCamera(normalizedDirection);
    
    // ダッシュ入力の確認
    const isDashing = InputManager.instance.getButton("Dash");
    
    // プレイヤーの移動
    Player.instance.move(cameraRelativeDirection, isDashing);
    
    // 移動アニメーションの設定
    const speed = isDashing ? "Run" : "Walk";
    Player.instance.animator.setAnimation(speed);
  } else {
    // 入力がない場合はアイドル状態
    Player.instance.animator.setAnimation("Idle");
  }
  
  // ジャンプ処理
  if (InputManager.instance.getButtonDown("Jump") && Player.instance.isGrounded) {
    Player.instance.jump();
    Player.instance.animator.setTrigger("Jump");
  }
  
  // 攻撃処理
  if (InputManager.instance.getButtonDown("Attack")) {
    Player.instance.attack();
    Player.instance.animator.setTrigger("Attack");
  }
  
  // 防御処理
  const isDefending = InputManager.instance.getButton("Defend");
  Player.instance.setDefending(isDefending);
  Player.instance.animator.setBool("IsDefending", isDefending);
  
  // インタラクション処理
  if (InputManager.instance.getButtonDown("Interact")) {
    const interactable = Player.instance.findNearestInteractable();
    if (interactable) {
      interactable.interact(Player.instance);
    }
  }
}

// カメラ制御
function updateCameraControl(deltaTime: number) {
  // カメラ回転入力の取得
  const lookHorizontal = InputManager.instance.getAxis("LookHorizontal");
  const lookVertical = InputManager.instance.getAxis("LookVertical");
  
  // 入力がある場合のみカメラを回転
  if (Math.abs(lookHorizontal) > 0.01 || Math.abs(lookVertical) > 0.01) {
    // マウス感度を適用
    const sensitivity = InputManager.instance.mouseSensitivity;
    
    // Y軸反転の適用
    const verticalFactor = InputManager.instance.invertYAxis ? -1 : 1;
    
    // カメラの回転
    CameraController.instance.rotate(
      lookHorizontal * sensitivity * deltaTime,
      lookVertical * sensitivity * verticalFactor * deltaTime
    );
  }
}

// メニュー制御
function handleMenuInput() {
  if (InputManager.instance.getButtonDown("Menu")) {
    if (GameManager.instance.isPaused) {
      GameManager.instance.resumeGame();
    } else {
      GameManager.instance.pauseGame();
    }
  }
}

// ゲームループでの入力処理
function gameLoop(deltaTime: number) {
  // メニュー入力の処理
  handleMenuInput();
  
  // ゲームが一時停止中でなければプレイヤー制御を更新
  if (!GameManager.instance.isPaused) {
    updatePlayerMovement(deltaTime);
    updateCameraControl(deltaTime);
  }
}
```

### 入力設定UI

```typescript
// 入力設定画面の表示
function showInputSettingsUI() {
  // 現在の設定を取得
  const currentSettings = {
    mouseSensitivity: InputManager.instance.mouseSensitivity,
    invertYAxis: InputManager.instance.invertYAxis,
    vibrationEnabled: InputManager.instance.vibrationEnabled,
    deadZone: InputManager.instance.deadZone
  };
  
  // 設定UIの更新
  document.getElementById("mouse-sensitivity-slider").value = 
    currentSettings.mouseSensitivity.toString();
  
  document.getElementById("invert-y-checkbox").checked = 
    currentSettings.invertYAxis;
  
  document.getElementById("vibration-checkbox").checked = 
    currentSettings.vibrationEnabled;
  
  document.getElementById("dead-zone-slider").value = 
    currentSettings.deadZone.toString();
  
  // キーバインド一覧の表示
  displayKeyBindings();
}

// キーバインド一覧の表示
function displayKeyBindings() {
  const bindingsList = document.getElementById("key-bindings-list");
  bindingsList.innerHTML = "";
  
  // 各アクションのマッピングを表示
  for (const [actionName, mapping] of InputManager.instance.inputMappings) {
    const listItem = document.createElement("li");
    
    // アクション名
    const actionLabel = document.createElement("span");
    actionLabel.textContent = actionName;
    listItem.appendChild(actionLabel);
    
    // キーボードバインド
    if (mapping.keyboard) {
      const keyboardBinding = document.createElement("button");
      keyboardBinding.textContent = getKeyboardBindingText(mapping.keyboard);
      keyboardBinding.onclick = () => startRebindProcess(actionName, "keyboard");
      listItem.appendChild(keyboardBinding);
    }
    
    // ゲームパッドバインド
    if (mapping.gamepad) {
      const gamepadBinding = document.createElement("button");
      gamepadBinding.textContent = getGamepadBindingText(mapping.gamepad);
      gamepadBinding.onclick = () => startRebindProcess(actionName, "gamepad");
      listItem.appendChild(gamepadBinding);
    }
    
    bindingsList.appendChild(listItem);
  }
}

// キー再バインドプロセスの開始
function startRebindProcess(actionName: string, deviceType: string) {
  // 現在のバインディングを表示
  const currentBinding = InputManager.instance.inputMappings.get(actionName);
  
  // 再バインドモードの開始
  showRebindPrompt(actionName, deviceType, (newBinding) => {
    if (newBinding) {
      // 新しいバインディングを適用
      if (deviceType === "keyboard") {
        InputManager.instance.bindKeyToAction(
          actionName, 
          newBinding.key, 
          newBinding.modifiers
        );
      } else if (deviceType === "gamepad") {
        if (newBinding.button !== undefined) {
          InputManager.instance.bindGamepadButtonToAction(
            actionName,
            newBinding.button
          );
        } else if (newBinding.stick !== undefined) {
          InputManager.instance.bindGamepadStickToAction(
            actionName,
            newBinding.stick,
            newBinding.axis
          );
        }
      }
      
      // バインディング一覧を更新
      displayKeyBindings();
      
      // 設定の保存
      saveInputSettings();
    }
  });
}

// 入力設定の保存
function saveInputSettings() {
  const settings = {
    mouseSensitivity: InputManager.instance.mouseSensitivity,
    invertYAxis: InputManager.instance.invertYAxis,
    vibrationEnabled: InputManager.instance.vibrationEnabled,
    deadZone: InputManager.instance.deadZone,
    inputMappings: Array.from(InputManager.instance.inputMappings.entries())
  };
  
  // 設定の保存
  SettingsStorage.saveInputSettings(settings);
  
  // 確認メッセージ
  showNotification("入力設定を保存しました");
}
```

## 注意事項

- `InputManager` クラスはシングルトンパターンを使用しているため、`InputManager.instance` を通じてアクセスします。
- 入力処理は毎フレーム `update` メソッドが呼ばれることを前提としています。ゲームループ内で必ず呼び出してください。
- `getButtonDown` と `getButtonUp` は1フレームだけ `true` を返すため、複数のシステムで使用する場合は注意が必要です。
- 複数のデバイスからの入力を同時に処理できますが、`activeDevice` は最後に使用されたデバイスを示します。
- モバイルデバイスでは、タッチ入力をゲームパッドやキーボード入力に変換するための追加設定が必要な場合があります。
- 入力マッピングの変更はゲーム中でも可能ですが、プレイヤーが混乱しないよう、適切なUIフィードバックを提供してください。