export default function FormComplete() {
  return (
    <main className="h-screen flex">
      <div className="flex flex-col grow text-center pt-20 px-10 bg-white">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        height="100px" 
        viewBox="0 -960 960 960" 
        width="100px" 
        fill="#22c55e"
        className="flex justify-center mx-auto mb-10"
      >
        <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/>
      </svg>
        <h1 className="text-5xl font-bold leading-tight text-gray-800 mb-6">
          Form is complete
        </h1>
        <p className="text-lg text-gray-600">
            Thank you for completing the form. We will get back to you soon. Check our <a href="/about" className="text-blue-500">about us</a> page to learn more about our company!
        </p>
      </div> 
    </main>
  );
}