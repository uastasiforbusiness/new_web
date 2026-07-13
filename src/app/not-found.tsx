import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] text-white px-4">
      <h1 className="font-cormorant text-8xl md:text-9xl text-[#c5a880] mb-4">404</h1>
      <p className="font-outfit text-xl md:text-2xl text-gray-300 mb-2 text-center">
        Page not found
      </p>
      <p className="font-inter text-base text-gray-500 mb-8 text-center max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 border border-[#c5a880] text-[#c5a880] 
                   font-outfit text-sm tracking-widest uppercase hover:bg-[#c5a880] hover:text-[#0a0a0a] 
                   transition-colors duration-300"
      >
        Back to Home
      </Link>
    </main>
  );
}
