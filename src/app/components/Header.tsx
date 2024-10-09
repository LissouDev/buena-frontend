import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md">
      <div className="text-2xl font-bold">Buena</div>
      <nav className="space-x-6">
        <Link href="#" className="text-gray-800 hover:underline">
          Einloggen
        </Link>
        <Link href="#" className="text-gray-800 hover:underline">
          So funktioniert&apos;s
        </Link>
        <Link href="#" className="text-gray-800 hover:underline">
        Über Buena
        </Link>
        <Link href="#" className="text-gray-800 hover:underline">
          Jobs
        </Link>
      </nav>
    </header>
  );
};

export default Header;