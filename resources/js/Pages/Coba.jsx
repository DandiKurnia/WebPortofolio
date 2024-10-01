import React from "react";
import InfiniteScroll from "@/Components/InfiniteScroll";

const Welcome = () => {
    const images = [
        {
            src: "/assets/img/react.png",
            title: "React",
            description: "Front-End",
        },
        {
            src: "/assets/img/laravel.png",
            title: "Laravel",
            description: "Back-End",
        },
        {
            src: "/assets/img/html.png",
            title: "HTML",
            description: "Markup Language",
        },
        {
            src: "/assets/img/tailwind.png",
            title: "Tailwind",
            description: "CSS Framework",
        },
        { src: "/assets/img/php.png", title: "PHP", description: "Back-End" },
    ];

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Infinite Scroll Images</h1>
            <div className="flex justify-center">
                <InfiniteScroll images={images} />
            </div>
        </div>
    );
};

export default Welcome;
