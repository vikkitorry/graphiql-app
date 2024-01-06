import { expect, vi, test, describe, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Documentation from './Documentation';
import { schemaMock } from '../../mocks/schemaMock';
describe('Documentation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders Documentation root view', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Documentation schema={schemaMock} />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Root Types/i)).toBeInTheDocument();
    expect(await screen.findByText(/TestRootType/i)).toBeInTheDocument();
    const types = await screen.findAllByRole('listitem');
    expect(types[0]).toHaveTextContent('ID');
  });

  test('renders Documentation type view on type click', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Documentation schema={schemaMock} />
      </MemoryRouter>
    );

    const testType = await screen.findByText(/type1/i);
    fireEvent.click(testType);
    expect(await screen.findByTestId('type-name')).toHaveTextContent(/type1/i);
  });

  test('renders Documentation field view on field click', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Documentation schema={schemaMock} />
      </MemoryRouter>
    );

    const typeLink = await screen.findByText(/TestRootType/i);
    fireEvent.click(typeLink);
    const fieldLink = await screen.findByText(/field1/i);
    fireEvent.click(fieldLink);
    expect(await screen.findByTestId('field-name')).toHaveTextContent(/field1/i);
  });
});
