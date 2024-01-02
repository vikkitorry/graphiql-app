import { expect, vi, test, describe, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import GraphiQLPage from './GraphiQLPage';
import { render, screen } from '@testing-library/react';

describe('GraphiQLPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mock('@uiw/react-codemirror');
  });

  test('renders GraphiQLPage without error', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <GraphiQLPage />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText(/Enter the API endpoint/i);

    expect(inputElement).toBeInTheDocument();
  });
});
