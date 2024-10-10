import Link from "next/link";

const MainSection = () => {
    return (
      <main className="flex flex-col grow items-center justify-center text-center py-16 px-6 bg-white">
        <h1 className="text-5xl font-bold leading-tight text-gray-800 mb-6">
          Hausverwaltung, wie sie sein sollte.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Buena übernimmt die Betreuung Ihrer Einheiten, Mieter und all der Aufgaben, die ein Eigentümer zu erledigen hat. Mehr Zeit für Sie.
        </p>
        <Link className="bg-black text-white py-2 px-6 rounded-full hover:bg-gray-900 mb-8" href="/form">
          Füllen Sie unser Formular aus
        </Link>
        <video 
          src="https://framerusercontent.com/assets/375wnZVxAp3GMWD38xzYEjS8Sc.mp4" 
          loop
          autoPlay
          playsInline
        >
        </video>
      </main>
    );
  };
  
  export default MainSection;