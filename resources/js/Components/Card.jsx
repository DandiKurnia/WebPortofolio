import { Link } from "@inertiajs/react";
import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

export default function Card({ className, dataPorject, showModal }) {
    return (
        <div
            className={`bg-gray-2000 rounded-2xl p-4 shadow-lg ${className}`}
            key={dataPorject.id}
        >
            <div className="rounded-lg overflow-hidden aspect-[3/2] bg-cover">
                <img
                    src={
                        dataPorject.images[0].image_path ||
                        "https://via.placeholder.com/400x250"
                    }
                    alt="Finance Landing Page"
                    className="w-full h-full bg-cover"
                />
            </div>
            {/* Content */}
            <div className="mt-4 flex gap-2 justify-between items-center text-white">
                <div className="text">
                    <h3 className="text-base md:text-2xl text-white-100 font-bold mb-3 capitalize">
                        {dataPorject.title}
                    </h3>

                    {/* Tags */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {dataPorject.technologies
                            ?.slice(0, 4)
                            .map((tech, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-1000 text-gray-300 text-sm font-medium px-3 py-1 rounded-md"
                                >
                                    {tech}
                                </span>
                            ))}
                        {dataPorject.technologies?.length > 4 && (
                            <span className="bg-gray-1000 text-gray-300 text-sm font-medium px-3 py-1 rounded-md">
                                +{dataPorject.technologies.length - 4}
                            </span>
                        )}
                    </div>
                </div>
                {/* Button */}
                <div className="block">
                    <button
                        onClick={() => showModal(dataPorject)}
                        className="group w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-green-1000 text-black rounded-lg  transition"
                    >
                        <FiArrowUpRight className="text-2xl transition-transform transform group-hover:-translate-y-0.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
