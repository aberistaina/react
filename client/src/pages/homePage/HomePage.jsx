import { useState, useEffect } from "react"
import { CardJuego } from "./components/CardJuego"

export const HomePage = () => {

    const [juegos, setJuegos] = useState([])

    const getJuegos = async() =>{
        try {
            const response = await fetch("http://localhost:3000/api/v1/juegos")
            const data = await response.json()
            console.log(data);
            setJuegos(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getJuegos()
    }, [])
    


    return (
        <>
            <div className="flex space-x-6 mt-5">
                {
                    juegos.map((juego) => (
                        <CardJuego key={juego.id} juego={juego}/>
                    ))
                }
            </div>
        </>
    )
}
