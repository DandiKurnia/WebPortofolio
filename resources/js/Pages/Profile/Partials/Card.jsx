import { Link } from "@inertiajs/react";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

function Card({ className }) {
    return (
        <div className={`bg-gray-2000 rounded-2xl p-4 shadow-lg ${className}`}>
            <div className="rounded-lg overflow-hidden aspect-[4/3]">
                <img
                    src="https://via.placeholder.com/400x250"
                    alt="Finance Landing Page"
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Content */}
            <div className="mt-4 flex justify-between items-center text-white">
                <div className="text">
                    <h3 className="text-base md:text-2xl text-white-100 font-bold mb-3">
                        Finance landing page
                    </h3>

                    {/* Tags */}
                    <div className="flex gap-2 mb-4">
                        <span className="bg-gray-1000 text-gray-300 text-sm font-medium px-3 py-1 rounded-md">
                            Web-design
                        </span>
                        <span className="bg-gray-1000 text-gray-300 text-sm font-medium px-3 py-1 rounded-md">
                            Development
                        </span>
                    </div>
                </div>
                {/* Button */}
                <Link className="group w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-green-1000 text-black rounded-lg  transition">
                    <FiArrowUpRight className="text-2xl transition-transform transform group-hover:-translate-y-0.5" />
                </Link>
            </div>
        </div>
    );
}

export default Card;
