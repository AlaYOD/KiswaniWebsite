import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070B0E] px-4 text-white">
      <div className="w-full max-w-2xl border border-white/10 p-8 sm:p-14">
        <div className="h-[3px] w-14 bg-[#FFDA01]" />
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#FFDA01]">404 / Kiswani Lights</p>
        <h1 className="mt-5 text-5xl font-semibold leading-none tracking-[-0.05em] sm:text-7xl">This light is not in our collection.</h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-[#A3A7AA]">The page may have moved or the product code may be incorrect. Return to the catalog to continue exploring.</p>
        <Link href="/#collections" className="mt-9 inline-flex min-h-14 items-center justify-center bg-[#FFDA01] px-7 text-sm font-bold text-[#0F1822]">Explore lighting</Link>
      </div>
    </main>
  );
}
