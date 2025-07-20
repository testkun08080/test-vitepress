# AudioManager

`AudioManager` クラスは、ゲーム内のすべての音声再生と管理を担当するシステムです。BGM、効果音、環境音、ボイスなどの再生、ミキシング、空間化を制御します。

## 概要

```typescript
class AudioManager {
  // シングルトンインスタンス
  public static readonly instance: AudioManager;
  
  // オーディオ管理機能
}
```

`AudioManager` クラスはシングルトンパターンを使用して実装されており、ゲーム内に1つのインスタンスのみ存在します。ゲーム起動時に自動的に初期化され、すべてのオーディオリソースとその再生を管理します。

## プロパティ

| 名前 | 型 | 説明 |
|------|------|------|
| `masterVolume` | `number` | 全体の音量（0.0〜1.0） |
| `musicVolume` | `number` | BGMの音量（0.0〜1.0） |
| `sfxVolume` | `number` | 効果音の音量（0.0〜1.0） |
| `voiceVolume` | `number` | ボイスの音量（0.0〜1.0） |
| `ambientVolume` | `number` | 環境音の音量（0.0〜1.0） |
| `isMuted` | `boolean` | ミュート状態かどうか |
| `currentMusic` | `string` | 現在再生中のBGMのID |
| `currentAmbient` | `string` | 現在再生中の環境音のID |
| `listenerPosition` | `Vector3` | オーディオリスナーの位置 |
| `listenerOrientation` | `Quaternion` | オーディオリスナーの向き |
| `activeSounds` | `Map<string, Sound>` | 現在再生中のすべてのサウンド |
| `soundBank` | `Map<string, AudioClip>` | 読み込まれたオーディオクリップ |
| `soundGroups` | `Map<string, SoundGroup>` | サウンドグループの定義 |
| `dspEffects` | `Map<string, AudioEffect>` | 利用可能なDSPエフェクト |
| `mixerSnapshots` | `Map<string, MixerSnapshot>` | ミキサースナップショット |

## メソッド

### 初期化と設定

```typescript
/**
 * オーディオシステムを初期化します
 */
initialize(): void;

/**
 * オーディオリソースを読み込みます
 * @param resourcePath リソースのパス
 * @returns 読み込みが完了したPromise
 */
loadAudioResources(resourcePath: string): Promise<void>;

/**
 * オーディオ設定を適用します
 * @param settings 適用する設定
 */
applySettings(settings: AudioSettings): void;

/**
 * オーディオリスナーを更新します
 * @param position リスナーの位置
 * @param orientation リスナーの向き
 */
updateListener(position: Vector3, orientation: Quaternion): void;
```

### 音量制御

```typescript
/**
 * マスター音量を設定します
 * @param volume 音量（0.0〜1.0）
 */
setMasterVolume(volume: number): void;

/**
 * BGM音量を設定します
 * @param volume 音量（0.0〜1.0）
 */
setMusicVolume(volume: number): void;

/**
 * 効果音音量を設定します
 * @param volume 音量（0.0〜1.0）
 */
setSFXVolume(volume: number): void;

/**
 * ボイス音量を設定します
 * @param volume 音量（0.0〜1.0）
 */
setVoiceVolume(volume: number): void;

/**
 * 環境音音量を設定します
 * @param volume 音量（0.0〜1.0）
 */
setAmbientVolume(volume: number): void;

/**
 * ミュート状態を設定します
 * @param muted ミュートするかどうか
 */
setMute(muted: boolean): void;

/**
 * ミュート状態を切り替えます
 * @returns 新しいミュート状態
 */
toggleMute(): boolean;
```

### 音楽再生

```typescript
/**
 * BGMを再生します
 * @param musicId 再生するBGMのID
 * @param fadeInTime フェードイン時間（秒）
 * @param loop ループ再生するかどうか
 * @param volume 音量（0.0〜1.0、省略時はmusicVolumeを使用）
 * @returns 再生されたサウンドのID
 */
playMusic(musicId: string, fadeInTime: number = 0, loop: boolean = true, volume?: number): string;

/**
 * 現在のBGMを停止します
 * @param fadeOutTime フェードアウト時間（秒）
 */
stopMusic(fadeOutTime: number = 0): void;

/**
 * BGMを一時停止します
 */
pauseMusic(): void;

/**
 * 一時停止したBGMを再開します
 */
resumeMusic(): void;

/**
 * 別のBGMにクロスフェードします
 * @param musicId 新しいBGMのID
 * @param crossFadeTime クロスフェード時間（秒）
 * @param loop ループ再生するかどうか
 * @returns 再生されたサウンドのID
 */
crossFadeMusic(musicId: string, crossFadeTime: number = 2.0, loop: boolean = true): string;
```

