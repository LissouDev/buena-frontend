import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function Jobs() {
  return (
    <main className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-col grow items-center justify-center text-center py-16 px-6 bg-white">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 mb-6">
          Jobs
        </h1>
        <p className="text-lg text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </p>
      </div> 
      <Footer />    
    </main>
  );
}