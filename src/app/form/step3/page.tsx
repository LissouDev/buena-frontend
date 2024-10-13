'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useFormContext } from '../../../context/FormContext';
import ProgressBar from '@/components/ProgressBar';

const Step3: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { phone: formData.phone },
  });
  const router = useRouter();

  const navigateToPrevious = () => {
    router.push('/form/step2');
  };

  const onSubmit = (data: { phone: string }) => {
    updateFormData(data);
    router.push('/form/step4');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-10 border-gray-200 border-2 bg-white"
    >
      <ProgressBar currentStep={3} />

      <h2 className="text-2xl mb-4">Step 3: Enter your phone number</h2>
      <div className="flex">
        <input
          {...register('phone', {
            required: 'Phone is required',
            pattern: {
              value: /^\d{10}$/,
              message:
                'It seems your phone number is invalid, phone numbers must be 10 digits',
            },
          })}
          className="border p-2 grow"
          placeholder={formData.phone ? formData.phone : 'Enter your phone'}
        />
      </div>
      {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
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

export default Step3;
