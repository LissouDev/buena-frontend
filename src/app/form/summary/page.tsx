'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useFormContext } from '../../../context/FormContext';
import axios from 'axios';
import ProgressBar from '@/components/ProgressBar';

const SummaryPage: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { salary: formData.salary },
  });
  const router = useRouter();

  const navigateToPrevious = () => {
    router.push('/form/step4');
  };

  const disabled =
    !formData.name ||
    !formData.email ||
    !formData.phone ||
    !formData.salary ||
    isSubmitting;

  const onSubmit = async (data: { salary: string }) => {
    updateFormData(data);
    console.log('Final Data: ', { ...formData, ...data });

    try {
      await axios.post('http://localhost:4000/api/users/', {
        ...formData,
        ...data,
      });
    } catch (error) {
      console.error('Error submitting the form', error);
    }
    alert('Form Submitted!');
    router.push('/form/complete');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-96	p-10 border-gray-200 border-2"
    >
      <ProgressBar currentStep={4} />

      <h2 className="text-2xl mb-4">Summary: Review your data</h2>
      <li>Name: {formData.name}</li>
      <li>Email: {formData.email}</li>
      <li>Phone: {formData.phone}</li>
      <li>Salary range: {formData.salary}</li>
      <p className="text-red-500 min-h-[2rem] mt-2">
        {(formData.name === '' ||
          formData.email === '' ||
          formData.phone === '' ||
          formData.salary === '') &&
          'Please fill all the fields'}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="bg-gray-300 text-gray-800 py-2 px-4 mt-4 rounded"
          onClick={navigateToPrevious}
        >
          Previous
        </button>
        <button
          type="submit"
          disabled={disabled}
          className={`bg-green-500 text-white py-2 px-4 mt-4 rounded ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SummaryPage;
