import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ auth, certificate, project }) {
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <AdminLayout user={auth.user}>
            {(showSidebar) => (
                <>
                    <Head title="Dashboard" />
                    <div className="grid grid-rows-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-4 lg:gap-6 z-30">
                        <div className="bg-gray-2000 p-6 rounded-lg">
                            <h1 className="lg:text-xl xl:text-3xl font-bold text-white-100">
                                MY CERTIFICATE
                            </h1>
                            <h1 className="lg:text-xl xl:text-3xl font-bold text-gray-400 mt-4">
                                {certificate}
                            </h1>
                        </div>
                        <div className="bg-gray-2000 p-6 rounded-lg">
                            <h1 className="lg:text-xl xl:text-3xl font-bold text-white-100">
                                MY PROJECT
                            </h1>
                            <h1 className="lg:text-xl xl:text-3xl font-bold text-gray-400 mt-4">
                                {project}
                            </h1>
                        </div>
                    </div>
                </>
            )}
        </AdminLayout>
    );
}
