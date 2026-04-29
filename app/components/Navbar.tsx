"use client";

import Link from "next/link";

type NavbarProps = {
  onShare?: () => void;
  slug?: string;
};

const Navbar = ({ onShare, slug }: NavbarProps) => {
  return (
    <nav className="fixed inset-x-0 top-0 z-30 w-screen">
      <div className="flex w-full items-center justify-end gap-2 border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur-md sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-white/20 hover:bg-white/10"
        >
          Home
        </Link>
        {slug && (
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
            {slug}
          </span>
        )}
        {onShare && (
          <button
            onClick={onShare}
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-white/20 hover:bg-white/10"
          >
            Share
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
