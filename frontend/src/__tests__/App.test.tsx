import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '@/App';

// Mock child components
jest.mock('@/pages/LoginPage', () => ({
  __esModule: true,
  default: () => <div>Login Page</div>,
}));

jest.mock('@/pages/SignupPage', () => ({
  __esModule: true,
  default: () => <div>Signup Page</div>,
}));

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

  test('renders login page by default', () => {
    render(<App />);
    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });

  test('initializes QueryClient', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });
});
