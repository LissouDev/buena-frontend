import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import Step1 from './page';
import { useFormContext } from '@/context/FormContext';

// Mocking useFormContext and useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/context/FormContext', () => ({
  useFormContext: jest.fn(),
}));

describe('Step1 Component', () => {
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

  it('renders the Step1 form correctly with pre-filled data', () => {
    render(<Step1 />);
    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveValue('');
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
  });

  it('shows validation error if the name field is empty', async () => {
    render(<Step1 />);
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await act( async () => { fireEvent.click(nextButton) });
    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('shows validation error if the name is invalid', async () => {
    render(<Step1 />);
    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    await act( async () => { fireEvent.change(nameInput, { target: { value: '123' } }) });
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await act( async () => { fireEvent.click(nextButton) });
    expect(screen.getByText(/It seems your name is invalid/i)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('calls updateFormData and navigates to the next step on valid form submission', async () => {
    render(<Step1 />);
    const nameInput = screen.getByPlaceholderText(/Enter your name/i);
    await act( async () => { fireEvent.change(nameInput, { target: { value: 'Nelson Mandela' } }) });
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await act( async () => { fireEvent.click(nextButton) });
    expect(mockUpdateFormData).toHaveBeenCalledWith({ name: 'Nelson Mandela' });
    expect(mockPush).toHaveBeenCalledWith('/form/step2');
  });
});
