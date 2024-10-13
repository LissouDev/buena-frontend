import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';
import SummaryPage from '../summary/page';
import { useFormContext } from '@/context/FormContext';


// Mocking useFormContext and useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/context/FormContext', () => ({
  useFormContext: jest.fn(),
}));

describe('SummaryPage Component', () => {
  const mockPush = jest.fn();
  const mockUpdateFormData = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useFormContext as jest.Mock).mockReturnValue({
      formData: { name: 'Nelson Mandela', email: 'nelson@mandela.com', phone: '01234567890', salary: '0-1000' },
      updateFormData: mockUpdateFormData,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders a summary of the form data', () => {
    render(<SummaryPage />);
    const nameInput = screen.getByText(/Nelson Mandela/i);
    const emailInput = screen.getByText(/nelson@mandela.com/i);
    const phoneInput = screen.getByText(/01234567890/i);
    const salaryInput = screen.getByText(/0-1000/i);
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(phoneInput).toBeInTheDocument();
    expect(salaryInput).toBeInTheDocument();
  });
});
