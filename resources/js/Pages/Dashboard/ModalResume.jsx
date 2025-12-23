import { useEffect, useState, useCallback } from "react";
import InputLabel from "@/Components/InputLabel";
import { IoMdClose } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { router } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { FaFilePdf } from "react-icons/fa6";

export default function ModalResume({ onClose, resume = null }) {
    const [formData, setFormData] = useState({
        file: resume?.file,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [PreviewResume, setPreviewResume] = useState([]);

    useEffect(() => {
        if (resume) {
            setFormData({
                file: resume.file,
            });
            setPreviewResume(resume.file);
        }
    }, [resume]);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setFormData((prev) => ({
                ...prev,
                file: file,
            }));
            setPreviewResume([URL.createObjectURL(file)]);
        }
    }, []);

    const handleRemoveImage = () => {
        setFormData((prev) => ({
            ...prev,
            file: null,
        }));
        setPreviewResume([]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
        },
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const data = new FormData();
            data.append("file", formData.file);

            if (resume) {
                data.append("_method", "PUT");
                await router.post(route("resume.update", resume.id), data, {
                    forceFormData: true,
                    onSuccess: () => {
                        setProcessing(false);
                        onClose();
                    },
                    onError: (errors) => {
                        setErrors(errors);
                        setProcessing(false);
                    },
                    preserveState: true,
                });
            } else {
                await router.post(route("resume.store"), data, {
                    forceFormData: true,
                    onSuccess: () => {
                        setProcessing(false);
                        onClose();
                    },
                    onError: (errors) => {
                        setErrors(errors);
                        setProcessing(false);
                    },
                    preserveState: true,
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setProcessing(false);
        }
    };
    return (
        <div className="fixed top-0 left-0 w-full h-screen bg-gray-100/10 backdrop-blur-sm z-50 md:overflow-y-hidden xl:overflow-y-auto transition-all animate-[fadeIn_0.3s_ease-out_forwards]">
            <div className="md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto md:my-10 lg:my-6 xl:my-8 xxl:my-10 bg-gray-1000 p-4 rounded-none md:rounded-lg shadow-lg text-white-100 animate-[cardPop_0.5s_0.2s_ease-out_forwards] opacity-0">
                <div className="flex justify-end -mt-1 mb-5">
                    <button
                        onClick={onClose}
                        className="text-3xl hover:text-green-1000"
                    >
                        <IoMdClose />
                    </button>
                </div>

                <div className="h-screen md:h-[80vh] p-2 xl:p-0 overflow-auto animate-[fadeUp_0.5s_0.4s_ease-out_forwards] opacity-0">
                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <InputLabel value="Upload Resume" />
                            <div className="mt-4">
                                <div className="w-full mt-4">
                                    <div {...getRootProps()}>
                                        <label
                                            htmlFor="dropzone-file"
                                            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-1000 ${
                                                isDragActive
                                                    ? "bg-gray-1000 border-green-1000"
                                                    : "bg-gray-2000 border-gray-700"
                                            }`}
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg
                                                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                    />
                                                </svg>
                                                {isDragActive ? (
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold">
                                                            Drop image in here
                                                            .....
                                                        </span>
                                                    </p>
                                                ) : (
                                                    <>
                                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                            <span className="font-semibold">
                                                                Click to upload
                                                            </span>{" "}
                                                            or drag and drop
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            PDF
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                            <input {...getInputProps()} />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <InputError
                                message={errors.file}
                                className="mt-2"
                            />
                            <div className="mt-4 grid grid-cols-3 gap-4 mb-4">
                                {PreviewResume.length > 0 && (
                                    <div className="relative">
                                        <button
                                            type="button"
                                            className="bg-transparent"
                                            onClick={handleRemoveImage}
                                        >
                                            <div className="relative inline-flex items-center justify-center">
                                                <FaFilePdf className="text-9xl text-white-100" />
                                                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-lg opacity-0 hover:opacity-100 transition-all duration-300">
                                                    <FaTrash className="text-2xl text-white-100" />
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="submit"
                                className="font-bold py-2 px-2 rounded-md md:rounded-lg bg-green-1000 text-gray-2000 flex items-center gap-2"
                                disabled={processing}
                            >
                                {processing && (
                                    <svg
                                        className="h-5 w-5 animate-spin text-white-100"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                )}
                                {processing ? "Processing..." : "Submit"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
