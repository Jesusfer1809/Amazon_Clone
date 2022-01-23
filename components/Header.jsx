import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  SearchIcon,
  ShoppingCartIcon,
  MenuIcon,
  UserIcon,
} from "@heroicons/react/outline";

import { signIn, signOut, useSession } from "next-auth/react";
import { useSelector } from "react-redux";

function Header() {
  const { data: session } = useSession();
  const items = useSelector((state) => state.items.items);

  return (
    <div className=" bg-amazon_blue text-white flex flex-col  text-xs space-y-2">
      <div className="flex justify-between md:justify-start items-center space-x-4 lg:space-x-8 h-[60px] p-1 px-3 lg:px-4">
        <Link href="/">
          <div className="relative flex items-center h-[30px] w-[130px] md:h-[40px] md:w-[150px] cursor-pointer">
            <Image
              src="https://links.papareact.com/f90"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Link>

        <div className=" hidden md:flex bg-yellow-400 h-10 flex-grow rounded-md hover:bg-yellow-500 ">
          <input
            type="text "
            className="h-full  w-full rounded-l-md focus:outline-none text-amazon_blue px-4 text-base "
          />

          <SearchIcon className="w-12 h-full text-amazon_blue px-3 cursor-pointer" />
        </div>

        <div className="flex space-x-4 sz500:space-x-8 md:space-x-4 h-full">
          <div
            className="flex sm:hidden items-center "
            onClick={!session ? signIn : signOut}
          >
            <span className="text-sm font-semibold">
              {session ? `${session.user.name}` : "Identifícate"}
            </span>
            <UserIcon className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>

          <div
            className="hidden sm:flex flex-col justify-center cursor-pointer "
            onClick={!session ? signIn : signOut}
          >
            <span>{session ? `Hola, ${session.user.name}` : "Sign In"}</span>
            <span className="text-sm font-semibold">Cuenta y Listas</span>
          </div>

          <div className="hidden sm:flex flex-col justify-center ">
            <span>Devoluciones</span>
            <span className="text-sm font-semibold">y Pedidos</span>
          </div>

          <Link href="/checkout">
            <div className="flex items-center cursor-pointer relative">
              <div className="absolute w-5 h-5 text-xs top-1 left-4 bg-yellow-500 text-amazon_blue rounded-full flex justify-center items-center">
                {items.length}
              </div>
              <ShoppingCartIcon className=" w-7 h-7 sm:w-8 sm:h-8 " />
              <span className="text-sm font-semibold hidden sz400:inline">
                Carrito
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className=" p-1 px-3 flex md:hidden">
        <div className=" flex w-full bg-yellow-400 h-10  rounded-md hover:bg-yellow-500">
          <input
            type="text "
            placeholder="...Buscar en Amazon"
            className="h-full  w-full rounded-l-md focus:outline-none text-amazon_blue placeholder-amazon_blue-light px-4 text-base "
          />

          <SearchIcon className="w-12 h-full text-amazon_blue px-3 cursor-pointer" />
        </div>
      </div>

      <div className=" bg-gradient-to-b from-amazon_blue to-amazon_blue-light md:from-amazon_blue-light  ">
        <ul className="flex text-sm font-semibold overflow-x-scroll scrollbar-hide space-x-2 md:space-x-1 ">
          <li className="p-3 text-base inline-block md:hidden whitespace-nowrap">
            <a href="#">Promociones</a>
          </li>

          <li className="p-3 text-base inline-block md:hidden whitespace-nowrap">
            <a href="#">Amazon Basics</a>
          </li>

          <li className="p-3 text-base inline-block md:hidden whitespace-nowrap">
            <a href="#">Más Vendidos</a>
          </li>

          <li className="p-3 text-base inline-block md:hidden whitespace-nowrap">
            <a href="#">Livestreams</a>
          </li>

          <li className="p-3 text-base inline-block md:hidden whitespace-nowrap">
            <a href="#">Video</a>
          </li>

          <li className="p-3 text-base inline-block md:hidden whitespace-nowrap">
            <a href="#">Nuevos Lanzamientos</a>
          </li>

          <li className="p-3 text-base inline-block md:hidden whitespace-nowrap">
            <a href="#">Hogar</a>
          </li>

          <li className="p-3 text-base inline-block md:hidden whitespace-nowrap">
            <a href="#">Libros</a>
          </li>

          <li className="p-3 text-base inline-block md:hidden whitespace-nowrap">
            <a href="#">Salud y Productos para el Hogar</a>
          </li>

          <li className="p-3 text-base inline-block md:hidden whitespace-nowrap">
            <a href="#">PC</a>
          </li>

          <li className="p-3 text-base inline-block md:hidden whitespace-nowrap">
            <a href="#">Música</a>
          </li>

          <li className="p-3 hidden md:inline-block whitespace-nowrap">
            <a href="#">Ofertas del Día</a>
          </li>

          <li className="p-3 hidden md:inline-block whitespace-nowrap">
            <a href="#">Servicio al Cliente</a>
          </li>

          <li className="p-3 text-base md:text-sm whitespace-nowrap">
            <a href="#">Listas</a>
          </li>

          <li className="p-3 text-base md:text-sm whitespace-nowrap">
            <a href="#">Tarjetas de Regalo</a>
          </li>

          <li className="p-3 hidden md:inline-block whitespace-nowrap">
            <a href="#">Vender</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
