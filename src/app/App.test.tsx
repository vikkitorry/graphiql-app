import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';
import { expect, vi, test, describe, beforeEach } from 'vitest';

describe('BugButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders error page', () => {
    render(<App />);

    expect(screen.getByText('App')).toBeInTheDocument();
  });
});
