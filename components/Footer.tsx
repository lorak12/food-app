import Image from "next/image";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="p-4 w-full">
      <div className="p-4 mx-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href={"/"}
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              SM Ogród
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 gap-4">
            <li>
              <Link href="/pp" className="hover:underline me-4 md:me-6">
                Polityka Prywatności
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:underline">
                Kontakt
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <Link href={"/"} className="hover:underline">
            SM Ogród™
          </Link>
          . Wszystkie prawa zastrzeżone
        </span>
      </div>
    </footer>
  );
}

export default Footer;
