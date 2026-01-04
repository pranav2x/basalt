# Premium Canvas Quick Reference

## 🎨 Color Variables

```css
/* Use in your components */
var(--canvas-base)      /* #08090A - Primary background */
var(--surface-1)        /* #131416 - Elevated panels */
var(--surface-2)        /* #1C1D21 - Interactive states */
var(--surface-3)        /* #232428 - Highest elevation */

var(--indigo-500)       /* #5E6AD2 - Primary actions */
var(--indigo-400)       /* #8E96E8 - Hover states */
var(--indigo-300)       /* #B4BAED - Tertiary */

var(--text-primary)     /* rgba(255,255,255,0.95) */
var(--text-secondary)   /* rgba(255,255,255,0.6) */
var(--text-tertiary)    /* rgba(255,255,255,0.4) */
```

## 💎 Glass Material Class

Apply to any element for instant glassmorphism:

```tsx
<div className="glass-element">
  {/* Your content */}
</div>
```

This automatically applies all 7 layers:
- Background tint
- Backdrop blur + saturation
- Border
- Rim lighting
- Shadow
- Gradient overlay

## 📏 Spacing System

Always use multiples of 8px:

```tsx
// Tailwind classes
className="p-sm"    // 16px padding
className="gap-md"  // 24px gap
className="mt-lg"   // 32px margin-top

// CSS variables
padding: var(--spacing-xs);  // 8px
margin: var(--spacing-xl);   // 48px
```

## 🎭 Animations

Built-in animations ready to use:

```css
/* Rotating glow (selection states) */
animation: rotate-glow 8s linear infinite;

/* Pulsing status indicator */
animation: pulse-status 2s ease-in-out infinite;

/* Marching ants (edges) */
animation: dash-flow 20s linear infinite;
```

## 🔘 Button States Pattern

For consistent hover/active states:

```tsx
<button
  style={{
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
    e.currentTarget.style.transform = 'scale(1.05)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
    e.currentTarget.style.transform = 'scale(1)';
  }}
>
  Click Me
</button>
```

## 📝 Typography Guidelines

```tsx
/* Headings */
fontSize: '14px'
fontWeight: 400  // (would be 500 in light mode)
letterSpacing: '-0.01em'
color: 'var(--text-primary)'

/* Body Text */
fontSize: '13px'
fontWeight: 400
lineHeight: 1.6
letterSpacing: '0.01em'
color: 'var(--text-secondary)'

/* Labels/Tags */
fontSize: '11px'
fontWeight: 500
letterSpacing: '0.02em'
textTransform: 'uppercase'
color: 'var(--indigo-300)'
```

## 🎯 Node Creation Example

```tsx
const newNode = {
  id: 'unique-id',
  type: 'premium',  // Use premium type!
  position: { x: 250, y: 100 },
  data: {
    label: 'Node Title',
    description: 'Optional description text',
    tags: ['Tag1', 'Tag2'],
    status: 'active', // 'active' | 'idle' | 'error'
  },
};

addNode(newNode);
```

## 🔗 Edge Creation Example

```tsx
const newEdge = {
  id: 'e1-2',
  source: '1',
  target: '2',
  type: 'premium',  // Use premium type!
};
```

## 🎨 Custom Shadows

```css
/* Elevation */
box-shadow: var(--shadow-sm);  // Subtle lift
box-shadow: var(--shadow-md);  // Medium elevation
box-shadow: var(--shadow-lg);  // High elevation

/* Glows */
box-shadow: var(--glow-sm);   // Small glow
box-shadow: var(--glow-md);   // Medium glow
box-shadow: var(--glow-lg);   // Large glow
```

## ⚡ Performance Utilities

```tsx
/* GPU Acceleration */
className="gpu-accelerate"  // transform: translateZ(0)

/* Will-change hints */
className="will-change-transform"
className="will-change-transform-shadow"
```

## 🎹 Keyboard Shortcuts

Command palette toggle: `⌘K` (Cmd+K) or `Ctrl+K`

---

## 💡 Best Practices

1. **Always use #08090A** instead of pure black (#000000)
2. **Use rgba() for borders**, not solid colors
3. **Spacing must be 8px multiples** (8, 16, 24, 32, 48)
4. **Apply glass-element class** for consistent glassmorphism
5. **Use CSS variables** for colors, not hex codes
6. **Add GPU acceleration** to animated elements
7. **Test at multiple zoom levels** (the grid scales beautifully)

---

## 🐛 Troubleshooting

**Backdrop-filter not working?**
- Ensure element has background with alpha
- Check browser support (Chrome 90+, Firefox 103+, Safari 14+)
- Fallback automatically applied for older browsers

**Colors look wrong?**
- Check you're using CSS variables, not Tailwind classes
- Verify globals.css is imported in layout.tsx
- Make sure dark mode is active (html class="dark")

**Spacing feels off?**
- All spacing should be multiples of 8px
- Use var(--spacing-*) or Tailwind spacing classes
- Check for hardcoded pixel values

---

## 📚 Key Files Reference

- **Design tokens:** `src/app/globals.css`
- **Theme config:** `tailwind.config.ts`
- **Node component:** `src/components/nodes/PremiumNode.tsx`
- **Edge component:** `src/components/canvas/PremiumEdge.tsx`
- **Main canvas:** `src/components/canvas/BasaltCanvas.tsx`
- **State management:** `src/store/useCanvasStore.ts`

