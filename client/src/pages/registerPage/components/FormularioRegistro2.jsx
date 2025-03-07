import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import { useForm } from "react-hook-form"

export const FormularioRegistro2 = () => {
    const [mostrarPassword, setMostrarPassword] = useState(false);
    /* const [error, setError] = useState(false); */
    const { register, handleSubmit, reset, formState: {errors}, watch } = useForm()

    const onSubmit = (data) =>{
        console.log(data);
        reset()
    }

    return (
        <>
            <form className="space-y-4 w-2/4 mt-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-center items-center space-x-4">
                    <FaUser />
                    <input
                        type="text"
                        className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                        placeholder="Ingresa tu nombre"
                        {...register("nombre", { required: "El nombre es obligatorio" })}     
                    />
                
                </div>
                {errors.nombre && <span className="text-red-600 ps-9">{errors.nombre.message}</span>}

                <div className="flex justify-center items-center space-x-4">
                    <MdOutlineEmail />
                    <input
                        type="email"
                        className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                        placeholder="Ingresa tu email"
                        {...register("email", { required: "El email es obligatorio" })} 
                            
                        
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
                        className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                        placeholder="Ingresa tu password"
                        {...register("password", { required: "la password es obligatoria" })} 
                            
                        
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
                        className="w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                        placeholder="repite tu password"
                        {...register("repeatPassword", {
                            required: "La repetición de la contraseña es obligatoria",
                            validate: (value) =>
                                value === watch("password") || "Las contraseñas no coinciden"
                        })} 
                            
                    />
                </div>
                {errors.repeatPassword && (
                    <span className="text-red-600 ps-9">{errors.repeatPassword.message}</span>
                )}
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
