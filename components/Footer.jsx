import React from "react";
import { Fot1, Fot2 } from ".";

const Footer = () => {
  const footerNavs = [
    { href: "javascript:void()", name: "Terms" },
    { href: "javascript:void()", name: "License" },
    { href: "javascript:void()", name: "Privacy" },
    { href: "javascript:void()", name: "About Us" },
  ];
  return (
    <footer className="pt-10">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 text-gray-600">
        <div className="justify-between sm:flex">
          <div className="space-y-6">
            <img src="./SVG/logo.PNG" alt="logo" className="w-32" />
            <p className="max-w-md">
              Moving Towards Efficiency: Upgrade Your Supply Chain Now
            </p>
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {footerNavs.map((item, index) => {
                <li className="text-gray-800 hover:text-gray-500 duration-150">
                  <a key={index} href={item.href} className="block">
                    {item.title}
                  </a>
                </li>;
              })}
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-gray-700 font-semibold">Get The App</p>
            <div className="flex items-center gap-3 mt-3 sm:block">
              <a href="javascript:void()">
                <Fot1 />
              </a>
              <a href="javascript:void()" className="mt-0 block md:mt-3">
                <Fot2 />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
