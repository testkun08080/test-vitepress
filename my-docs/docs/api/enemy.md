# Enemy クラス

`Enemy` クラスは、ゲーム内の敵キャラクターを表現し、制御するためのクラスです。AI行動、戦闘能力、状態管理などの機能を提供します。

## 概要

```typescript
class Enemy extends Character implements IArtificialIntelligence {
  // 敵固有のプロパティと機能
}
```

`Enemy` クラスは基本的な `Character` クラスを拡張し、`IArtificialIntelligence` インターフェースを実装しています。このクラスは様々な敵タイプの基底クラスとして機能し、共通の機能を提供します。

## プロパティ

| 名前 | 型 | 説明 |
|------|------|------|
| `health` | `number` | 敵の現在の体力値 |
| `maxHealth` | `number` | 敵の最大体力値 |
| `level` | `number` | 敵のレベル |
| `experienceValue` | `number` | 倒した時に得られる経験値 |
| `detectionRange` | `number` | プレイヤーを検出できる範囲 |
| `attackRange` | `number` | 攻撃可能な範囲 |
| `attackDamage` | `number` | 基本攻撃のダメージ量 |
| `attackSpeed` | `number` | 攻撃速度（秒間攻撃回数） |
| `moveSpeed` | `number` | 移動速度 |
| `aggroState` | `AggroState` | 敵対状態（Passive, Alert, Aggressive） |
| `currentTarget` | `Entity` | 現在のターゲット |
| `patrolPath` | `PatrolPath` | 巡回経路 |
| `lootTable` | `LootTable` | ドロップするアイテムの定義 |
| `abilities` | `Ability[]` | 使用可能な能力のリスト |
| `behaviorTree` | `BehaviorTree` | AI行動を制御する行動木 |
| `difficultyMultiplier` | `number` | 難易度に基づくステータス倍率 |

## メソッド

### AI と行動制御

```typescript
/**
 * AIの更新処理を行います
 * @param deltaTime 前フレームからの経過時間
 */
updateAI(deltaTime: number): void;

/**
 * 指定した位置に移動します
 * @param position 目標位置
 * @param runSpeed 走るかどうか
 * @returns 目標に到達したかどうか
 */
moveToPosition(position: Vector3, runSpeed: boolean = false): boolean;

/**
 * 指定したエンティティに向かって移動します
 * @param target 目標エンティティ
 * @param stoppingDistance 停止距離
 * @returns 目標に到達したかどうか
 */
moveToEntity(target: Entity, stoppingDistance: number = 1.0): boolean;

/**
 * 巡回行動を実行します
 * @returns 巡回が完了したかどうか
 */
patrol(): boolean;

/**
 * 指定した位置を探索します
 * @param position 探索位置
 * @param duration 探索時間（秒）
 */
investigate(position: Vector3, duration: number = 5.0): void;

/**
 * 指定した方向に回転します
 * @param direction 向きたい方向
 * @param smooth 滑らかに回転するかどうか
 */
rotate(direction: Vector3, smooth: boolean = true): void;
```

### 戦闘と能力

```typescript
/**
 * 基本攻撃を実行します
 * @param targetDirection 攻撃方向
 * @returns 攻撃が成功したかどうか
 */
attack(targetDirection?: Vector3): boolean;

/**
 * 特殊能力を使用します
 * @param abilityIndex 使用する能力のインデックス
 * @param targetPosition 対象位置（必要な場合）
 * @param targetEntity 対象エンティティ（必要な場合）
 * @returns 能力の使用に成功したかどうか
 */
useAbility(abilityIndex: number, targetPosition?: Vector3, targetEntity?: Entity): boolean;

/**
 * ダメージを受けます
 * @param amount ダメージ量
 * @param damageType ダメージタイプ
 * @param source ダメージ源
 * @returns 実際に適用されたダメージ量
 */
takeDamage(amount: number, damageType: DamageType, source?: Entity): number;

/**
 * 攻撃対象を設定します
 * @param target 攻撃対象
 */
setTarget(target: Entity): void;

/**
 * 最適な攻撃能力を選択します
 * @param target 攻撃対象
 * @returns 能力のインデックス、または -1（基本攻撃）
 */
selectBestAttackAbility(target: Entity): number;
```

### 知覚と状態管理

