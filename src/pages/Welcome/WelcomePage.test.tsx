import { expect, vi, test, describe, beforeEach } from 'vitest';
import WelcomePage from './WelcomePage';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { TranslatorContext } from '../../context/translatorContextProvider';
import { translationData } from '../../context/translationData/translationData';

describe('WelcomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('render Welcome page without bugs, displays RU translation', async () => {
    render(
      <MemoryRouter>
        <TranslatorContext.Provider
          value={{
            lang: 'ru',
            data: translationData,
            setLang: vi.fn(),
          }}
        >
          <WelcomePage userLoggedIn={true} />
        </TranslatorContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('О проекте:')).toBeInTheDocument();
      expect(screen.getByText('Попробуйте GraphiQL')).toBeInTheDocument();
    });
  });

  test('render Welcome page without bugs, displays RU translation if user was not logged in', async () => {
    render(
      <MemoryRouter>
        <TranslatorContext.Provider
          value={{
            lang: 'ru',
            data: translationData,
            setLang: vi.fn(),
          }}
        >
          <WelcomePage userLoggedIn={false} />
        </TranslatorContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Войти')).toBeInTheDocument();
      expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument();
    });
  });

  test('render Welcome page without bugs, displays EN translation', async () => {
    render(
      <MemoryRouter>
        <TranslatorContext.Provider
          value={{
            lang: 'en',
            data: translationData,
            setLang: vi.fn(),
          }}
        >
          <WelcomePage userLoggedIn={true} />
        </TranslatorContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Welcome Page')).toBeInTheDocument();
      expect(screen.getByText('Go To GraphiQL')).toBeInTheDocument();
    });
  });

  test('render Welcome page without bugs, displays En translation if user was not logged in', async () => {
    render(
      <MemoryRouter>
        <TranslatorContext.Provider
          value={{
            lang: 'en',
            data: translationData,
            setLang: vi.fn(),
          }}
        >
          <WelcomePage userLoggedIn={false} />
        </TranslatorContext.Provider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Sign In')).toBeInTheDocument();
      expect(screen.getByText('Sign Up')).toBeInTheDocument();
    });
  });
});