### 効果音再生

```typescript
/**
 * 効果音を再生します
 * @param sfxId 再生する効果音のID
 * @param volume 音量（0.0〜1.0、省略時はsfxVolumeを使用）
 * @param pitch ピッチ（1.0が通常）
 * @param loop ループ再生するかどうか
 * @returns 再生されたサウンドのID
 */
playSFX(sfxId: string, volume?: number, pitch: number = 1.0, loop: boolean = false): string;

/**
 * 3D空間上で効果音を再生します
 * @param sfxId 再生する効果音のID
 * @param position 再生位置
 * @param volume 音量（0.0〜1.0、省略時はsfxVolumeを使用）
 * @param pitch ピッチ（1.0が通常）
 * @param minDistance 最小距離（この距離以内では減衰しない）
 * @param maxDistance 最大距離（この距離以上では聞こえない）
 * @returns 再生されたサウンドのID
 */
playSFX3D(sfxId: string, position: Vector3, volume?: number, pitch: number = 1.0, minDistance: number = 1.0, maxDistance: number = 50.0): string;

/**
 * ランダムな効果音を再生します
 * @param sfxIds 候補となる効果音IDの配列
 * @param volume 音量（0.0〜1.0、省略時はsfxVolumeを使用）
 * @returns 再生されたサウンドのID
 */
playRandomSFX(sfxIds: string[], volume?: number): string;

/**
 * 効果音の再生をスケジュールします
 * @param sfxId 再生する効果音のID
 * @param delay 遅延時間（秒）
 * @param volume 音量（0.0〜1.0、省略時はsfxVolumeを使用）
 * @returns スケジュールされたサウンドのID
 */
scheduleSFX(sfxId: string, delay: number, volume?: number): string;
```

### 環境音再生

```typescript
/**
 * 環境音を再生します
 * @param ambientId 再生する環境音のID
 * @param fadeInTime フェードイン時間（秒）
 * @param loop ループ再生するかどうか
 * @param volume 音量（0.0〜1.0、省略時はambientVolumeを使用）
 * @returns 再生されたサウンドのID
 */
playAmbient(ambientId: string, fadeInTime: number = 1.0, loop: boolean = true, volume?: number): string;

/**
 * 現在の環境音を停止します
 * @param fadeOutTime フェードアウト時間（秒）
 */
stopAmbient(fadeOutTime: number = 1.0): void;

/**
 * 環境音をクロスフェードします
 * @param ambientId 新しい環境音のID
 * @param crossFadeTime クロスフェード時間（秒）
 * @returns 再生されたサウンドのID
 */
crossFadeAmbient(ambientId: string, crossFadeTime: number = 3.0): string;

/**
 * 複数の環境音をレイヤーとして再生します
 * @param ambientIds 再生する環境音IDの配列
 * @param fadeInTime フェードイン時間（秒）
 * @returns 再生されたサウンドIDの配列
 */
playAmbientLayers(ambientIds: string[], fadeInTime: number = 1.0): string[];
```

### ボイス再生

```typescript
/**
 * ボイスを再生します
 * @param voiceId 再生するボイスのID
 * @param volume 音量（0.0〜1.0、省略時はvoiceVolumeを使用）
 * @param priority 優先度（高いほど優先される）
 * @returns 再生されたサウンドのID
 */
playVoice(voiceId: string, volume?: number, priority: number = 1): string;

/**
 * 3D空間上でボイスを再生します
 * @param voiceId 再生するボイスのID
 * @param position 再生位置
 * @param volume 音量（0.0〜1.0、省略時はvoiceVolumeを使用）
 * @returns 再生されたサウンドのID
 */
playVoice3D(voiceId: string, position: Vector3, volume?: number): string;

/**
 * 現在再生中のボイスをすべて停止します
 */
stopAllVoices(): void;

/**
 * 特定のキャラクターのボイスを再生します
 * @param characterId キャラクターID
 * @param voiceType ボイスタイプ（"attack", "hurt"など）
 * @param volume 音量（0.0〜1.0、省略時はvoiceVolumeを使用）
 * @returns 再生されたサウンドのID
 */
playCharacterVoice(characterId: string, voiceType: string, volume?: number): string;
```

### サウンド制御

