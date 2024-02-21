import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="relative isolate px-6 lg:px-8 h-screen font-nunito">
      <div
        className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl justify-center "
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] -translate-x-1/2 bg-gradient-to-tr from-[#001e63] to-[#001e63] opacity-30 sm:left-[calc(50%-30rem)] "></div>
      </div>
      <div className="mx-auto max-w-6xl py-48 ">

        <div className="text-center ">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl font-nunito">
            Revolutionize Case Handling with Blockchain Technology 🚀 </h1>
          <p className="mt-6 text-xl leading-8 text-gray-600 font-nunito">
            NyaySetu is a blockchain-based platform that aims to revolutionize
            the way Cases are recorded and handled. Our platform ensures that
            Cases are immutable, secure, and accessible to all stakeholders.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link

              href="#"
              className="rounded-md bg-slate-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </Link>
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-35rem)]"
        aria-hidden="true"
      >
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#7ea1f0] to-[#97b3f5] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  );
};

export default Hero;