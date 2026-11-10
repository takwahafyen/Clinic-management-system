## 📋 Description of Changes
<!-- Provide a clear, concise overview of what this PR accomplishes and the problem it solves. -->

## 🎯 Related Issue(s)
<!-- Link the issue(s) resolved or impacted by this PR: e.g., Closes #12, Fixes #45 -->
Closes #

## 🛠️ Type of Change
- [ ] 🐛 Bug fix (non-breaking change resolving a defect)
- [ ] ✨ New feature (non-breaking clinical or platform capability)
- [ ] 🔒 Security fix (vulnerability patching or hardening)
- [ ] 🧹 Refactoring / Technical debt (code cleanup without functional changes)
- [ ] ⚡ Performance improvement
- [ ] 📝 Documentation update
- [ ] 👷 CI/CD & DevOps configuration

## 🔍 Architectural Impact & Security Checklist
- [ ] **Role-Based Access Control (RBAC)**: Validated routes/endpoints against Doctor, Nurse, and Pharmacist permissions.
- [ ] **No PII/PHI Exposure**: Ensured patient data and credentials are not logged or leaked in error responses.
- [ ] **Cross-Origin & Credentials**: Verified `withCredentials: true` and cookie policies (`sameSite`, `secure`) work between Vercel & Render.
- [ ] **Responsive & Theming**: Verified consistency across Light Mode and Dark Mode.
- [ ] **Internationalization (i18n)**: Added translation strings for both English and French if user-facing strings changed.

## 🧪 Testing Performed
- [ ] `npm run typecheck` passes with zero errors (TypeScript).
- [ ] `npm test` passes on backend (`jest --runInBand`).
- [ ] `npm test` passes on frontend (React Testing Library).
- [ ] Verified manually on local environment / staging preview.
- [ ] Cypress E2E specs pass (`npm run test:e2e`).

## 📸 Screenshots / Visual Verification (If Applicable)
<!-- Attach before/after screenshots or GIFs demonstrating UI changes -->
