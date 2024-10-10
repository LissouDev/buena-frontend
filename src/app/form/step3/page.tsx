'use client';

// import { useContext } from "react";
// import { DataContext } from "../layout";
// import { useForm } from 'react-hook-form';

// export default function Step3() {
//   const data = useContext(DataContext);
//   const {
//     register,
//     formState: { errors },
//   } = useForm();
//   return (
//     <div>
//       <p>TODO add the previous step 1</p>
//       <p>TODO add the previous step 2</p>
//       <label className="block mb-2 text-sm font-medium text-gray-700">
//         What is your phone number?
//       </label>
//       <input
//         type="tel"
//         {...register("phone",  { required: true })}
//         className="border border-gray-300 p-2 w-full rounded"
//         placeholder={data?.phone ? data.phone : "Enter your phone"}
//       />
//       {errors.phone && <p>Phone is required.</p>}
//     </div>
//   );
// }

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { useFormContext } from '../../../context/FormContext';
import ProgressBar from '@/components/ProgressBar';

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
    console.log("STEP3 data updated", data);

    router.push('/form/step4');
  };
  console.log("formData 3", formData);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-20 p-10 border-gray-200 border-2">
            <ProgressBar currentStep={3} />

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