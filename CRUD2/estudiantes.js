import fs from 'fs';

const FILE_PATH = './data.json';

const leerEstudiantes = () => {
    if (!fs.existsSync(FILE_PATH)) return [];
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    return JSON.parse(data);
};

const guardarEstudiantes = (estudiantes) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(estudiantes, null, 2), 'utf8');
};

export const agregarEstudiante = (nuevoEstudiante) => {
    const estudiantes = leerEstudiantes();
    estudiantes.push(nuevoEstudiante);
    guardarEstudiantes(estudiantes);
};

export const obtenerEstudiantes = () => leerEstudiantes();

export const buscarEstudiante = (id) => {
    return leerEstudiantes().find(est => est.id === id || est.nombre.toLowerCase() === id.toLowerCase());
};

export const actualizarEstudiante = (id, datosActualizados) => {
    let estudiantes = leerEstudiantes();
    estudiantes = estudiantes.map(est => est.id === id ? { ...est, ...datosActualizados } : est);
    guardarEstudiantes(estudiantes);
};

export const eliminarEstudiante = (id) => {
    let estudiantes = leerEstudiantes();
    estudiantes = estudiantes.filter(est => est.id !== id);
    guardarEstudiantes(estudiantes);
};