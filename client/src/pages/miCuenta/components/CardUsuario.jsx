import React from "react";

export const CardUsuario = ({usuarioData}) => {

    return (
        <>
            <div className="max-w-sm mx-auto bg-white shadow-md rounded-xl p-6 mt-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{usuarioData?.nombre} {usuarioData.apellido}</h2>
                <p className="text-gray-600 mb-1">
                    <span className="font-semibold">RUT:</span> {usuarioData?.rut}
                </p>
                <p className="text-gray-600">
                    <span className="font-semibold">Email:</span> {usuarioData?.email}
                </p>
                <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Teléfonno:</span> {usuarioData?.telefono}
                </p>
            </div>
        </>
    );
};
