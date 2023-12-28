import { expect, vi, test, describe, beforeEach } from 'vitest';
import SignUpPage from './SignUpPage';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Service from '../../app/service/service';
import { act } from '@testing-library/react';
import { TranslatorContext } from '../../context/translatorContextProvider';

describe('SignUpPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders form with email and password input fields', () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test('calls onFinish when form is submitted with valid inputs', async () => {
    const mockSignUp = vi.spyOn(Service, 'signUp');

    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    await act(async () => {
      await fireEvent.change(screen.getByPlaceholderText(/Email/i), {
        target: { value: 'test@example.com' },
      });
      await fireEvent.change(screen.getByPlaceholderText(/Password/i), {
        target: { value: 'password123!' },
      });
      await fireEvent.click(screen.getByTestId('submit'));
    });

    waitFor(() => expect(screen.getByTestId('submit')).not.toBeDisabled());
    waitFor(() => expect(mockSignUp).toBeCalledWith('test@example.com', 'password123!'));
  });

  test('displays EN error notification when signUp function throws an error', async () => {
    const mockSignUp = vi.spyOn(Service, 'signUp');
    mockSignUp.mockRejectedValue(new Error('Firebase error'));

    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123!' },
    });

    await fireEvent.click(screen.getByTestId('submit'));

    await waitFor(() => {
      expect(screen.getByText(/Error/)).toBeInTheDocument();
    });
  });

  test('disable submit button if input values is not valid', async () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );

    await act(async () => {
      await fireEvent.change(screen.getByPlaceholderText(/Email/i), {
        target: { value: 'test' },
      });
      await fireEvent.change(screen.getByPlaceholderText(/Password/i), {
        target: { value: 'password' },
      });
    });

    const submitButton = screen.getByTestId('submit');

    waitFor(() => expect(submitButton).toBeDisabled());
  });

  test('displays RU error notification when signUp function throws an error', async () => {
    const mockSignUp = vi.spyOn(Service, 'signUp');
    mockSignUp.mockRejectedValue(new Error('Firebase error'));

    render(
      <MemoryRouter>
        <TranslatorContext.Provider
          value={{
            lang: 'ru',
            data: { en: {}, ru: { email: 'Почта', password: 'Пароль' } },
            setLang: vi.fn(),
          }}
        >
          <SignUpPage />
        </TranslatorContext.Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Почта/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByPlaceholderText(/Пароль/i), {
      target: { value: 'password123!' },
    });

    await fireEvent.click(screen.getByTestId('submit'));

    await waitFor(() => {
      expect(screen.getByText(/Ошибка/)).toBeInTheDocument();
    });
  });
});
