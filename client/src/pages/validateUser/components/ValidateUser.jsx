import { useSearchParams, useParams } from "react-router-dom";
import { useSnackbar } from "notistack"

export const ValidateUser = () => {
    const { email } = useParams();
    const [params] = useSearchParams();
    const token = params.get("token")
    const { enqueueSnackbar } = useSnackbar()

    const validarUsuario = async() =>{

        const url = `http://localhost:3001/api/v1/usuarios/validar-usuario/${email}?token=${token}`
        
        const requestOptions = {
            method: "GET",
          };
        try {
            const response = await fetch(url, requestOptions)
            const data = await response.json()

            console.log(data);

            if(data.code === 200){
                enqueueSnackbar(data.message, { variant: "success"})
            }else{
                enqueueSnackbar(data.message, {variant: "error"})
            }

        } catch (error) {
            console.log(error);
        }

    }
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <button
                    type="submit"
                    className="bg-green-700 hover:bg-green-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-96 h-32"
                    onClick={validarUsuario}
                >
                    Validar Usuario
                </button>
            </div>
        </>
    )
}
