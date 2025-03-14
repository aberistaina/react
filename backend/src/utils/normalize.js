export const normalizeRut = (rut) =>{
    const formattedRut = rut.replace(/\s+/g, "").toLowerCase();
    return formattedRut.replace(/[^0-9kK]/g, "");
}

export const normalizeEmail = (email) =>{
    return email.trim().toLowerCase()
}