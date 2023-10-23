"use client";
import { Products } from "@prisma/client";
import React, { useState } from "react";
import Image from "next/image";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

type ShowCaseProps = {
  products: Products[];
  index: number;
};

export const ShowCase = ({ products, index = 0 }: ShowCaseProps) => {
  const [currentIndex, setCurrentIndex] = useState(index);
  const goToNextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  };

  const goToPreviousProduct = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="m-auto relative group">
      <Image
        width={500}
        height={500}
        src={products[currentIndex].imageUrl}
        alt={products[currentIndex].name}
        className="object-cover rounded-xl ml-6 mt-9"
      />
      <div
        onClick={goToPreviousProduct}
        className="hidden group-hover:block absolute top-1/2 left-5 transform  -translate-x-0 -translate-y-1/2 cursor-pointer text-white rounded-full"
      >
        <BsChevronCompactLeft size={60} />
      </div>
      <div
        onClick={goToNextProduct}
        className=" hidden group-hover:block absolute top-1/2 right-0  -translate-x-0 transform -translate-y-1/2 cursor-pointer text-white rounded-full"
      >
        <BsChevronCompactRight size={60} />
      </div>
    </div>
  );
};
