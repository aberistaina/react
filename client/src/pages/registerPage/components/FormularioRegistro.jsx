import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import { validateUser } from "../../../services/validators";
import { fetchServices } from "../../../services/fetchServices";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

export const FormularioRegistro = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        nombre: false,
        apellido: false,
        rut: false,
        email: false,
        password: false,
        repeatPassword: false,
    });

    const [userForm, serUserForm] = useState({
        nombre: "",
        apellido: "",
        rut: "",
        email: "",
        telefono: "",
        password: "",
        repeatPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        serUserForm({ ...userForm, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true)
        const validateInputs = validateUser(userForm);
        
        if (validateInputs.nombre || validateInputs.apellido || validateInputs.email || validateInputs.rut || validateInputs.password || validateInputs.repeatPassword) {
            setErrors(validateInputs);
            setIsLoading(false)
            return
        } else {
            const url = "http://localhost:3001/api/v1/auth";
            const method = "POST";
            const body = userForm;
            const data = await fetchServices(url, method, body);
            console.log(data);

            if (data.code === 201) {
                enqueueSnackbar(data.message, { variant: "success" });
                setTimeout(function () {
                    navigate("/login");
                }, 1000);
            } else {
                enqueueSnackbar(data.message, { variant: "error"});
                setIsLoading(false)
            }
        }
    };

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
                <span
                    className={`ms-9 text-red-600 font-semibold ${
                        errors.nombre ? "block" : "hidden"
                    }`}
                >
                    El nombre debe contener mínimo 2 caracteres
                </span>

                <div className="flex justify-center items-center space-x-4">
                    <FaUser />
                    <input
                        type="text"
                        id="apellido"
                        name="apellido"
                        value={userForm.apellido}
                        placeholder="Ingresa tu Apellido"
                        className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                        onChange={handleChange}
                    />
                </div>
                <span
                    className={`ms-9 text-red-600 font-semibold ${
                        errors.apellido ? "block" : "hidden"
                    }`}
                >
                    El apellido debe contener mínimo 2 caracteres
                </span>

                <div className="flex justify-center items-center space-x-4">
                    <FaUser />
                    <input
                        type="text"
                        id="rut"
                        name="rut"
                        value={userForm.rut}
                        placeholder="Ingresa tu RUT"
                        className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                        onChange={handleChange}
                    />
                </div>
                <span
                    className={`ms-9 text-red-600 font-semibold ${
                        errors.rut ? "block" : "hidden"
                    }`}
                >
                    El RUT es inválido
                </span>

                <div className="flex justify-center items-center space-x-4">
                    <FaUser />
                    <input
                        type="text"
                        id="telefono"
                        name="telefono"
                        value={userForm.telefono}
                        placeholder="Ingresa tu telefono"
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
                <span
                    className={`ms-9 text-red-600 font-semibold ${
                        errors.email ? "block" : "hidden"
                    }`}
                >
                    El formato del email es incorrecto
                </span>

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
                <span
                    className={`ms-9 text-red-600 font-semibold ${
                        errors.password ? "block" : "hidden"
                    }`}
                >
                    La contraseña debe tener como mínimo 8 caracteres, una
                    mayuscula, un número y un caracter especial
                </span>

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
                <span
                    className={`ms-9 text-red-600 font-semibold ${
                        errors.repeatPassword ? "block" : "hidden"
                    }`}
                >
                    Las Contraseñas No Coinciden
                </span>
                <div className="flex justify-center w-full">
                    <button
                        type="submit"
                        className="flex items-center px-4 py-2 text-slate-200 font-semibold bg-green-600 rounded-lg hover:bg-green-900 hover:text-white transition-all duration-300"> {/* Desactivar el boton cuando is loading is true*/}
                        {isLoading ? (
                            <PulseLoader color="#ffffff" size={10} />
                        ) : (
                            <>
                                <IoPersonAdd className="mx-2" />
                                <span>Registrarse</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </>
    );
};
