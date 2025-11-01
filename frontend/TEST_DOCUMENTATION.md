# PahadiMatch - Test Documentation

## Test Suite Overview

Comprehensive test coverage for the PahadiMatch matrimonial platform with focus on:
- Authentication flows
- Profile management
- State management
- API integration
- UI component behavior

## Test Structure

```
src/__tests__/
├── pages/
│   └── LoginPage.test.tsx           # Login flow tests
├── components/
│   └── ProfileCreationStepper.test.tsx  # Profile creation tests
├── store/
│   └── useAuthStore.test.ts         # State management tests
├── api/
│   └── auth.api.test.ts             # API integration tests
└── App.test.tsx                     # App integration tests
```

## Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test --watch

# Run tests with coverage
yarn test --coverage

# Run specific test file
yarn test LoginPage.test.tsx

# Type check before testing
yarn type-check
```

## Test Coverage

### 1. LoginPage Tests (11 test cases)
- ✅ Renders phone input and button
- ✅ Displays bilingual Hindi + English text
- ✅ Validates phone number format (10 digits)
- ✅ Sends OTP with valid phone
- ✅ Shows OTP input after successful send
- ✅ Verifies OTP and redirects
- ✅ Shows back button in OTP step
- ✅ Filters non-numeric characters
- ✅ Shows signup link
- ✅ Handles API errors gracefully
- ✅ Shows loading states

### 2. ProfileCreationStepper Tests (8 test cases)
- ✅ Renders step 1 (Basic Info) initially
- ✅ Shows progress indicator (25%, 50%, 75%, 100%)
- ✅ Validates required fields
- ✅ Enables/disables next button based on validation
- ✅ Navigates between steps
- ✅ Shows back button from step 2 onwards
- ✅ Submits profile on step 4
- ✅ Displays all 4 step indicators

### 3. Auth Store Tests (6 test cases)
- ✅ Initial state is logged out
- ✅ setToken authenticates user
- ✅ logout clears user data
- ✅ updateUser updates user data
- ✅ Persists state to localStorage
- ✅ Handles partial user updates

### 4. Auth API Tests (5 test cases)
- ✅ sendOtp makes correct API call
- ✅ verifyOtp verifies phone and OTP
- ✅ logout calls logout endpoint
- ✅ Handles network errors
- ✅ Returns correct response structure

### 5. App Integration Tests (3 test cases)
- ✅ Renders without crashing
- ✅ Renders login page by default
- ✅ Initializes QueryClient correctly

## Total Test Coverage

- **Test Files**: 5
- **Test Cases**: 33+
- **Coverage Target**: 70% (branches, functions, lines, statements)

## Test Categories

### Unit Tests
- Individual component behavior
- Pure function logic
- State management
- Utility functions

### Integration Tests
- Component interaction
- API integration
- Router navigation
- State persistence

### E2E Scenarios Covered
1. **Complete Login Flow**: Phone → OTP → Dashboard
2. **Complete Signup Flow**: Phone → OTP → Profile Creation → Dashboard
3. **Profile Creation**: 4-step form with validation
4. **Authentication State**: Login, logout, persistence

## Test Best Practices

### 1. Mocking Strategy
```typescript
// Mock API calls
jest.mock('@/api/auth.api');

// Mock hooks
jest.mock('@/hooks/use-toast');

// Mock child components
jest.mock('@/pages/LoginPage', () => ({
  __esModule: true,
  default: () => <div>Login Page</div>,
}));
```

### 2. Test Utilities
```typescript
// Reusable render function
const renderWithProviders = (component) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </QueryClientProvider>
  );
};
```

### 3. Async Testing
```typescript
// Use waitFor for async operations
await waitFor(() => {
  expect(screen.getByText(/Success/i)).toBeInTheDocument();
});
```

### 4. User Interactions
```typescript
// Simulate user actions
fireEvent.change(input, { target: { value: 'test' } });
fireEvent.click(button);
```

## CI/CD Integration

Add to your CI pipeline:

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: cd frontend && yarn install
      - run: cd frontend && yarn type-check
      - run: cd frontend && yarn test --coverage
```

## Testing Checklist

Before deploying:
- [ ] All tests pass (`yarn test`)
- [ ] Type check passes (`yarn type-check`)
- [ ] Coverage meets threshold (70%)
- [ ] No console errors in tests
- [ ] All critical flows tested
- [ ] Edge cases covered
- [ ] Error handling tested

## Future Test Additions

### Planned Test Coverage
1. **ChatPage**: Message sending, conversation list
2. **NotificationsPage**: Interest management
3. **ProfilesPage**: Profile browsing, like/skip
4. **ProfilePage**: Profile viewing, editing
5. **MainLayout**: Navigation, logout

### Additional Test Scenarios
- Network failure handling
- Session expiration
- Concurrent user actions
- Form validation edge cases
- Accessibility testing

## Test Maintenance

### When to Update Tests
- ✅ After adding new features
- ✅ When fixing bugs
- ✅ When refactoring components
- ✅ When API contracts change

### Test Debugging
```bash
# Run tests with verbose output
yarn test --verbose

# Run a single test
yarn test -t "renders login page"

# Update snapshots
yarn test -u
```

## Resources

- [React Testing Library Docs](https://testing-library.com/react)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Last Updated**: November 2025  
**Test Framework**: Jest + React Testing Library  
**Coverage Tool**: Istanbul (via Jest)
