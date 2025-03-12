import { useState, useEffect } from "react";
import { BiGame } from "react-icons/bi";
import { FaGamepad, FaFileImage } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { LuPartyPopper } from "react-icons/lu";
import { InputConsolas } from "./InputConsolas";

export const CreateGame = () => {

    const [juegoForm, setJuegoForm] = useState({
        nombre: "",
        consola:"",
        year: "",
        categoria: "",
        imagen:"",
        descripcion: ""
    })

    
    const [categorias, setCategorias] = useState([])

    const getCategorias = async() =>{
        try {
            const response = await fetch("http://localhost:3001/api/v1/categorias")
            const data = await response.json()
            setCategorias(data.data)
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getCategorias()
    }, [])
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setJuegoForm({ ...juegoForm, [name]: value });
        console.log(juegoForm);
    };

    return (
        <>
            <div className="flex justify-center">
                <h1>Formulario Para Registrar Un Nuevo Juego</h1>
                <form className="space-y-4 w-2/4 mt-8">
                    <div className="flex justify-center items-center space-x-4">
                        <BiGame />
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={juegoForm.nombre}
                            placeholder="Ingresa el nombre del juego"
                            className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                            onChange={handleChange}
                        />
                    </div>

                    <InputConsolas />

                    <div className="flex justify-center items-center space-x-4">
                        <FaGamepad />
                        <select className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300" name="categoria" id="categoria">
                            <option value="">Seleccione Una Categoría</option>
                            {
                                categorias.map((categoria) =>(
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nombre}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="flex justify-center items-center space-x-4">
                        <LuPartyPopper />
                        <input
                            type="text"
                            id="year"
                            name="year"
                            value={juegoForm.year}
                            placeholder="Ingresa el Año de Lanzamiento"
                            className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-center items-center space-x-4">
                        <FaFileImage />
                        <input
                            type="text"
                            id="imagen"
                            name="imagen"
                            value={juegoForm.imagen}
                            placeholder="Ingresa La URL de la imagen"
                            className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-center items-center space-x-4">
                        <BsPencilSquare />
                        <textarea
                            type="text"
                            id="descripcion"
                            name="descripcion"
                            value={juegoForm.descripcion}
                            placeholder="Ingresa una breve descripcion"
                            className="flex w-full px-4 py-2 border border-gray-400 rounded-lg shadow-sm focus:ring-indigo-300"
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};


