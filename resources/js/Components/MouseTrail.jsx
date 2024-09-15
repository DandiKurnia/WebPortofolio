import React, { useState, useEffect } from "react";

const MouseTrail = () => {
    const [trail, setTrail] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;

            // Update trail state with the new position
            setTrail((prevTrail) => [
                ...prevTrail,
                { x: clientX, y: clientY, id: Math.random() },
            ]);

            // Limit trail length
            if (trail.length > 10) {
                setTrail(trail.slice(1));
            }
        };

        // Add mouse move listener
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [trail]);

    return (
        <div>
            {trail.map((dot) => (
                <div
                    key={dot.id}
                    className="trail-dot"
                    style={{ left: dot.x + "px", top: dot.y + "px" }}
                ></div>
            ))}
        </div>
    );
};

export default MouseTrail;
