'use client';

import { FormProvider } from '@/context/FormContext';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {  
  return (
    <main className="h-screen flex flex-col">
      <Navbar />
      <FormProvider>
        <div className="h-screen flex justify-center items-center bg-white">
          {children}
        </div>
      </FormProvider>
      <Footer />    
    </main>
  );
}