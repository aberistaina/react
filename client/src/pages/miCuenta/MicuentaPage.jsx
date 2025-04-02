import { useEffect, useState } from "react"
import { fetchServices } from "../../services/fetchServices"
import { CardUsuario } from "./components/CardUsuario"

export const MicuentaPage = () => {
    const { id } = JSON.parse(localStorage.getItem("usuario"))
    const token = localStorage.getItem("token")
    const [usuarioData, setUsuarioData] = useState("")


    useEffect(() => {
        const getUserData = async() =>{
            try {
                const url = `http://localhost:3001/api/v1/usuarios/${id}?token=${token}`
                const method = "GET"
                const data = await fetchServices(url, method, token)
                setUsuarioData(data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getUserData()
        
        
    }, [])
    
    
return (
    <>
        <CardUsuario usuarioData={usuarioData} />

    </>
)
}
