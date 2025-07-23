# Cursor Coding & Documentation Rules for cameronbrady.dev

---

## File Purpose
This file defines the coding, documentation, and organizational standards for the Cameron Brady portfolio project. It ensures code quality, maintainability, and clarity, reflecting both industry best practices and the unique neural network-inspired design vision.

---

## Navigation
- [General Principles](#general-principles)
- [File Structure & Organization](#file-structure--organization)
- [Documentation Standards](#documentation-standards)
- [Code Style](#code-style)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [Special Theming Considerations](#special-theming-considerations)

---

## General Principles
- Write readable, maintainable, and modular code.
- Prioritize accessibility, performance, and user experience.
- Use modern, idiomatic TypeScript/React/Next.js patterns.
- All code must be well-documented and tested.

---

## File Structure & Organization
- Organize code by feature/domain within `src/` (see design spec for structure).
- Separate files logically; use clear delimiters (`// ---` or `/* --- */`) between major sections.
- Each file **must** begin with:
  1. **File Description**: 1-2 line summary of the file's purpose.
  2. **Navigation Section**: Outline of logical parts/sections in the file (especially for files with multiple components, hooks, or utilities).

---

## Documentation Standards
- Every function, class, and component must have a JSDoc/TSDoc comment describing its purpose, parameters, return value, and side effects.
- Use consistent, industry-standard docstring format (/** ... */ for TypeScript/JS).
- For files with multiple exports, document each export clearly.
- Example:
  ```typescript
  /**
   * Renders the animated neural network background.
   * @param props - React props for customization.
   * @returns The background canvas element.
   */
  export function NeuralBackground(props: NeuralBackgroundProps) { ... }
  ```
- For utility files, provide usage examples in the file-level comment if non-obvious.

---

## Code Style
- Use Prettier and ESLint for formatting and linting.
- Prefer named exports over default exports.
- Use functional React components and hooks.
- Type all function parameters and return values explicitly.
- Use descriptive variable and function names.
- Use `const` and `let` appropriately; avoid `var`.
- Use modern ES features (optional chaining, nullish coalescing, etc.).
- Use clear, consistent delimiters (`// ---` or `/* --- */`) between logical sections.

---

## Testing
- All business logic and components must have associated tests (unit or integration as appropriate).
- Use Jest and React Testing Library for tests.
- Place tests in `__tests__` folders or alongside components as `.test.ts(x)` files.
- Write descriptive test cases and use Arrange-Act-Assert pattern.
- Ensure at least 80% code coverage for critical files.

---

## Accessibility
- All interactive elements must be keyboard accessible.
- Use semantic HTML and ARIA attributes where appropriate.
- Provide high-contrast and reduced-motion options.
- Test with screen readers and keyboard navigation.

---

## Special Theming Considerations
- Follow the neural/synaptic theme in UI components and animations.
- Use the color palette and animation principles from the design spec.
- Ensure all custom visuals (e.g., neural backgrounds) degrade gracefully for accessibility.

---

## References
- See `portfolio_design_spec.md` for detailed design and accessibility requirements.
- See `github_analysis.md` for best practices and improvement areas. 