```typescript
/**
 * 視界内にエンティティがあるか確認します
 * @param entity 確認するエンティティ
 * @returns 視認できるかどうか
 */
canSeeEntity(entity: Entity): boolean;

/**
 * 音を聞いたときの処理を行います
 * @param soundPosition 音の発生位置
 * @param volume 音量（0.0〜1.0）
 */
hearSound(soundPosition: Vector3, volume: number): void;

/**
 * 敵対状態を変更します
 * @param newState 新しい敵対状態
 */
setAggroState(newState: AggroState): void;

/**
 * 敵をスポーンします
 * @param position スポーン位置
 * @param rotation 初期回転
 */
spawn(position: Vector3, rotation: Quaternion): void;

/**
 * 敵を消滅させます
 * @param dropLoot アイテムをドロップするかどうか
 */
despawn(dropLoot: boolean = false): void;
```

### ドロップとリワード

```typescript
/**
 * アイテムをドロップします
 * @returns ドロップしたアイテムの配列
 */
dropLoot(): Item[];

/**
 * 経験値報酬を計算します
 * @param killerLevel 倒したキャラクターのレベル
 * @returns 獲得できる経験値
 */
calculateExperienceReward(killerLevel: number): number;
```

## イベント

`Enemy` クラスは以下のイベントを発行します：

| イベント名 | パラメータ | 説明 |
|------------|------------|------|
| `onHealthChanged` | `currentHealth, maxHealth` | 体力が変化したとき |
| `onAggroStateChanged` | `newState, oldState` | 敵対状態が変化したとき |
| `onTargetAcquired` | `target` | 新しい攻撃対象を設定したとき |
| `onTargetLost` | `lastTarget` | 攻撃対象を見失ったとき |
| `onAttack` | `target, damage` | 攻撃を行ったとき |
| `onAbilityUsed` | `ability, success` | 能力を使用したとき |
| `onDeath` | `killingBlow` | 敵が死亡したとき |
| `onSpawn` | `position` | 敵がスポーンしたとき |
| `onDespawn` | `wasKilled` | 敵が消滅したとき |

## 使用例

### 基本的な敵の作成

```typescript
// 敵の定義
class Goblin extends Enemy {
  constructor() {
    super();
    
    // 基本ステータスの設定
    this.maxHealth = 50;
    this.health = this.maxHealth;
    this.level = 1;
    this.experienceValue = 20;
    this.attackDamage = 5;
    this.attackSpeed = 1.2;
    this.moveSpeed = 3.5;
    
    // 知覚範囲の設定
    this.detectionRange = 10;
    this.attackRange = 1.5;
    
    // 行動設定
    this.aggroState = AggroState.Passive;
    
    // ドロップアイテムの設定
    this.lootTable = new LootTable([
      { item: ItemDatabase.getItem("gold_coin"), chance: 0.8, minCount: 1, maxCount: 5 },
      { item: ItemDatabase.getItem("goblin_ear"), chance: 0.5, minCount: 1, maxCount: 2 },
      { item: ItemDatabase.getItem("rusty_dagger"), chance: 0.1, minCount: 1, maxCount: 1 }
    ]);
    
    // 行動木の設定
    this.setupBehaviorTree();
  }
  
  private setupBehaviorTree(): void {
    // 行動木の構築
    this.behaviorTree = new BehaviorTree(
      new Selector([
        // 死亡チェック
        new Sequence([
          new CheckHealth(0),
          new PlayAnimation("Death"),
          new Wait(2.0),
          new Despawn(true)
        ]),
        
        // 戦闘行動
        new Sequence([
          new HasTarget(),
          new Selector([
            // 近接攻撃
            new Sequence([
              new IsTargetInRange(this.attackRange),
              new FaceTarget(),
              new PlayAnimation("Attack"),
              new ExecuteAttack(),
              new Wait(1 / this.attackSpeed)
            ]),
            // 接近
            new Sequence([
              new MoveToTarget(this.attackRange * 0.8),
              new PlayAnimation("Run")
            ])
          ])
        ]),
        
        // 索敵行動
        new Sequence([
          new DetectPlayer(this.detectionRange),
          new SetAggroState(AggroState.Alert),
          new PlayAnimation("Alert"),
          new SetTarget("detected_player")
        ]),
        
        // 通常行動
        new Selector([
          // 巡回
          new Sequence([
            new HasPatrolPath(),
            new Patrol(),
            new PlayAnimation("Walk")
          ]),
          // 待機
          new Sequence([
            new PlayAnimation("Idle"),
            new Wait(Random.range(1, 3))
          ])
        ])
      ])
    );
  }
}
```

### 敵の生成と管理

