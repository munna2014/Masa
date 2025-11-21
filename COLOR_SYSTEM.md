# Dynamic Color System Documentation

## Overview
The StaffFlow application now includes a comprehensive dynamic color system that allows for easy customization of colors throughout the application without modifying component code.

## Architecture

### 1. Color Configuration (`src/config/colors.js`)
Central configuration file containing all color definitions organized by category:

- **Primary Colors**: Orange to Red gradient (main brand colors)
- **Secondary Colors**: Red shades for accents
- **Neutral Colors**: Gray scale for text and backgrounds
- **Status Colors**: Success (green), Warning (yellow), Error (red), Info (blue)
- **Semantic Colors**: Contextual colors for UI elements
- **Gradients**: Pre-defined gradient combinations
- **Component Styles**: Preset styles for common components

### 2. Theme Context (`src/context/ThemeContext.jsx`)
React Context that manages theme state and provides methods to update colors dynamically:

```javascript
// Usage in components
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { theme, updateColor, resetTheme } = useTheme();
  
  // Access colors
  const primaryColor = theme.colors.primary.main;
  
  // Update a specific color
  updateColor('primary.main', '#ff6b35');
  
  // Reset to defaults
  resetTheme();
}
```

### 3. Color Customizer Component (`src/components/ColorCustomizer.jsx`)
Floating UI panel that allows users to customize colors in real-time:

- Color picker interface
- Live preview
- Reset to default button
- Accessible from bottom-right corner

### 4. useColors Hook (`src/hooks/useColors.js`)
Custom React hook for convenient color access in components:

```javascript
import { useColors } from '../hooks/useColors';

function MyComponent() {
  const colors = useColors();
  
  return (
    <div style={{ color: colors.primaryMain }}>
      Primary Color: {colors.primaryMain}
    </div>
  );
}
```

## Color Structure

### Primary Colors
```javascript
primary: {
  light: '#fff7ed',      // orange-50
  main: '#f97316',       // orange-500
  dark: '#ea580c',       // orange-600
  darker: '#c2410c',     // orange-700
}
```

### Secondary Colors
```javascript
secondary: {
  light: '#fecaca',      // red-200
  main: '#dc2626',       // red-600
  dark: '#b91c1c',       // red-700
}
```

### Status Colors
```javascript
status: {
  success: { light: '#dcfce7', main: '#22c55e', dark: '#16a34a' },
  warning: { light: '#fef3c7', main: '#eab308', dark: '#ca8a04' },
  error: { light: '#fee2e2', main: '#ef4444', dark: '#dc2626' },
  info: { light: '#dbeafe', main: '#3b82f6', dark: '#1d4ed8' }
}
```

### Neutral Colors
Complete gray scale from 50 to 900 for flexible text and background options.

## Usage Examples

### Example 1: Using Colors in Components
```javascript
import { useColors } from '../hooks/useColors';

function Button() {
  const colors = useColors();
  
  return (
    <button
      style={{
        backgroundColor: colors.primaryMain,
        color: colors.white,
        borderColor: colors.primaryDark
      }}
    >
      Click Me
    </button>
  );
}
```

### Example 2: Using Component Styles
```javascript
import { useColors } from '../hooks/useColors';

function Card() {
  const colors = useColors();
  const cardStyle = colors.getComponentStyle('card', 'default');
  
  return <div className={cardStyle}>Card Content</div>;
}
```

### Example 3: Dynamic Color Updates
```javascript
import { useTheme } from '../context/ThemeContext';

function ColorPicker() {
  const { updateColor } = useTheme();
  
  const handleColorChange = (newColor) => {
    updateColor('primary.main', newColor);
  };
  
  return (
    <input
      type="color"
      onChange={(e) => handleColorChange(e.target.value)}
    />
  );
}
```

## Customization Guide

### Step 1: Wrap App with ThemeProvider
```javascript
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Step 2: Use Colors in Components
```javascript
import { useColors } from '../hooks/useColors';

function MyComponent() {
  const colors = useColors();
  
  return (
    <div style={{ backgroundColor: colors.primaryLight }}>
      Content
    </div>
  );
}
```

### Step 3: Update Colors Dynamically
Users can click the color palette icon (bottom-right) to open the Color Customizer panel and change colors in real-time.

## Preset Component Styles

### Button Styles
- `button.primary`: Orange-to-red gradient button
- `button.secondary`: White button with orange border
- `button.tertiary`: Gray button

### Card Styles
- `card.default`: White card with subtle shadow
- `card.elevated`: White card with medium shadow
- `card.filled`: Orange-filled card

### Input Styles
- `input.default`: Standard input with orange focus ring

## Color Paths

Access colors using dot notation:

```javascript
// Primary colors
'primary.light'
'primary.main'
'primary.dark'
'primary.darker'

// Secondary colors
'secondary.light'
'secondary.main'
'secondary.dark'

// Status colors
'status.success.light'
'status.success.main'
'status.success.dark'
'status.warning.light'
'status.warning.main'
'status.warning.dark'
'status.error.light'
'status.error.main'
'status.error.dark'
'status.info.light'
'status.info.main'
'status.info.dark'

// Neutral colors
'neutral.white'
'neutral.gray50' through 'neutral.gray900'

// Semantic colors
'semantic.background'
'semantic.surface'
'semantic.border'
'semantic.text'
'semantic.textSecondary'
'semantic.textTertiary'
```

## Best Practices

1. **Use the useColors hook** for accessing colors in components
2. **Leverage component styles** for consistent styling
3. **Use semantic colors** for contextual meaning (success, error, warning)
4. **Update colors through the Theme Context** for global changes
5. **Use the Color Customizer** for user-facing customization
6. **Maintain color hierarchy** (primary, secondary, status, neutral)

## API Reference

### ThemeProvider
Wraps the application to provide theme context.

```javascript
<ThemeProvider>
  <App />
</ThemeProvider>
```

### useTheme Hook
```javascript
const {
  theme,           // Current theme object
  updateColors,    // Update multiple colors
  updateColor,     // Update single color by path
  toggleMode,      // Toggle light/dark mode
  resetTheme       // Reset to default theme
} = useTheme();
```

### useColors Hook
```javascript
const colors = useColors();
// Returns all color values and utility methods
```

## File Structure

```
src/
├── config/
│   └── colors.js              # Color configuration
├── context/
│   └── ThemeContext.jsx       # Theme context provider
├── hooks/
│   └── useColors.js           # Color utility hook
├── components/
│   └── ColorCustomizer.jsx    # Color customizer UI
└── App.js                     # Main app with ThemeProvider
```

## Future Enhancements

- Dark mode support
- Color theme presets (light, dark, high-contrast)
- Export/import color schemes
- Color accessibility checker
- Animation timing customization
- Font customization
