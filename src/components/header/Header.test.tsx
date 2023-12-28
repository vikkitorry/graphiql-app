import { expect, vi, test, describe, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { render, screen, fireEvent } from '@testing-library/react';
import { TranslatorContext } from '../../context/translatorContextProvider';

describe('Header', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders Header without error if user change lang to Ru', () => {
    const setUserLoggedInMock = vi.fn();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header userLoggedIn={false} setUserLoggedIn={setUserLoggedInMock} />
      </MemoryRouter>
    );
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('renders Header without error if user change lang to En', () => {
    const setUserLoggedInMock = vi.fn();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header userLoggedIn={true} setUserLoggedIn={setUserLoggedInMock} />
      </MemoryRouter>
    );
    expect(screen.getByText('Main Page')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  test('changes the language when clicking the language switch', () => {
    const mockSetLang = vi.fn();

    render(
      <TranslatorContext.Provider
        value={{
          lang: 'ru',
          data: { en: {}, ru: { email: 'Почта', password: 'Пароль' } },
          setLang: mockSetLang,
        }}
      >
        <MemoryRouter>
          <Header userLoggedIn={true} setUserLoggedIn={() => {}} />
        </MemoryRouter>
      </TranslatorContext.Provider>
    );

    const languageSwitch = screen.getByTestId('switch');

    fireEvent.click(languageSwitch);
    expect(mockSetLang).toHaveBeenCalled();
  });
});
