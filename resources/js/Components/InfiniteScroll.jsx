import React from "react";

const InfiniteScrollMarquee = ({ images }) => {
    return (
        <div className="w-[80%] flex  overflow-hidden whitespace-nowrap">
            {/* Bagian pertama marquee */}
            <div className="animate-marquee flex-shrink-0 justify-around flex whitespace-nowrap w-full">
                {images.map((image, index) => (
                    <div
                        key={index} // Moved key here
                        className="p-3 border border-gray-2000 rounded-xl hover:border-none hover:bg-gray-2000 group"
                    >
                        <div className="flex gap-3">
                            <div className="bg-gray-2000 group-hover:bg-gray-1000 p-2 rounded-xl flex items-center">
                                <img
                                    src={image.src}
                                    alt={`Image ${index + 1}`}
                                />
                            </div>
                            <div>
                                <p className="text-white-100 font-semibold">
                                    {image.title} {/* Dinamis */}
                                </p>
                                <p className="text-white-100">
                                    {image.description} {/* Dinamis */}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bagian kedua marquee */}
            <div className="animate-marquee flex-shrink-0 justify-around flex whitespace-nowrap w-full">
                {images.map((image, index) => (
                    <div
                        key={`duplicate-${index}`} // Unique key for the duplicate
                        className="p-3 border border-gray-2000 rounded-xl hover:border-none hover:bg-gray-2000 group"
                    >
                        <div className="flex gap-3">
                            <div className="bg-gray-2000 group-hover:bg-gray-1000 p-2 rounded-xl flex items-center">
                                <img
                                    src={image.src}
                                    alt={`Image ${index + 1}`}
                                />
                            </div>
                            <div>
                                <p className="text-white-100 font-semibold">
                                    {image.title} {/* Dinamis */}
                                </p>
                                <p className="text-white-100">
                                    {image.description} {/* Dinamis */}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfiniteScrollMarquee;