```typescript
// 敵スポナーの例
class EnemySpawner {
  private spawnPoints: Vector3[] = [];
  private enemyPrefabs: Map<string, typeof Enemy> = new Map();
  private spawnedEnemies: Enemy[] = [];
  private maxEnemies: number = 10;
  
  constructor(spawnArea: Bounds, maxEnemies: number) {
    // スポーンポイントの生成
    this.generateSpawnPoints(spawnArea, 20);
    this.maxEnemies = maxEnemies;
    
    // 敵タイプの登録
    this.registerEnemyType("goblin", Goblin);
    this.registerEnemyType("skeleton", Skeleton);
    this.registerEnemyType("orc", Orc);
  }
  
  private generateSpawnPoints(area: Bounds, count: number): void {
    // エリア内にランダムなスポーンポイントを生成
    for (let i = 0; i < count; i++) {
      const x = Random.range(area.min.x, area.max.x);
      const z = Random.range(area.min.z, area.max.z);
      const position = new Vector3(x, 0, z);
      
      // 地面の高さを取得
      const groundY = Terrain.getHeight(position);
      position.y = groundY;
      
      this.spawnPoints.push(position);
    }
  }
  
  registerEnemyType(id: string, enemyClass: typeof Enemy): void {
    this.enemyPrefabs.set(id, enemyClass);
  }
  
  update(deltaTime: number): void {
    // 死亡した敵の除去
    this.spawnedEnemies = this.spawnedEnemies.filter(enemy => enemy.health > 0);
    
    // 必要に応じて新しい敵をスポーン
    if (this.spawnedEnemies.length < this.maxEnemies) {
      this.spawnRandomEnemy();
    }
    
    // 敵のAI更新
    for (const enemy of this.spawnedEnemies) {
      enemy.updateAI(deltaTime);
    }
  }
  
  spawnRandomEnemy(): Enemy {
    // ランダムな敵タイプを選択
    const enemyTypes = Array.from(this.enemyPrefabs.keys());
    const randomType = enemyTypes[Math.floor(Random.range(0, enemyTypes.length))];
    
    // ランダムなスポーンポイントを選択
    const spawnPoint = this.spawnPoints[Math.floor(Random.range(0, this.spawnPoints.length))];
    
    // 敵を生成
    const EnemyClass = this.enemyPrefabs.get(randomType);
    const enemy = new EnemyClass();
    enemy.spawn(spawnPoint, Quaternion.identity);
    
    // リストに追加
    this.spawnedEnemies.push(enemy);
    
    return enemy;
  }
  
  despawnAllEnemies(): void {
    for (const enemy of this.spawnedEnemies) {
      enemy.despawn(false);
    }
    this.spawnedEnemies = [];
  }
}
```

### プレイヤーとの相互作用

```typescript
// プレイヤーの攻撃処理
function handlePlayerAttack(attackDamage: number, attackPosition: Vector3, attackRadius: number) {
  // 攻撃範囲内の敵を検索
  const enemiesInRange = EnemyManager.getEnemiesInRadius(attackPosition, attackRadius);
  
  // 各敵にダメージを適用
  for (const enemy of enemiesInRange) {
    // ダメージを与える
    const actualDamage = enemy.takeDamage(attackDamage, DamageType.Physical, Player.instance);
    
    // ダメージ数値の表示
    if (actualDamage > 0) {
      FloatingTextManager.showDamage(actualDamage, enemy.getWorldPosition(), Color.red);
    }
    
    // 敵が死亡した場合
    if (enemy.health <= 0) {
      // 経験値の獲得
      const expReward = enemy.calculateExperienceReward(Player.instance.level);
      Player.instance.gainExperience(expReward);
      
      // アイテムのドロップ
      const droppedItems = enemy.dropLoot();
      for (const item of droppedItems) {
        WorldItemManager.spawnWorldItem(item, enemy.getWorldPosition());
      }
      
      // 敵の消滅
      enemy.despawn(true);
    }
  }
}
```

## 注意事項

- `Enemy` クラスは基底クラスとして設計されており、具体的な敵タイプはこのクラスを拡張して実装します。
- 行動木（Behavior Tree）パターンを使用してAI制御を行っているため、複雑な行動を階層的に定義できます。
- パフォーマンスを考慮し、視界外や遠距離の敵はAI更新頻度を下げるなどの最適化が必要です。
- 難易度設定に応じて `difficultyMultiplier` を調整することで、敵の強さを動的に変更できます。