import { useEffect, useState, useCallback } from "react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { IoMdClose } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import { router } from "@inertiajs/react";
import InputError from "@/Components/InputError";

export default function ModalCertif({ onClose, certificate = null }) {
    const [formData, setFormData] = useState({
        title: certificate ? certificate.title : "",
        // Simpan image lama
        certificate_image: certificate ? certificate.certificate_image : null,
        // Gunakan untuk image baru
        newcertificate_image: null,
    });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        if (certificate) {
            setFormData({
                title: certificate.title || "",
                certificate_image: certificate.certificate_image || null,
                newcertificate_image: null,
            });

            if (certificate.certificate_image) {
                setPreviewImages([certificate.certificate_image]);
            }
        }
    }, [certificate]);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setFormData((prev) => ({
                ...prev,
                // Simpan file baru di newcertificate_image
                newcertificate_image: file,
            }));
            setPreviewImages([URL.createObjectURL(file)]);
        }
    }, []);

    const handleRemoveImage = () => {
        setPreviewImages([]);
        setFormData((prev) => ({
            ...prev,
            certificate_image: null,
            newcertificate_image: null,
        }));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"],
        },
    });

    const onSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const submitFormData = new FormData();
            submitFormData.append("title", formData.title.trim());

            // Jika ada file baru, kirim sebagai certificate_image
            if (formData.newcertificate_image instanceof File) {
                submitFormData.append(
                    "certificate_image",
                    formData.newcertificate_image
                );
            }

            if (certificate) {
                submitFormData.append("_method", "PUT");

                await router.post(
                    route("certificate.update", certificate.id),
                    submitFormData,
                    {
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
                    }
                );
            } else {
                await router.post(route("certificate.store"), submitFormData, {
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
        <div className="fixed top-0 left-0 w-full h-screen bg-gray-100/10 backdrop-blur-sm z-50 md:overflow-y-hidden xl:overflow-y-auto transition-all">
            <div className="md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto md:my-10 lg:my-6 xl:my-8 xxl:my-10 bg-gray-1000 p-4 rounded-none md:rounded-lg shadow-lg text-white-100">
                <div className="flex justify-end -mt-1 mb-5">
                    <button
                        onClick={onClose}
                        className="text-3xl hover:text-green-1000"
                    >
                        <IoMdClose />
                    </button>
                </div>

                <div className="h-screen md:h-[80vh] p-2 xl:p-0 overflow-auto">
                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <InputLabel value="Title" />
                            <TextInput
                                value={formData.title}
                                type="text"
                                name="title"
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        title: e.target.value,
                                    }))
                                }
                                className="w-full mt-2"
                            />
                            {errors.title && (
                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            )}
                        </div>

                        <div className="mb-4">
                            <InputLabel value="Upload Certificate" />
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
                                                            SVG, PNG, JPG or GIF
                                                            (MAX. 800x400px)
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                            <input {...getInputProps()} />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-4 mb-4">
                                {previewImages.length > 0 && (
                                    <div className="relative inline-block">
                                        <button
                                            type="button"
                                            className="bg-transparent"
                                            onClick={handleRemoveImage}
                                        >
                                            <img
                                                src={previewImages[0]}
                                                alt="Preview"
                                                className="w-full h-auto rounded transition-opacity"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity">
                                                <FaTrash className="text-2xl text-white-100" />
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
