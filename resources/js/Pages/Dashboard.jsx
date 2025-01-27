import NavbarDashboard from "@/Components/NavbarDashboard";
import Sidebar from "@/Components/Sidebar";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ auth, certificate, project }) {
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <
            // user={auth.user}
            // header={
            //     <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            //         Dashboard
            //     </h2>
            // }
        >
            <Head title="Dashboard" />
            <div className="flex bg-gray-1000 overflow-y-hidden">
                {/* SIDEBAR */}
                <Sidebar showSidebar={showSidebar}> /</Sidebar>
                <div className="flex-1">
                    <NavbarDashboard
                        setShowSidebar={setShowSidebar}
                        showSidebar={showSidebar}
                        userName={auth.user.name}
                    />
                    {/* End Navbar */}
                    <div
                        className={`transition-all duration-300 ease-in-out overflow-y-hidden ${
                            showSidebar
                                ? "ml-0 md:ml-64 backdrop-blur-sm"
                                : "ml-0 md:ml-20"
                        } mt-20 px-6 pt-6 bg-gray-1000 min-h-screen text-white`}
                    >
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
                    </div>
                </div>
            </div>
        </>
    );
}
