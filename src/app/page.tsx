import Navbar from "./components/Navbar";
import MainSection from "./components/MainSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <Navbar />
      <MainSection />
      <Footer />
    </main>
  );
}
