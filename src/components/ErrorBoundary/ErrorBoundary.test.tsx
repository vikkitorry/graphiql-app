import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { expect, vi, test, describe, beforeEach } from 'vitest';

describe('ErrorPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  console.log = vi.fn();
  console.error = vi.fn();

  test('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div>Test Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Child Component')).toBeInTheDocument();
  });

  test('renders ErrorPage on error occurrence', () => {
    vi.spyOn(global.console, 'error').mockImplementation(() => {});

    const ErrorThrowingComponent = () => {
      throw new Error('Test Error');
    };

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Ooops something went wrong')).toBeInTheDocument();
  });
});
