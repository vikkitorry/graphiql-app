import { render, screen } from '@testing-library/react';
import ProtectedRoute from './ProtectedRote';
import { expect, vi, test, describe, beforeEach } from 'vitest';
import type { ReactNode } from 'react';

describe('ErrorPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  vi.mock('react-router-dom', () => ({
    BrowserRouter: ({ children }: { children: ReactNode }) => (
      <div data-testid="children">{children}</div>
    ),
    Link: ({ children, ...props }: { children: ReactNode }) => <div {...props}>{children}</div>,
    Navigate: () => <div data-testid="navigate" />,
    useNavigate: () => vi.fn(),
    useLocation: () => vi.fn(),
    Outlet: ({ children }: { children: ReactNode }) => <div data-testid="outlet">{children}</div>,
  }));

  test('renders children for unauthenticated user', async () => {
    render(
      <ProtectedRoute userLoggedIn={false}>
        <div>Test Child Component</div>
      </ProtectedRoute>
    );

    expect(screen.getByText('Test Child Component')).toBeInTheDocument();
  });

  test('renders Outlet component when no children provided for unauthenticated user', () => {
    render(<ProtectedRoute userLoggedIn={false} />);

    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  test('navigate to main page if user logged in', () => {
    render(<ProtectedRoute userLoggedIn={true} />);

    expect(screen.getByTestId('navigate')).toBeInTheDocument();
  });
});
