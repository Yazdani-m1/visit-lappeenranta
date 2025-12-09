// src/__tests__/trip-plan/TripRequestForm.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TripRequestForm } from '@/components/trip-plan/TripRequestForm';

describe('TripRequestForm', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    // @ts-expect-error – test-only override
    global.fetch = undefined;
    jest.resetAllMocks();
  });

  it('shows client-side validation errors on empty submit', async () => {
    render(<TripRequestForm />);

    const submitButton = screen.getByRole('button', {
      name: /send trip plan request/i,
    });

    await userEvent.click(submitButton);

    expect(
      await screen.findByText(/please enter your name/i),
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/please enter a valid email address/i),
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/please select arrival date/i),
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/please select departure date/i),
    ).toBeInTheDocument();

    // group size در حالت پیش‌فرض معتبر است، پس این‌جا نباید ارور داشته باشد

    expect(
      await screen.findByText(/select at least one interest/i),
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        /please describe your trip in at least a few words/i,
      ),
    ).toBeInTheDocument();
  });

  it('shows an error when group size is less than 1', async () => {
    render(<TripRequestForm />);

    const groupSizeInput = screen.getByLabelText(/group size/i);

    await userEvent.clear(groupSizeInput);
    await userEvent.type(groupSizeInput, '0');

    const submitButton = screen.getByRole('button', {
      name: /send trip plan request/i,
    });

    await userEvent.click(submitButton);

    expect(
      await screen.findByText(/group size must be at least 1/i),
    ).toBeInTheDocument();
  });

  it('submits successfully when the form is valid', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });

    // @ts-expect-error – test-only override
    global.fetch = mockFetch;

    render(<TripRequestForm />);

    await userEvent.type(
      screen.getByLabelText(/name/i),
      'Test Visitor',
    );
    await userEvent.type(
      screen.getByLabelText(/email/i),
      'visitor@example.com',
    );
    await userEvent.type(
      screen.getByLabelText(/arrival date/i),
      '2025-06-01',
    );
    await userEvent.type(
      screen.getByLabelText(/departure date/i),
      '2025-06-05',
    );

    const groupSizeInput = screen.getByLabelText(/group size/i);
    await userEvent.clear(groupSizeInput);
    await userEvent.type(groupSizeInput, '3');

    const harbourButton = screen.getByRole('button', {
      name: /harbour & lake views/i,
    });
    await userEvent.click(harbourButton);

    await userEvent.type(
      screen.getByLabelText(/tell us a bit more/i),
      'First time in Lappeenranta, we want calm views, cafés and easy walks.',
    );

    const submitButton = screen.getByRole('button', {
      name: /send trip plan request/i,
    });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/trip-requests',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    expect(
      await screen.findByText(/we received your request/i),
    ).toBeInTheDocument();
  });
});