```typescript
/**
 * 特定のサウンドを停止します
 * @param soundId 停止するサウンドのID
 * @param fadeOutTime フェードアウト時間（秒）
 */
stopSound(soundId: string, fadeOutTime: number = 0): void;

/**
 * 特定のサウンドを一時停止します
 * @param soundId 一時停止するサウンドのID
 */
pauseSound(soundId: string): void;

/**
 * 一時停止したサウンドを再開します
 * @param soundId 再開するサウンドのID
 */
resumeSound(soundId: string): void;

/**
 * サウンドの音量を設定します
 * @param soundId 対象サウンドのID
 * @param volume 音量（0.0〜1.0）
 * @param fadeTime フェード時間（秒）
 */
setSoundVolume(soundId: string, volume: number, fadeTime: number = 0): void;

/**
 * サウンドのピッチを設定します
 * @param soundId 対象サウンドのID
 * @param pitch ピッチ（1.0が通常）
 */
setSoundPitch(soundId: string, pitch: number): void;

/**
 * サウンドの3D位置を更新します
 * @param soundId 対象サウンドのID
 * @param position 新しい位置
 */
updateSoundPosition(soundId: string, position: Vector3): void;
```

### ミキシングと効果

```typescript
/**
 * ミキサースナップショットを適用します
 * @param snapshotId スナップショットID
 * @param transitionTime 遷移時間（秒）
 */
applyMixerSnapshot(snapshotId: string, transitionTime: number = 1.0): void;

/**
 * サウンドにエフェクトを適用します
 * @param soundId 対象サウンドのID
 * @param effectId 適用するエフェクトID
 * @param intensity 効果の強さ（0.0〜1.0）
 */
applySoundEffect(soundId: string, effectId: string, intensity: number = 1.0): void;

/**
 * サウンドからエフェクトを削除します
 * @param soundId 対象サウンドのID
 * @param effectId 削除するエフェクトID
 */
removeSoundEffect(soundId: string, effectId: string): void;

/**
 * リバーブゾーンを設定します
 * @param zoneId ゾーンID
 * @param position ゾーンの中心位置
 * @param radius ゾーンの半径
 * @param reverbPreset リバーブプリセット
 */
setReverbZone(zoneId: string, position: Vector3, radius: number, reverbPreset: ReverbPreset): void;
```

### ユーティリティ

```typescript
/**
 * すべてのサウンドを停止します
 * @param fadeOutTime フェードアウト時間（秒）
 */
stopAllSounds(fadeOutTime: number = 0): void;

/**
 * すべてのサウンドを一時停止します
 */
pauseAllSounds(): void;

/**
 * すべての一時停止したサウンドを再開します
 */
resumeAllSounds(): void;

/**
 * 特定のグループのサウンドをすべて停止します
 * @param groupId グループID
 * @param fadeOutTime フェードアウト時間（秒）
 */
stopSoundGroup(groupId: string, fadeOutTime: number = 0): void;

/**
 * オーディオシステムを更新します（内部使用）
 * @param deltaTime 前フレームからの経過時間
 */
update(deltaTime: number): void;
```

## イベント

`AudioManager` クラスは以下のイベントを発行します：

| イベント名 | パラメータ | 説明 |
|------------|------------|------|
| `onMusicStarted` | `musicId` | BGMの再生が開始されたとき |
| `onMusicStopped` | `musicId` | BGMの再生が停止されたとき |
| `onAmbientStarted` | `ambientId` | 環境音の再生が開始されたとき |
| `onAmbientStopped` | `ambientId` | 環境音の再生が停止されたとき |
| `onVoiceStarted` | `voiceId` | ボイスの再生が開始されたとき |
| `onVoiceStopped` | `voiceId` | ボイスの再生が停止されたとき |
| `onSoundFinished` | `soundId` | サウンドの再生が終了したとき |
| `onVolumeChanged` | `volumeType, value` | 音量設定が変更されたとき |
| `onMuteChanged` | `isMuted` | ミュート状態が変更されたとき |
| `onMixerSnapshotChanged` | `snapshotId` | ミキサースナップショットが変更されたとき |

## 使用例

### 基本的な音声再生

