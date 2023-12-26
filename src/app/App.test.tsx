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
});
