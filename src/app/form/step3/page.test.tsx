import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import Step3 from './page';
import { useFormContext } from '@/context/FormContext';

// Mocking useFormContext and useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/context/FormContext', () => ({
  useFormContext: jest.fn(),
}));

describe('Step3 Component', () => {
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

  it('renders the Step3 form correctly with pre-filled data', () => {
    render(<Step3 />);
    const phoneInput = screen.getByPlaceholderText(/Enter your phone/i);
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toHaveValue('');
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
  });

  it('shows validation error if the phone field is empty', async () => {
    render(<Step3 />);
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await act( async () => { fireEvent.click(nextButton) });
    expect(screen.getByText(/Phone is required/i)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('shows validation error if the phone is invalid', async () => {
    render(<Step3 />);
    const phoneInput = screen.getByPlaceholderText(/Enter your phone/i);
    await act( async () => { fireEvent.change(phoneInput, { target: { value: '123' } }) });
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await act( async () => { fireEvent.click(nextButton) });
    expect(screen.getByText(/It seems your phone number is invalid, phone numbers must be 10 digits/i)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('calls updateFormData and navigates to the next step on valid form submission', async () => {
    render(<Step3 />);
    const phoneInput = screen.getByPlaceholderText(/Enter your phone/i);
    await act( async () => { fireEvent.change(phoneInput, { target: { value: '1234567890' } }) });
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await act( async () => { fireEvent.click(nextButton) });
    expect(mockUpdateFormData).toHaveBeenCalledWith({ phone: '1234567890' });
    expect(mockPush).toHaveBeenCalledWith('/form/step4');
  });

  it('renders a previous button', async () => {
    render(<Step3 />);
    const previousButton = screen.getByRole('button', { name: /Previous/i });
    expect(previousButton).toBeInTheDocument();
  });

  it('navigates to previous step when the user clicks on the previous button', async () => {
    render(<Step3 />);
    const previousButton = screen.getByRole('button', { name: /Previous/i });
    await act( async () => { fireEvent.click(previousButton) });
    expect(mockPush).toHaveBeenCalledWith('/form/step2');
  });
});
