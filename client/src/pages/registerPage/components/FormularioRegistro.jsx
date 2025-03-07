import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";

export const FormularioRegistro = () => {
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [ error, setError ] = useState(false)

    const [userForm, serUserForm] = useState({
        nombre: "",
        email: "",
        password: "",
        repeatPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        serUserForm({ ...userForm, [name]: value });
    };

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(userForm.password !== userForm.repeatPassword){
            setError(true)
        }else{
            setError(false)
            console.log(userForm);
        }
        
    }

    return (
        <>
            <form className="space-y-4 w-2/4 mt-8" onSubmit={handleSubmit}>
                <div className="flex justify-center items-center space-x-4">
                    <FaUser />
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={userForm.nombre}
                        placeholder="Ingresa tu nombre"
                        className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex justify-center items-center space-x-4">
                    <MdOutlineEmail />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userForm.email}
                        placeholder="Ingresa tu email"
                        className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </div>

                <div className="flex justify-center items-center space-x-4">
                    <div
                        className="cursor-pointer"
                        onClick={() => setMostrarPassword(!mostrarPassword)}
                    >
                        {mostrarPassword ? <IoEye /> : <IoMdEyeOff />}
                    </div>
                    <input
                        type={mostrarPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={userForm.password}
                        placeholder="Ingresa tu password"
                        className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                        onChange={handleChange}
                    />
                </div>

                <div className="flex justify-center items-center space-x-4">
                    <div
                        className="cursor-pointer"
                        onClick={() => setMostrarPassword(!mostrarPassword)}
                    >
                        {mostrarPassword ? <IoEye /> : <IoMdEyeOff />}
                    </div>
                    <input
                        type={mostrarPassword ? "text" : "password"}
                        id="repeatPassword"
                        name="repeatPassword"
                        value={userForm.repeatPassword}
                        placeholder="Ingresa nuevamente tu password"
                        className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                        onChange={handleChange}
                    />  
                </div>
                <span className={`ms-9 text-red-600 font-semibold ${error ? "block" : "hidden"}`}>Las Contraseñas No Coinciden</span>
                <div className="flex justify-center w-full">
                    <button
                        type="submit"
                        className="flex items-center px-4 py-2 text-slate-200 font-semibold bg-green-600 rounded-lg hover:bg-green-900 hover:text-white transition-all duration-300"
                    >
                        <IoPersonAdd className="mx-2" /> Registrarse
                    </button>
                </div>
            </form>
        </>
    );
};
