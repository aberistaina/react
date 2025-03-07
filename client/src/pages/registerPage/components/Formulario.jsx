import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import { useForm } from "react-hook-form"
import { validateEmail } from "../../../validators";

export const Formulario = () => {

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [mostrarRepeatPassword, setMostrarRepeatPassword] = useState(false);
    const { register, handleSubmit, reset, formState: {errors}, watch } = useForm()


    const handleClickPassword = () => {
        setMostrarPassword(!mostrarPassword);
    };

    const handleClickRepeatPassword = () => {
        setMostrarRepeatPassword(!mostrarRepeatPassword);
    };

    const onSubmit = (data) =>{
        console.log(data);
        reset()
    }

    return (
        <>
            <form className="mt-5 space-y-5" onSubmit={handleSubmit(onSubmit)} >
                <div className="flex justify-center items-center space-x-4">
                    <FaUser />
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        placeholder="Ingresa tu nombre"
                        className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                        {...register("nombre", { required: "El nombre es obligatorio" })} 
                    />
                </div>
                {errors.nombre && (
                    <span className="text-red-600 ps-9">{errors.nombre.message}</span>
                )}
                

                <div className="flex justify-center items-center space-x-4">
                    <MdOutlineEmail />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Ingresa tu email"
                        className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                        {...register("email", {
                            validate: (value) =>
                                validateEmail(value) || "El formato del email es incorrecto"
                        })} 
                    />
                </div>
                {errors.email && (
                    <span className="text-red-600 ps-9">{errors.email.message}</span>
                )}

                <div className="flex justify-center items-center space-x-4">
                    {mostrarPassword ? (
                        <IoEye onClick={handleClickPassword} />
                    ) : (
                        <IoMdEyeOff onClick={handleClickPassword} />
                    )}
                    <input
                        type={mostrarPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        placeholder="Ingresa tu contraseña"
                        className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                        {...register("password", { required: "La password es obligatoria" })} 
                    />
                </div>

                <div className="flex justify-center items-center space-x-4">
                    {mostrarRepeatPassword ? (
                        <IoEye onClick={handleClickRepeatPassword} />
                    ) : (
                        <IoMdEyeOff onClick={handleClickRepeatPassword} />
                    )}
                    <input
                        type={mostrarRepeatPassword ? "text" : "password"}
                        id="repeatPassword"
                        name="repeatPassword"
                        placeholder="Repite tu contraseña"
                        className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                        {...register("repeatPassword", {
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
