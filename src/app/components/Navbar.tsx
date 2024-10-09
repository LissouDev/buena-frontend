import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md">
      <Link href="/" className="text-2xl font-bold">Buena</Link>
      <nav className="space-x-6">
        <Link href="/login" className="text-gray-800 hover:underline">
          Einloggen
        </Link>
        <Link href="/how" className="text-gray-800 hover:underline">
          So funktioniert&apos;s
        </Link>
        <Link href="/about" className="text-gray-800 hover:underline">
        Über Buena
        </Link>
        <Link href="/jobs" className="text-gray-800 hover:underline">
          Jobs
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;