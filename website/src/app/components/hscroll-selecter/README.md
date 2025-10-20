# HscrollSelecter Component

## Description
A horizontal scrollable selector component with rounded rectangular items that can be clicked to be selected.

## Usage

### Import the component
```typescript
import { HscrollSelecter } from './components/hscroll-selecter/hscroll-selecter';
```

### Basic Example
```html
<app-hscroll-selecter
  [values]="['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5']"
  [(selection)]="selectedValue"
  (onSelectionChange)="handleSelectionChange($event)">
</app-hscroll-selecter>
```

### Component API

#### Inputs
- `values: string[]` - Array of selectable values to display

#### Two-way Binding
- `selection: string` - Currently selected value (supports `[(selection)]` syntax)

#### Outputs
- `onSelectionChange: EventEmitter<string>` - Emits when selection changes

### Example in TypeScript
```typescript
export class MyComponent {
  options = ['Seconde', 'Première', 'Terminale', 'Licence 1', 'Licence 2', 'Licence 3'];
  selectedValue = 'Terminale';

  handleSelectionChange(value: string) {
    console.log('Selected:', value);
  }
}
```

### Example in Template
```html
<app-hscroll-selecter
  [values]="options"
  [(selection)]="selectedValue"
  (onSelectionChange)="handleSelectionChange($event)">
</app-hscroll-selecter>

<p>Currently selected: {{ selectedValue }}</p>
```

## Features
- ✅ Horizontal scrolling with custom scrollbar
- ✅ Rounded rectangular buttons
- ✅ Selected state with visual feedback
- ✅ Hover effects
- ✅ Two-way data binding with Angular signals
- ✅ Event emission on selection change
- ✅ Responsive design
- ✅ Touch-friendly scrolling
- ✅ Custom color palette integration

## Styling
The component uses CSS custom properties from the global palette:
- `--primary`, `--primary-dark`, `--primary-light`
- `--surface`, `--surface-variant`
- `--border`, `--text-primary`, `--text-on-primary`
- `--shadow-sm`, `--shadow-md`
