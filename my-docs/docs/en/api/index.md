# API Reference

This API reference provides detailed documentation for the core classes and systems of our game engine. It serves as a comprehensive resource for developers working with the codebase, offering explanations of functionality, usage examples, and best practices.

## Core Systems

Our game engine is built around several key systems that work together to create a complete game experience:

### Game Management

The central systems that control game flow, state, and core functionality:

- [**GameManager**](/en/api/game-manager): Controls game state, scene transitions, and high-level game flow
- **SceneManager**: Handles loading, unloading, and transitions between game scenes
- **TimeManager**: Controls time-related functionality including time scale, pausing, and time measurement

### Entity Framework

The foundation for all game objects and their behaviors:

- **Entity**: Base class for all game objects
- **Component**: Modular behaviors that can be attached to entities
- **Transform**: Handles positioning, rotation, and scaling of entities
- **EntityManager**: Manages the lifecycle and organization of game entities

### Character Systems

Classes related to characters in the game:

- [**Player**](/en/api/player): Manages the player character, including input handling and abilities
- [**Enemy**](/en/api/enemy): Base class for enemy characters with AI and behavior systems
- **NPC**: Non-player character implementation for interactive world characters
- **Character**: Base class with common functionality for all character types

### Input and Controls

Systems for handling user input across different devices:

- [**InputManager**](/en/api/input-manager): Processes and manages input from various devices
- **InputMapping**: Configurable input bindings and action mapping
- **InputDevice**: Abstract representation of input devices (keyboard, gamepad, etc.)
- **TouchInput**: Mobile-specific touch input handling

### Audio Systems

Components for sound and music management:

- [**AudioManager**](/en/api/audio-manager): Central system for playing and controlling all game audio
- **SoundEffect**: Individual sound effect implementation
- **MusicTrack**: Background music implementation with transitions
- **AudioMixer**: Controls audio mixing, volumes, and effects

### Physics and Collision

Systems for physical simulation and collision detection:

- **PhysicsSystem**: Manages physical simulation in the game world
- **Collider**: Component for collision detection
- **Rigidbody**: Component for physics-based movement and interactions
- **PhysicsMaterial**: Defines physical properties of surfaces

### Rendering and Graphics

Components for visual presentation:

- **RenderManager**: Controls the rendering pipeline and visual effects
- **Camera**: Manages the player's view into the game world
- **Material**: Defines surface appearance properties
- **Shader**: Specialized programs for visual effects and rendering

### UI Systems

User interface components and management:

- **UIManager**: Controls UI elements, screens, and transitions
- **UIElement**: Base class for all UI components
- **UIScreen**: Full-screen UI layouts like menus and HUDs
- **UIAnimation**: Handles animations and transitions for UI elements

### Utility Systems

Supporting functionality used throughout the engine:

- **SaveSystem**: Handles saving and loading game data
- **PoolManager**: Object pooling for performance optimization
- **EventSystem**: Message passing and event handling
- **DebugTools**: Development and debugging utilities

## Using the API Reference

### Code Examples

Each class documentation includes practical code examples showing common usage patterns. These examples demonstrate best practices and typical implementation scenarios.

### Method Documentation

Methods are documented with:
- Parameter descriptions
- Return value explanations
- Exceptions that might be thrown
- Usage notes and cautions

### Property Documentation

Properties include:
- Type information
- Read/write access details
- Default values
- Usage context

### Events

Event documentation covers:
- Event parameters
- Typical use cases
- Firing conditions
- Example listeners

## Best Practices

When working with the API, consider these general guidelines:

1. **Singleton Access**: Access manager classes through their singleton instances (e.g., `GameManager.instance`)

2. **Component References**: Cache component references during initialization rather than getting them repeatedly

3. **Event Handling**: Subscribe to events during initialization and unsubscribe when no longer needed

4. **Error Handling**: Check return values and handle potential null references

5. **Performance Considerations**: Be mindful of performance-critical methods marked in the documentation

## API Versioning

The API follows semantic versioning (MAJOR.MINOR.PATCH):

- **MAJOR**: Incompatible API changes
- **MINOR**: Functionality added in a backward-compatible manner
- **PATCH**: Backward-compatible bug fixes

Current API Version: 1.0.0

## Contributing to Documentation

If you find errors or want to improve the API documentation:

1. Submit issues through our GitHub repository
2. Propose changes via pull requests
3. Follow the documentation style guide for consistency

## Getting Started

To begin exploring the API, we recommend starting with these core classes:

- [GameManager](/en/api/game-manager): Understand the overall game structure
- [Player](/en/api/player): Learn about player character implementation
- [InputManager](/en/api/input-manager): See how player input is handled
- [AudioManager](/en/api/audio-manager): Explore the audio system

These classes provide a foundation for understanding how the various systems interact within the game engine.