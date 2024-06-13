import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { FiMenu } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

type MenuBarMobileProps = {
  onClick: Dispatch<SetStateAction<boolean>>;
};

export default function MenuBarMobile({ onClick }: MenuBarMobileProps) {
  return (
    <nav className="md:hidden z-20 fixed top-0 left-0 right-0 h-[60px] bg-black flex [&>*]:my-auto px-2">
      <button
        className="text-4xl flex text-white"
        onClick={() => {
          onClick((oldVal: any) => !oldVal);
        }}
      >
        <FiMenu />
      </button>
      <Link href="/" className="mx-auto">
        <img
          src={"/images/logo/coassemble.svg"}
          alt="Company Logo"
          width={50}
          height={50}
        />
      </Link>
      <Link className="text-3xl flex text-white" href="/auth/login">
        <FaUser />
      </Link>
    </nav>
  );
}
