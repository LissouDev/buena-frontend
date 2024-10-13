'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useFormContext } from '../../../context/FormContext';
import ProgressBar from '@/components/ProgressBar';

const Step2: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: formData.email },
  });
  const router = useRouter();

  const navigateToPrevious = () => {
    router.push('/form/step1');
  };

  const onSubmit = (data: { email: string }) => {
    updateFormData(data);
    router.push('/form/step3');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-10 border-gray-200 border-2 bg-white"
    >
      <ProgressBar currentStep={2} />

      <h2 className="text-2xl mb-4">Step 2: Enter your email</h2>
      <div className="flex">
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message:
                'It seems your email address is invalid, verify you have entered it correctly',
            },
          })}
          className="border p-2 grow"
          placeholder={formData.email ? formData.email : 'Enter your email'}
        />
      </div>
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
          className="bg-blue-500 text-white py-2 px-4 mt-4 rounded"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step2;
