'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { useFormContext } from '../../context/FormContext';

const Step3: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { phone: formData.phone },
  });
  const router = useRouter();

  const navigateToPrevious = () => {
    console.log("navigateToPrevious");
    // debugger;
    router.push("/form/step2");
};

  const onSubmit = (data: { phone: string }) => {
    console.log("+++++++ 3 onSubmit");
    console.log("STEP3 data", data);
    updateFormData(data);
    router.push('/form/step4');
  };
  console.log("formData 3", formData);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-20 p-10 border-gray-200 border-2">

      <h2 className="text-2xl mb-4">Step 3: Enter your phone number</h2>
      <div>
        <label>Phone: </label>
        <input {...register('phone', { required: 'Phone is required', pattern: {
                value: /^\d{10}$/,
                message: 'It seems your phone number is invalid, phone numbers must be 10 digits',
              }, })} className="border p-2" placeholder={formData.phone ? formData.phone : "Enter your phone"}/>
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

      </div>
      <div className="flex space-x-10">
        <button type="button" className="bg-gray-300 text-gray-800 py-2 px-4 mt-4 rounded" onClick={navigateToPrevious}>
          Previous
        </button>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 mt-4 rounded">Next</button>
      </div>
    </form>
  );
};

export default Step3;