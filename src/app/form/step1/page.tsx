'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { useFormContext } from '@/context/FormContext';

const Step1: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: formData.name },
  });
  const router = useRouter();

  const onSubmit = (data: { name: string }) => {
    console.log("onSubmit +++++++ 1");
    console.log("STEP1 data", data);
    updateFormData(data);
    console.log("STEP1 data updated", data);
    router.push('/form/step2');
  };
  console.log("formData 1", formData);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-20 p-10 border-gray-200 border-2">
      <h2 className="text-2xl mb-4">Step 1: Enter your name</h2>
      <div>
        <label>Name: </label>
        <input {...register('name', { required: 'Name is required', pattern: {
                value: /^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/,
                message: 'It seems your name is invalid, please enter your full name',
              } })} className="border p-2" placeholder={formData.name ? formData.name : "Enter your name"}/>
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 mt-4 rounded">Next</button>
    </form>
  );
};

export default Step1;