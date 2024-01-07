import { expect, vi, test, describe, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Documentation from './Documentation';
import { clientSchemaMock, schemaResponseMock } from '../../mocks/schemaMock';
describe('Documentation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders Documentation root view', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Documentation schema={clientSchemaMock} />
      </MemoryRouter>
    );
    await waitFor(async () => {
      expect(await screen.findByRole('heading', { name: 'Root Types' })).toBeInTheDocument();
      expect(await screen.findByRole('heading', { name: 'Types' })).toBeInTheDocument();
      expect(await screen.findByRole('link', { name: 'TestRootType' })).toBeInTheDocument();
    });
    const types = await screen.findAllByRole('listitem');
    expect(types.length).toEqual(
      schemaResponseMock.data.__schema.types.filter((type) => !type.name.startsWith('__')).length -
        1
    );
  });

  test('does not render navigation link in root view', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Documentation schema={clientSchemaMock} />
      </MemoryRouter>
    );
    expect(screen.queryByTestId('documentation-navlink')).toBeNull();
  });

  test('renders navigation link in type view', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Documentation schema={clientSchemaMock} />
      </MemoryRouter>
    );
    expect(screen.queryByTestId('documentation-navlink')).toBeNull();
    const testType = await screen.findByRole('link', { name: 'type1' });
    fireEvent.click(testType);
    expect(await screen.findByTestId('documentation-navlink')).toBeInTheDocument();
  });

  test('renders Documentation type view on type click', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Documentation schema={clientSchemaMock} />
      </MemoryRouter>
    );

    const testType = await screen.findByRole('link', { name: 'type1' });
    fireEvent.click(testType);
    expect(await screen.findByRole('heading', { name: 'type1' })).toBeInTheDocument();
  });

  test('renders Documentation field view on field click', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Documentation schema={clientSchemaMock} />
      </MemoryRouter>
    );

    const typeLink = await screen.findByRole('link', { name: 'TestRootType' });
    fireEvent.click(typeLink);
    const fieldLink = await screen.findByRole('link', { name: 'field1' });
    fireEvent.click(fieldLink);
    expect(await screen.findByRole('heading', { name: 'field1' })).toBeInTheDocument();
    expect(await screen.findByTestId('field-description')).toHaveTextContent(
      /field description 1/i
    );
    expect(await screen.findByRole('heading', { name: 'Type' })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'Arguments' })).toBeInTheDocument();
    const args = await screen.findAllByTestId('argument');
    expect(args.length).toEqual(1);
  });

  test('does not render field description and arguments if they are absent from the schema', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Documentation schema={clientSchemaMock} />
      </MemoryRouter>
    );

    const typeLink = await screen.findByRole('link', { name: 'TestRootType' });
    fireEvent.click(typeLink);
    const fieldLink = await screen.findByRole('link', { name: 'field2' });
    fireEvent.click(fieldLink);
    expect(await screen.findByRole('heading', { name: 'field2' })).toBeInTheDocument();
    expect(screen.queryByTestId('field-description')).toBeNull();
    expect(screen.queryByRole('heading', { name: 'Arguments' })).toBeNull();
    expect(screen.queryAllByTestId('argument').length).toEqual(0);
  });
});
