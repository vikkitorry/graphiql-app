import { expect, vi, test, describe, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import GraphiQLPage from './GraphiQLPage';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { INTROSPECTION_QUERY } from '../../constants/constants';

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

  test('Triggers API call to fetch schema when URL entered', async () => {
    vi.spyOn(global, 'fetch');

    render(
      <MemoryRouter initialEntries={['/']}>
        <GraphiQLPage />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText(/Enter the API endpoint/i);
    await userEvent.type(inputElement, 'https://schema');
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('https://schema', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: INTROSPECTION_QUERY,
        }),
      });
    });
  });

  test('Documentation explorer button is enabled after schema is loaded', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <GraphiQLPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('documentation-button')).toBeDisabled();
    const inputElement = screen.getByPlaceholderText(/Enter the API endpoint/i);
    await userEvent.type(inputElement, 'https://schema');
    await waitFor(() => {
      expect(screen.getByTestId('documentation-button')).not.toBeDisabled();
    });
  });

  test('Documentation explorer opens upon clicking Documentation explorer button', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <GraphiQLPage />
      </MemoryRouter>
    );
    const inputElement = screen.getByPlaceholderText(/Enter the API endpoint/i);
    const documentationButton = screen.getByTestId('documentation-button');
    await userEvent.type(inputElement, 'https://schema');
    await waitFor(
      () => {
        expect(documentationButton).not.toBeDisabled();
      },
      { timeout: 3000 }
    );
    await userEvent.click(documentationButton);
    await waitFor(
      async () => {
        expect(screen.getByTestId('documentation')).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  test('Documentation explorer closes upon clearing API URL input', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <GraphiQLPage />
      </MemoryRouter>
    );
    const inputElement = screen.getByPlaceholderText(/Enter the API endpoint/i);
    await userEvent.type(inputElement, 'https://schema');
    const documentationButton = screen.getByTestId('documentation-button');
    await waitFor(async () => {
      expect(documentationButton).not.toBeDisabled();
      await userEvent.click(documentationButton);
      expect(screen.getByTestId('documentation')).toBeInTheDocument();
    });
    await userEvent.clear(inputElement);
    await waitFor(async () => {
      expect(documentationButton).toBeDisabled();
      expect(screen.queryByTestId('documentation')).toBeNull();
    });
  });

  test('Error notification is shown when the entered URL returns 404', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <GraphiQLPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId('documentation-button')).toBeDisabled();
    const inputElement = screen.getByPlaceholderText(/Enter the API endpoint/i);
    await userEvent.type(inputElement, 'https://wrongURL');
    await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
      expect(screen.getByText(/Resource not found/i)).toBeInTheDocument();
    });
  });
});
