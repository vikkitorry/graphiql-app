import { expect, vi, test, describe, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { render, screen } from '@testing-library/react';

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders app without error', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
  });

  test('renders loader while fetch data', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const loader = screen.getByTestId('ball-triangle-loading');
    expect(loader).toBeInTheDocument();
  });

  test('renders not found page', () => {
    render(
      <MemoryRouter initialEntries={['/test']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });
});
