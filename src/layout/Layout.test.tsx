import { expect, vi, test, describe, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';
import { render, screen } from '@testing-library/react';

describe('Layout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders Layout without error if user did not log in', () => {
    const setUserLoggedInMock = vi.fn();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Layout userLoggedIn={false} setUserLoggedIn={setUserLoggedInMock} isLoading={false} />
      </MemoryRouter>
    );
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('renders Layout without error if user logged in', () => {
    const setUserLoggedInMock = vi.fn();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Layout userLoggedIn={true} setUserLoggedIn={setUserLoggedInMock} isLoading={false} />
      </MemoryRouter>
    );
    expect(screen.getByText('Main Page')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  test('renders loader without error while fetch data', () => {
    const setUserLoggedInMock = vi.fn();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Layout userLoggedIn={false} setUserLoggedIn={setUserLoggedInMock} isLoading={true} />
      </MemoryRouter>
    );
    const loader = screen.getByTestId('ball-triangle-loading');
    expect(loader).toBeInTheDocument();
  });
});
