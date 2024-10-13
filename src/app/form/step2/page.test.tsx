import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import Step2 from './page';
import { useFormContext } from '@/context/FormContext';

// Mocking useFormContext and useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/context/FormContext', () => ({
  useFormContext: jest.fn(),
}));

describe('Step2 Component', () => {
  const mockPush = jest.fn();
  const mockUpdateFormData = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useFormContext as jest.Mock).mockReturnValue({
      formData: { name: '', email: '', phone: '', salary: '' },
      updateFormData: mockUpdateFormData,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Step2 form correctly with pre-filled data', () => {
    render(<Step2 />);
    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue('');
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
  });

  it('shows validation error if the email field is empty', async () => {
    render(<Step2 />);
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await act( async () => { fireEvent.click(nextButton) });
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('shows validation error if the email is invalid', async () => {
    render(<Step2 />);
    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    await act( async () => { fireEvent.change(emailInput, { target: { value: 'asd@asd' } }) });
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await act( async () => { fireEvent.click(nextButton) });
    expect(screen.getByText(/It seems your email address is invalid, verify you have entered it correctly/i)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('calls updateFormData and navigates to the next step on valid form submission', async () => {
    render(<Step2 />);
    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    await act( async () => { fireEvent.change(emailInput, { target: { value: 'asd@asd.com' } }) });
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await act( async () => { fireEvent.click(nextButton) });
    expect(mockUpdateFormData).toHaveBeenCalledWith({ email: 'asd@asd.com' });
    expect(mockPush).toHaveBeenCalledWith('/form/step3');
  });

  it('renders a previous button', async () => {
    render(<Step2 />);
    const previousButton = screen.getByRole('button', { name: /Previous/i });
    expect(previousButton).toBeInTheDocument();
  });

  it('navigates to previous step when the user clicks on the previous button', async () => {
    render(<Step2 />);
    const previousButton = screen.getByRole('button', { name: /Previous/i });
    await act( async () => { fireEvent.click(previousButton) });
    expect(mockPush).toHaveBeenCalledWith('/form/step1');
  });
});
