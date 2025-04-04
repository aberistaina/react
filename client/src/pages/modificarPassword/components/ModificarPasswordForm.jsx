import { Link, useSearchParams } from "react-router-dom"
import { useState } from "react";
import { useSnackbar } from "notistack"
import { fetchServices } from "../../../services/fetchServices";

export const ModificarPasswordForm = () => {
    const [params] = useSearchParams();
    const { enqueueSnackbar } = useSnackbar()
    const token = params.get("token")
    const email = params.get("email")

    const [ contraseñas, setContraseñas] = useState({
        contraseña: "",
        repeatContraseña: ""
    })

    const handleSubmit = async(e) =>{
        e.preventDefault()
        
        if(contraseñas.contraseña !== contraseñas.repeatContraseña){
            enqueueSnackbar("Las contraseñas no coinciden", { variant: "warning"})
            return
        }
        
        const url = "http://localhost:3001/api/v1/auth/modificar-password"
        const method = "POST"
        
        const body ={
            email,
            password: contraseñas.contraseña
        }

        const data = await fetchServices(url, method, token, body)

        if(data.code === 200){
            enqueueSnackbar(data.message, { variant: "success"})
        }else if(data.code === 400){
            enqueueSnackbar(data.message, { variant: "warning"})
        }else{
            enqueueSnackbar(data.message, { variant: "error"})
        }
    }

    const handleChange = (e) =>{
        const { name, value } = e.target
        setContraseñas({...contraseñas, [name]: value})
    }
    

  return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        Modificar Contraseña
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <input
                                type="password"
                                name="contraseña"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Ingrese su contraseña"
                                value={contraseñas.contraseña}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                name="repeatContraseña"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Repita su contraseña"
                                value={contraseñas.repeatContraseña}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Cambiar Contrañseña
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </>
  )
}
