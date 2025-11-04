# Design Tokens Setup

This document explains how the design tokens are integrated into the Albi Flight Design System.

## Overview

Design tokens from Figma are automatically transformed into CSS custom properties using Style Dictionary. This ensures that design values stay in sync between Figma and the codebase.

## Project Structure

```
tokens/
├── source/              # Source token JSON files from Figma
│   ├── color.json
│   ├── spacing.json
│   ├── typography.json
│   ├── border-radius.json
│   └── ...
├── light/               # Light theme tokens
├── dark/                # Dark theme tokens
└── build/               # Generated JSON output
    └── tokens.json

assets/css/
├── tokens.css           # Generated CSS custom properties (auto-generated)
├── tokens.scss          # Generated SCSS variables (auto-generated)
└── style.css            # Main stylesheet (uses tokens)

config.json              # Style Dictionary configuration
package.json             # Node dependencies
```

## Workflow

### 1. Export Tokens from Figma

Use the Style Dictionary exporter plugin in Figma with these settings:
- **Token path structure**: Collection + Group path
- **Token name format**: Kebab case
- **Global prefix**: albi
- **Use token type prefixes**: ON
- **Export format**: Style Dictionary (JSON)

### 2. Update Tokens in Project

```bash
# Replace the files in tokens/source/ with new exports from Figma
# Then rebuild the tokens:
npm run build:tokens
```

### 3. Generated CSS Tokens

The build process generates `assets/css/tokens.css` with CSS custom properties:

```css
:root {
  /* Colors */
  --albi-color-primitive-colors-core-blue-600: #1f51bc;
  --albi-color-primitive-colors-core-grey-800: #2f303c;

  /* Spacing */
  --albi-space-space-xs: 4px;
  --albi-space-space-sm: 8px;
  --albi-space-space-md: 16px;

  /* Border Radius */
  --albi-border-radius-radius-border-radius-rounded-lg: 8px;

  /* Typography */
  --albi-font-family-typography-family-primary: Poppins;
}
```

## Using Tokens in CSS

### Before (Hardcoded Values)
```css
.button {
  background: #1f51bc;
  padding: 12px 16px;
  border-radius: 8px;
  font-family: 'Poppins', sans-serif;
}
```

### After (Using Tokens)
```css
.button {
  background: var(--albi-color-primitive-colors-core-blue-600);
  padding: var(--albi-space-space-md);
  border-radius: var(--albi-border-radius-radius-border-radius-rounded-lg);
  font-family: var(--albi-font-family-typography-family-primary), sans-serif;
}
```

## NPM Scripts

```bash
# Build tokens once
npm run build:tokens

# Watch for changes and rebuild automatically
npm run watch:tokens
```

## Common Token Categories

### Colors
- `--albi-color-primitive-colors-brand-*` - Brand colors (sky, apricot)
- `--albi-color-primitive-colors-core-blue-*` - Blue scale (50-900)
- `--albi-color-primitive-colors-core-grey-*` - Grey scale (50-900)
- `--albi-color-primitive-colors-core-red-*` - Red scale (50-900)
- `--albi-color-primitive-colors-core-green-*` - Green scale (50-900)

### Spacing
- `--albi-space-space-xs` - 4px
- `--albi-space-space-sm` - 8px
- `--albi-space-space-md` - 16px
- `--albi-space-space-lg` - 24px
- `--albi-space-space-xl` - 32px

### Typography
- `--albi-font-family-typography-*` - Font families
- `--albi-font-size-typography-*` - Font sizes
- `--albi-line-height-typography-*` - Line heights
- `--albi-letter-spacing-typography-*` - Letter spacing

### Border Radius
- `--albi-border-radius-radius-border-radius-rounded-sm` - 4px
- `--albi-border-radius-radius-border-radius-rounded-md` - 6px
- `--albi-border-radius-radius-border-radius-rounded-lg` - 8px
- `--albi-border-radius-radius-border-radius-rounded-xl` - 12px

## Benefits

✅ **Single Source of Truth**: Figma is the source, tokens sync automatically
✅ **Type Safety**: Token names follow consistent patterns
✅ **Maintainability**: Update values in Figma, rebuild, done
✅ **Consistency**: Same values across all components
✅ **Future-Proof**: Easy to add dark mode, mobile apps, etc.

## Known Issues

- Some token references have casing issues (camelCase vs kebab-case)
- Currently using `outputReferences: false` to work around broken references
- Token names are long but descriptive

## Next Steps

- [ ] Migrate existing style.css hardcoded values to use tokens
- [ ] Add dark theme support using tokens/dark/
- [ ] Create token documentation page
- [ ] Set up automated token sync from Figma
