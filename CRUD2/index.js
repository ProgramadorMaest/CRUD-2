import readline from 'readline';
import { agregarEstudiante, obtenerEstudiantes, eliminarEstudiante, buscarEstudiante } from './estudiantes.js';
import { listarEstudiantes, promedioPorEstudiante, filtrarPorPromedio, estudiantesPorMateria, promedioGeneralGrupo, rankingEstudiantes, reporteRendimiento } from './modules-reportes.js';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const menu = () => {
    console.log('\n1. Agregar estudiante');
    console.log('2. Listar estudiantes');
    console.log('3. Mostrar promedios');
    console.log('4. Buscar estudiante');
    console.log('5. Filtrar por promedio');
    console.log('6. Aprobados/Reprobados por materia');
    console.log('7. Promedio general del grupo');
    console.log('8. Ranking de estudiantes');
    console.log('9. Reporte de rendimiento');
    console.log('10. Eliminar estudiante');
    console.log('11. Salir');
    rl.question('\nElige una opción: ', (opcion) => {
        switch (opcion) {
            case '1':
                rl.question('Nombre: ', (nombre) => {
                    rl.question('Área: ', (area) => {
                        rl.question('¿Cuántas materias tiene el estudiante? ', (numMaterias) => {
                            const calificaciones = {};
                            let materiasCount = 0;

                            const askMateria = () => {
                                if (materiasCount < Number(numMaterias)) {
                                    rl.question(`Ingrese la calificación para la materia ${materiasCount + 1}: `, (calificacion) => {
                                        rl.question(`Ingrese el nombre de la materia ${materiasCount + 1}: `, (materia) => {
                                            calificaciones[materia] = Number(calificacion);
                                            materiasCount++;
                                            askMateria();
                                        });
                                    });
                                } else {
                                    agregarEstudiante({ id: Date.now(), nombre, area, calificaciones });
                                    console.log('Estudiante agregado!');
                                    menu();
                                }
                            };
                            askMateria();
                        });
                    });
                });
                break;
            case '2':
                console.log(listarEstudiantes());
                menu();
                break;
            case '3':
                console.log(promedioPorEstudiante());
                menu();
                break;
            case '4':
                rl.question('Ingrese ID o nombre: ', (id) => {
                    console.log(buscarEstudiante(id));
                    menu();
                });
                break;
            case '5':
                rl.question('Ingrese umbral: ', (umbral) => {
                    console.log(filtrarPorPromedio(Number(umbral)));
                    menu();
                });
                break;
            case '6':
                rl.question('Ingrese materia: ', (materia) => {
                    console.log(estudiantesPorMateria(materia));
                    menu();
                });
                break;
            case '7':
                console.log(promedioGeneralGrupo());
                menu();
                break;
            case '8':
                console.log(rankingEstudiantes());
                menu();
                break;
            case '9':
                console.log(reporteRendimiento());
                menu();
                break;
            case '10':
                rl.question('ID del estudiante a eliminar: ', (id) => {
                    eliminarEstudiante(Number(id));
                    console.log('Estudiante eliminado!');
                    menu();
                });
                break;
            case '11':
                rl.close();
                break;
            default:
                console.log('Opción inválida.');
                menu();
        }
    });
};

menu();