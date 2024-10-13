'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useFormContext } from '@/context/FormContext';
import ProgressBar from '@/components/ProgressBar';

const Step1: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: formData.name },
  });
  const router = useRouter();

  const onSubmit = (data: { name: string }) => {
    updateFormData(data);
    router.push('/form/step2');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-10 border-gray-200 border-2 bg-white"
    >
      <ProgressBar currentStep={1} />
      <h2 className="text-2xl mb-4">Step 1: Enter your name</h2>
      <div className="flex">
        <input
          {...register('name', {
            required: 'Name is required',
            pattern: {
              value: /^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/,
              message:
                'It seems your name is invalid, please enter your full name',
            },
          })}
          className="border p-2 grow"
          placeholder={formData.name ? formData.name : 'Enter your name'}
        />
      </div>
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      <div className="flex">
        <button
          type="submit"
          className="bg-blue-500 text-white grow py-2 px-4 mt-4 rounded"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step1;
