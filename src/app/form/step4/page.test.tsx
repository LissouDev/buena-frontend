import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import Step4 from './page';
import { useFormContext } from '@/context/FormContext';

// Mocking useFormContext and useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/context/FormContext', () => ({
  useFormContext: jest.fn(),
}));

describe('Step4 Component', () => {
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

  it('renders the Step4 form correctly with pre-filled data', () => {
    render(<Step4 />);
    const salaryInput = screen.getByText(/Enter your salary range/i);
    expect(salaryInput).toBeInTheDocument();
    expect(salaryInput).not.toHaveValue();
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument();
  });

  it('shows validation error if the salary field is empty', async () => {
    render(<Step4 />);
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await act(async () => {
      fireEvent.click(nextButton);
    });
    expect(screen.getByText(/Salary range is required/i)).toBeInTheDocument();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('shows validation error if the salary is invalid', async () => {
    render(<Step4 />);
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await act(async () => {
      fireEvent.click(nextButton);
    });
    expect(mockPush).not.toHaveBeenCalled();
  });
});

describe('Step4 Component', () => {
  const mockPush = jest.fn();
  const mockUpdateFormData = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useFormContext as jest.Mock).mockReturnValue({
      formData: { name: '', email: '', phone: '', salary: '0-1000' },
      updateFormData: mockUpdateFormData,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls updateFormData and navigates to the next step on valid form submission', async () => {
    render(<Step4 />);
    const nextButton = screen.getByRole('button', { name: /Next/i });
    await act(async () => {
      fireEvent.click(nextButton);
    });
    expect(mockUpdateFormData).toHaveBeenCalledWith({ salary: '0-1000' });
    expect(mockPush).toHaveBeenCalledWith('/form/summary');
  });

  it('renders a previous button', async () => {
    render(<Step4 />);
    const previousButton = screen.getByRole('button', { name: /Previous/i });
    expect(previousButton).toBeInTheDocument();
  });

  it('navigates to previous step when the user clicks on the previous button', async () => {
    render(<Step4 />);
    const previousButton = screen.getByRole('button', { name: /Previous/i });
    await act(async () => {
      fireEvent.click(previousButton);
    });
    expect(mockPush).toHaveBeenCalledWith('/form/step3');
  });
});
