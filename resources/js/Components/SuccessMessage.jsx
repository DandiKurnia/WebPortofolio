import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoInformationCircle } from "react-icons/io5";

export default function SuccessMessage({ message, type = "success" }) {
    const [show, setShow] = useState(true);

    if (!message || !show) return null;

    const textColor =
        {
            success: "text-green-500", // Hijau
            edit: "text-yellow-500", // Kuning
            delete: "text-red-500", // Merah
        }[type] || "bg-gray-500";

    return (
        <div
            className={`${textColor} py-2 px-4 rounded mb-4 flex justify-between items-center bg-gray-2000 font-bold`}
        >
            <div className="flex items-center gap-2">
                <IoInformationCircle />
                <span>{message}</span>
            </div>
            <button onClick={() => setShow(false)} className="ml-4 text-white">
                <IoMdClose className="hover:text-gray-50 text-xl" />
            </button>
        </div>
    );
}
