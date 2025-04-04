import { useState } from "react"
import { fetchServices } from "../../../services/fetchServices"
import { useSnackbar } from "notistack";


export const RecuperarPasswordForm = () => {
    const [ email, setEmail] = useState("")
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async(e) =>{
       try {
        e.preventDefault()
        
        const url = `http://localhost:3001/api/v1/auth/recuperar-password/${email}`
        const requestOptions = {
            method: "POST"};
        const response = await fetch(url, requestOptions)
        const data = await response.json()
        if (data.code === 200) {
            enqueueSnackbar(data.message, { variant: "success" });
        } else {
            enqueueSnackbar(data.message, { variant: "error" });
        }
       } catch (error) {
        console.log(error);
       }

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
                                type="email"
                                name="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Correo Electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Recuperar Contraseña
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </>
  )
}
