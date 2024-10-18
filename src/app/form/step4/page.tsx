'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useFormContext } from '../../../context/FormContext';
import ProgressBar from '@/components/ProgressBar';
import { useState } from 'react';

const Step4: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { salary: formData.salary },
  });
  const router = useRouter();

  type SalaryRange = {
    id: string;
    label: string;
    value: string;
  };

  const salaryRanges: SalaryRange[] = [
    { id: 'range1', label: '0-1000', value: '0-1000' },
    { id: 'range2', label: '1000-2000', value: '1000-2000' },
    { id: 'range3', label: '2000-3000', value: '2000-3000' },
    { id: 'range4', label: '3000-4000', value: '3000-4000' },
    { id: 'range5', label: '4000+', value: '4000+' },
  ];

  const [selected, setSelectedRanges] = useState<string>('');

  const handleRadioChange = (value: string) => {
    setSelectedRanges(value);
  };

  const navigateToPrevious = () => {
    router.push('/form/step3');
  };

  const onSubmit = (data: { salary: string }) => {
    updateFormData(data);
    router.push('/form/summary');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-96	p-10 border-gray-200 border-2"
    >
      <ProgressBar currentStep={4} />

      <h2 className="text-2xl mb-4">Step 4: Enter your salary range</h2>
      {salaryRanges.map((range) => (
        <div key={range.id} className="mb-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              {...register('salary', { required: 'Salary range is required' })}
              className="form-radio h-5 w-5 text-blue-600"
              value={range.value}
              checked={selected === range.value}
              onChange={() => handleRadioChange(range.value)}
            />
            <span className="ml-2">{range.label}</span>
          </label>
        </div>
      ))}
      <p className="text-red-500 min-h-[2rem] mt-2">
        {errors.salary && errors.salary.message}
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
          className="bg-blue-500 text-white py-2 px-4 mt-4 rounded"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default Step4;
