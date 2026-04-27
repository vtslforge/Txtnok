"use client";

import Link from "next/link";

type NavbarProps = {
  onShare?: () => void;
  slug?: string;
};

const Navbar = ({ onShare, slug }: NavbarProps) => {
  return (
    <nav className="h-[5vh] bg-[#474444] flex items-center justify-end gap-2 p-2 fixed top-0 z-20 w-full">
      <Link
        href="/"
        className="border flex justify-center items-center rounded-full px-3 text-white"
      >
        Home
      </Link>
      {slug && <span className="rounded-full border px-3 text-white">{slug}</span>}
      {onShare && (
        <button
          onClick={onShare}
          className="border flex justify-center items-center rounded-full px-3 cursor-pointer text-white"
        >
          share
        </button>
      )}
    </nav>
  );
};

export default Navbar;
