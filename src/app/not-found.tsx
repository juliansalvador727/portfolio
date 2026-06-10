import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p
        className="p3r-enter-up text-[24vw] font-black italic uppercase leading-none text-p3r-red drop-shadow-[0_0_40px_rgba(230,0,51,0.6)] sm:text-[10rem]"
        style={{ "--d": "0.05s" } as React.CSSProperties}
      >
        404
      </p>
      <p
        className="p3r-enter-up text-lg font-bold italic text-white/85"
        style={{ "--d": "0.2s" } as React.CSSProperties}
      >
        You have lost your way in the Dark Hour.
      </p>
      <Link
        href="/"
        className="p3r-enter-up -skew-x-12 bg-white px-6 py-2.5 text-sm font-black uppercase italic text-black transition-colors hover:bg-p3r-red hover:text-white"
        style={{ "--d": "0.35s" } as React.CSSProperties}
      >
        <span className="block skew-x-12">▶ Return to the main menu</span>
      </Link>
    </div>
  );
}