```typescript
// BGMの再生
function playLevelMusic(levelId: string) {
  // レベルに応じたBGMの選択
  let musicId;
  switch (levelId) {
    case "forest":
      musicId = "music_forest_theme";
      break;
    case "dungeon":
      musicId = "music_dungeon_theme";
      break;
    case "boss":
      musicId = "music_boss_battle";
      break;
    default:
      musicId = "music_main_theme";
  }
  
  // BGMの再生（2秒かけてフェードイン）
  AudioManager.instance.playMusic(musicId, 2.0, true);
  
  // 環境音の設定
  if (levelId === "forest") {
    // 森の環境音（鳥のさえずり、風の音など）をレイヤーとして再生
    AudioManager.instance.playAmbientLayers([
      "ambient_forest_birds",
      "ambient_forest_wind",
      "ambient_forest_creek"
    ], 3.0);
  } else if (levelId === "dungeon") {
    // ダンジョンの環境音
    AudioManager.instance.playAmbient("ambient_dungeon", 2.0);
  }
}

// プレイヤーの足音
function playFootstepSound(surfaceType: SurfaceType) {
  // 表面タイプに応じた足音の選択
  let footstepSounds: string[];
  
  switch (surfaceType) {
    case SurfaceType.Grass:
      footstepSounds = [
        "footstep_grass_01",
        "footstep_grass_02",
        "footstep_grass_03",
        "footstep_grass_04"
      ];
      break;
    case SurfaceType.Stone:
      footstepSounds = [
        "footstep_stone_01",
        "footstep_stone_02",
        "footstep_stone_03"
      ];
      break;
    // 他の表面タイプも同様に...
    default:
      footstepSounds = [
        "footstep_default_01",
        "footstep_default_02"
      ];
  }
  
  // ランダムな足音を再生
  AudioManager.instance.playRandomSFX(footstepSounds, 0.7);
}

// 3D効果音の再生
function playExplosion(position: Vector3, size: number) {
  // 爆発音の再生（位置と大きさに基づいて設定）
  const soundId = AudioManager.instance.playSFX3D(
    "explosion_large",
    position,
    Math.min(1.0, 0.6 + size * 0.4), // サイズに応じた音量
    1.0 - size * 0.2, // サイズに応じたピッチ（大きいほど低い）
    5.0, // 最小距離
    50.0 // 最大距離
  );
  
  // 残響効果の追加
  AudioManager.instance.applySoundEffect(soundId, "reverb", 0.7);
  
  // 爆発後の破片音
  setTimeout(() => {
    for (let i = 0; i < Math.floor(size * 3); i++) {
      // 破片の位置をランダムに計算
      const debrisPosition = new Vector3(
        position.x + (Math.random() - 0.5) * size * 2,
        position.y + (Math.random() - 0.5) * size * 2,
        position.z + (Math.random() - 0.5) * size * 2
      );
      
      // 破片音を遅延して再生
      AudioManager.instance.scheduleSFX(
        "debris_impact",
        0.5 + Math.random() * 1.5,
        0.3 + Math.random() * 0.3
      );
    }
  }, 300);
}
```

### 戦闘シーンでの音声管理

```typescript
// 戦闘開始時の音声設定
function setupCombatAudio(isBossBattle: boolean) {
  if (isBossBattle) {
    // ボス戦BGMへのクロスフェード
    AudioManager.instance.crossFadeMusic("music_boss_battle", 3.0);
    
    // 戦闘用ミキサースナップショットの適用
    AudioManager.instance.applyMixerSnapshot("snapshot_boss_combat", 2.0);
  } else {
    // 通常戦闘BGMへのクロスフェード
    AudioManager.instance.crossFadeMusic("music_combat", 1.5);
    
    // 戦闘用ミキサースナップショットの適用
    AudioManager.instance.applyMixerSnapshot("snapshot_combat", 1.0);
  }
  
  // 環境音量の低減
  AudioManager.instance.setAmbientVolume(0.3);
}

// 戦闘終了時の音声設定
function endCombatAudio(playerWon: boolean) {
  if (playerWon) {
    // 勝利ファンファーレ
    AudioManager.instance.playSFX("victory_fanfare");
    
    // 通常BGMに戻る
    setTimeout(() => {
      AudioManager.instance.crossFadeMusic(GameManager.instance.currentLevel.musicTrack, 2.0);
      
      // 通常ミキサースナップショットに戻る
      AudioManager.instance.applyMixerSnapshot("snapshot_normal", 1.5);
      
      // 環境音量を元に戻す
      AudioManager.instance.setAmbientVolume(1.0);
    }, 3000);
  } else {
    // 敗北音
    AudioManager.instance.playSFX("defeat_theme");
    
    // ゲームオーバーBGM
    AudioManager.instance.crossFadeMusic("music_game_over", 3.0);
    
    // ゲームオーバーミキサースナップショット
    AudioManager.instance.applyMixerSnapshot("snapshot_game_over", 2.0);
  }
}

// キャラクターの攻撃ボイス
function playAttackVoice(character: Character, attackType: AttackType) {
  if (character.isPlayer) {
    // プレイヤーキャラクターの攻撃ボイス
    let voiceType;
    
    switch (attackType) {
      case AttackType.Light:
        voiceType = "attack_light";
        break;
      case AttackType.Heavy:
        voiceType = "attack_heavy";
        break;
      case AttackType.Special:
        voiceType = "attack_special";
        break;
      default:
        voiceType = "attack_default";
    }
    
    AudioManager.instance.playCharacterVoice(character.id, voiceType);
  } else {
    // 敵キャラクターの攻撃ボイス
    AudioManager.instance.playVoice3D(
      `${character.type}_attack`,
      character.position
    );
  }
}
```

