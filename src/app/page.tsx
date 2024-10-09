import Header from "./components/Header";
import MainSection from "./components/MainSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="h-screen flex flex-col">
      <Header />
        <MainSection />
      <Footer />
    </main>
  );
}
