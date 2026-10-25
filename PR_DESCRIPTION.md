## Pull Request

**Title:** feat(ui): unify form cards, add skeleton loaders for async pages

**Description:**
- Applied a consistent card style (`border-radius: 12px` and soft shadow) to all forms and sections (Header, Footer, create‑Report, create‑VS, create‑FC, patient/client register, settings, etc.).
- Introduced `SkeletonCard` component with shimmer effect and `SkeletonGrid` for loading placeholders.
- Added `data-testid` attributes to skeleton elements for reliable testing.
- Updated tests to use Testing Library queries (`getByTestId`, `within`) and removed container/node access violations.
- Integrated loading state and skeleton placeholders into `FC`, `VS`, and `Reports` pages.
- Fixed React Hook dependency warnings by adding `arr` to dependency arrays where appropriate.
- Updated SCSS to use CSS variables for dark/light mode compatibility.
- All Jest tests now pass with ESLint clean (no errors, only warnings resolved).

**Related Issue:** UI modernization and loading UX improvements.

**Checklist:**
- [x] Code style conforms to ESLint rules.
- [x] Accessibility: skeleton grid uses `role="status"` with aria‑label.
- [x] Tests updated and passing.
- [x] No breaking changes in existing functionality.

**Testing Notes:**
Run `npm test` and `npm run lint` locally to verify. Visual inspection on both light and dark themes confirms unified styling.