### オーディオ設定UI

```typescript
// 音量スライダーの更新
function updateVolumeSliders() {
  // 各スライダーの値を現在の設定に合わせる
  document.getElementById("master-volume-slider").value = 
    AudioManager.instance.masterVolume.toString();
  
  document.getElementById("music-volume-slider").value = 
    AudioManager.instance.musicVolume.toString();
  
  document.getElementById("sfx-volume-slider").value = 
    AudioManager.instance.sfxVolume.toString();
  
  document.getElementById("voice-volume-slider").value = 
    AudioManager.instance.voiceVolume.toString();
  
  document.getElementById("ambient-volume-slider").value = 
    AudioManager.instance.ambientVolume.toString();
  
  // ミュートボタンの状態更新
  const muteButton = document.getElementById("mute-button");
  muteButton.textContent = AudioManager.instance.isMuted ? "音声ON" : "音声OFF";
}

// スライダー変更イベントのハンドラ
function handleMasterVolumeChange(event) {
  const volume = parseFloat(event.target.value);
  AudioManager.instance.setMasterVolume(volume);
  
  // テスト音の再生
  AudioManager.instance.playSFX("ui_slider_change");
}

function handleMusicVolumeChange(event) {
  const volume = parseFloat(event.target.value);
  AudioManager.instance.setMusicVolume(volume);
  
  // 現在のBGMがなければテスト用に短いBGMを再生
  if (!AudioManager.instance.currentMusic) {
    AudioManager.instance.playMusic("music_settings_test", 0, false, 0.5);
  }
}

function handleSFXVolumeChange(event) {
  const volume = parseFloat(event.target.value);
  AudioManager.instance.setSFXVolume(volume);
  
  // テスト効果音の再生
  AudioManager.instance.playSFX("ui_button_click");
}

// ミュートボタンのハンドラ
function handleMuteToggle() {
  const newMuteState = AudioManager.instance.toggleMute();
  
  // ボタンテキストの更新
  const muteButton = document.getElementById("mute-button");
  muteButton.textContent = newMuteState ? "音声ON" : "音声OFF";
  
  // 効果音の再生（ミュート解除時のみ）
  if (!newMuteState) {
    AudioManager.instance.playSFX("ui_button_click");
  }
}

// 設定の保存
function saveAudioSettings() {
  const settings = {
    masterVolume: AudioManager.instance.masterVolume,
    musicVolume: AudioManager.instance.musicVolume,
    sfxVolume: AudioManager.instance.sfxVolume,
    voiceVolume: AudioManager.instance.voiceVolume,
    ambientVolume: AudioManager.instance.ambientVolume,
    isMuted: AudioManager.instance.isMuted
  };
  
  // 設定の保存
  localStorage.setItem("audioSettings", JSON.stringify(settings));
  
  // 確認メッセージ
  showNotification("オーディオ設定を保存しました");
}
```

## 注意事項

- `AudioManager` クラスはシングルトンパターンを使用しているため、`AudioManager.instance` を通じてアクセスします。
- 3Dサウンドを使用する場合は、定期的に `updateListener` メソッドを呼び出してリスナーの位置と向きを更新してください。
- 多数のサウンドを同時に再生すると、パフォーマンスに影響する可能性があります。`activeSounds` の数を監視し、必要に応じて優先度の低いサウンドを停止してください。
- モバイルデバイスでは、ユーザーインタラクション（タップなど）がないとオーディオ再生が開始できない場合があります。最初のユーザーインタラクション時にオーディオシステムを初期化することを検討してください。
- 大きなオーディオファイルは、メモリ使用量を削減するためにストリーミング再生を使用してください。