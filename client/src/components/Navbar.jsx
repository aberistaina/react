import { NavLink } from "react-router-dom";
import { IoIosHome } from "react-icons/io";
import { GoPersonFill } from "react-icons/go";

export const Navbar = () => {
    
    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <img
                            className="h-8 w-auto"
                            src="https://i.bstr.es/drivingeco/2025/01/Deepseek-r1-logo-880x495.webp"
                            alt="Logo"
                        />
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        <h4 className="cursor-pointer flex items-center font-bold text-lg text-black transition-all duration-300 hover:text-slate-500 hover:translate-x-1">
                            <NavLink to={"/"} className="flex items-center">
                                <IoIosHome className="mr-2" /> Home
                            </NavLink>
                        </h4>

                        <h4 className="cursor-pointer flex items-center font-bold text-lg text-black transition-all duration-300 hover:text-slate-500 hover:translate-x-1">
                            <NavLink to={"/login"} className="flex items-center">
                                <GoPersonFill className="mr-2" /> Login
                            </NavLink>
                        </h4>
                    </div>
                </div>
            </div>
        </nav>
    );
};
