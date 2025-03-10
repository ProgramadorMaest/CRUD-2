import { obtenerEstudiantes } from './estudiantes.js';

export const listarEstudiantes = () => {
    return obtenerEstudiantes().map(({ nombre, area }) => ({ nombre, area }));
};

export const promedioPorEstudiante = () => {
    return obtenerEstudiantes().map(({ nombre, area, calificaciones }) => {
        const calificacionesArray = Object.values(calificaciones);
        const promedio = calificacionesArray.reduce((a, b) => a + b, 0) / calificacionesArray.length;
        return { nombre, promedio, area };
    });
};

export const filtrarPorPromedio = (umbral) => {
    return promedioPorEstudiante().filter(est => est.promedio > umbral);
};

export const estudiantesPorMateria = (materia) => {
    const estudiantes = obtenerEstudiantes();
    return {
        aprobados: estudiantes.filter(est => est.calificaciones[materia] >= 60),
        reprobados: estudiantes.filter(est => est.calificaciones[materia] < 60)
    };
};

export const promedioGeneralGrupo = () => {
    const estudiantes = promedioPorEstudiante();
    const promedio = estudiantes.reduce((acc, est) => acc + est.promedio, 0) / estudiantes.length;
    return { promedioGeneral: promedio };
};

export const rankingEstudiantes = () => {
    return promedioPorEstudiante().sort((a, b) => b.promedio - a.promedio);
};

export const distribucionPorArea = () => {
    return obtenerEstudiantes().reduce((acc, { area }) => {
        acc[area] = (acc[area] || 0) + 1;
        return acc;
    }, {});
};

export const reporteRendimiento = () => {
    const estudiantes = promedioPorEstudiante();
    return {
        totalEstudiantes: estudiantes.length,
        promedioGeneralGrupo: promedioGeneralGrupo().promedioGeneral,
        mejoresEstudiantes: estudiantes.filter(est => est.promedio > 85),
        peoresEstudiantes: estudiantes.filter(est => est.promedio < 60)
    };
};
