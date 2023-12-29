import { expect, vi, test, describe, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { render, screen, waitFor } from '@testing-library/react';
import { act } from '@testing-library/react';
import { AppRoutes } from '../routes/routeConfig/routeConfig';

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders app without error', async () => {
    await act(async () =>
      render(
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      )
    );

    await waitFor(() => expect(screen.getAllByText('Welcome')).toBeTruthy());
  });

  test('renders loader while fetch data', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const loader = screen.getByTestId('ball-triangle-loading');
    expect(loader).toBeInTheDocument();
  });

  test('renders not found page', async () => {
    await act(async () =>
      render(
        <MemoryRouter initialEntries={['/test']}>
          <App />
        </MemoryRouter>
      )
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  test('redirect to welcome page if user not logged in', async () => {
    await act(async () =>
      render(
        <MemoryRouter initialEntries={[AppRoutes.MAIN]}>
          <App />
        </MemoryRouter>
      )
    );

    await waitFor(() => expect(screen.getAllByText('Welcome')).toBeTruthy());
  });
});
