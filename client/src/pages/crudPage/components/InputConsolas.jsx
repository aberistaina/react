import { useState, useEffect } from "react";
import { FaGamepad } from "react-icons/fa";

export const InputConsolas = ({ consola, setJuegoForm}) => {

    const [consolas, setConsolas] = useState([])



    const getConsolas = async() =>{
        try {
            const response = await fetch("http://localhost:3001/api/v1/consolas")
            const data = await response.json()
            setConsolas(data.data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        const { value } = e.target;
        setJuegoForm((prevState) => ({...prevState, consola: value}));
    };


    useEffect(() => {
        getConsolas()
    }, [])

    return (
        <>
            <div className="flex justify-center items-center space-x-4">
                <FaGamepad />
                <select
                    className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                    name="categoria"
                    id="categoria"
                    value={consola}
                    onChange={handleChange}
                >
                    <option value="">Seleccione Una Consola</option>
                    {consolas.map((consola) => (
                        <option key={consola.id} value={consola.id}>
                            {consola.nombre}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};
