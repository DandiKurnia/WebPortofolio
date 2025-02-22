import Navbar from "@/Components/Navbar";
export default function LandingLayout({ children }) {
    return (
        <div>
            <div className="m:pt-0 bg-gray-100 dark:bg-gray-1000">
                <div className="max-w-7xl mx-auto px-8 md:px-12 sm:px-6 flex flex-col">
                    {/* Navbar */}
                    <Navbar />
                    {/* End Navbar */}
                    <main>{children}</main>
                </div>
            </div>
        </div>
    );
}
