export const isValidEmail = (email) =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

export const isValidPassword = (password) =>{
    const passwordRegex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
    return passwordRegex.test(password); 
}

export const isValidName = (name) =>{
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]{2,15}$/;
    return nameRegex.test(name)
}

export const isValidRut = (rut) => {
    // Eliminar puntos y guiones
    rut = rut.replace(/[^0-9kK]/g, "");

    // Verificar formato (mínimo 2 caracteres, incluyendo dígito verificador)
    if (rut.length < 2) return false;

    // Separar cuerpo del dígito verificador
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toLowerCase();

    // Validar cuerpo (debe ser numérico)
    if (!/^\d+$/.test(cuerpo)) return false;

    // Calcular dígito verificador
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const resto = suma % 11;
    const dvCalculado = resto === 0 ? "0" : resto === 1 ? "k" : (11 - resto).toString();

    // Comparar dígito verificador calculado con el ingresado
    return dv === dvCalculado;
};
