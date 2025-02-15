import { Pie, Doughnut, Radar, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins, Title, RadialLinearScale, PointElement, LineElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { dificultadToString } from '../pages/Pagina_Informes';
import '../css/charts.css';

export const LeagueChampionsCharts = ({ championData }: { championData: any[] }) => {
    ChartJS.register(ArcElement, Tooltip, Legend, Title, plugins, RadialLinearScale, PointElement, LineElement, CategoryScale, BarElement, LinearScale); //Es necesario "registrar" los componentes para que funcionen.

    function getChampionsByRangeType() {
        var championsByRangeType: any[] = [];

        championData.forEach((champion) => {
            const existing = championsByRangeType.find(item => item.rangetype === champion.rangetype); // Revisamos tiene el mismo tipo de rango que otro personaje.
            if (existing) {
                existing.count += 1; // En caso de que sí, aumenta un recuento.
            } else {
                championsByRangeType.push({ //En caso de que no, crea un nuevo registro, inicializando a 1.
                    rangetype: champion.rangetype,
                    count: 1,
                });
            }
        });

        const labels = championsByRangeType.map(item => item.rangetype); // Recogemos los nombres de los tipos de rango.
        const data = championsByRangeType.map(item => item.count); // Recogemos los datos del recuento.

        const chartData = {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [ //Colores de las zonas.
                    '#FF8C00', '#4CAF50'
                ],
            }],
        };

        return chartData;
    }

    function getChampionsByDifficulty() {
        var championsByDifficulty: any[] = [];

        championData.forEach((champion) => {
            const existing = championsByDifficulty.find(item => item.difficulty === champion.difficulty);
            if (existing) {
                existing.count += 1;
            } else {
                championsByDifficulty.push({
                    difficulty: champion.difficulty,
                    count: 1,
                });
            }
        });

        const labels = championsByDifficulty.map(item => dificultadToString(item.difficulty));
        const data = championsByDifficulty.map(item => item.count);

        const chartData = {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [
                    '#FF5733'
                ],
            }],
        };

        return chartData;
    }

    function getChampionsByResource() {
        var championsByResource: any[] = [];

        championData.forEach((champion) => {
            const existing = championsByResource.find(item => item.resource === champion.resource);
            if (existing) {
                existing.count += 1;
            } else {
                championsByResource.push({
                    resource: champion.resource,
                    count: 1,
                });
            }
        });

        const labels = championsByResource.map(item => item.resource);
        const data = championsByResource.map(item => item.count);

        const chartData = {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [ //Colores de las zonas.
                    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF9F33', '#33FFF0', '#7F33FF', '#FF33F6', '#33FFDA', '#F6FF33', '#F033FF', '#FF3333', '#33FF98', '#FF5733', '#33F4FF'
                ],
            }],
        };

        return chartData;
    }

    function getChampionsByHeroType() {
        var championsByHeroType: any[] = [];

        championData.forEach((champion) => {
            const existing = championsByHeroType.find(item => item.herotype === champion.herotype);
            if (existing) {
                existing.count += 1;
            } else {
                championsByHeroType.push({
                    herotype: champion.herotype,
                    count: 1,
                });
            }
        });

        const labels = championsByHeroType.map(item => item.herotype);
        const data = championsByHeroType.map(item => item.count);

        const chartData = {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [ //Colores de las zonas.
                    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF9F33', '#33FFF0', '#7F33FF', '#FF33F6', '#33FFDA', '#F6FF33', '#F033FF', '#FF3333', '#33FF98', '#FF5733', '#33F4FF'
                ],
            }],
        };

        return chartData;
    }

    function getChampionsByAltType() {
        var championsByHeroType: any[] = [];

        championData.forEach((champion) => {
            const existing = championsByHeroType.find(item => item.alttype === champion.alttype);
            if (existing) {
                existing.count += 1;
            } else {
                championsByHeroType.push({
                    alttype: champion.alttype,
                    count: 1,
                });
            }
        });

        const labels = championsByHeroType.map(item => item.alttype == '' ? 'None' : item.alttype); // Es posible que no tenga un tipo secundario. Por tanto, pondrá "None".
        const data = championsByHeroType.map(item => item.count);

        const chartData = {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: [ //Colores de las zonas.
                    '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF9F33', '#33FFF0', '#7F33FF', '#FF33F6', '#33FFDA', '#F6FF33', '#F033FF', '#FF3333', '#33FF98', '#FF5733', '#33F4FF'
                ],
            }],
        };

        return chartData;
    }

    const doughnutOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
        },
    };

    const pieOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'left' as const,
            },
        },
    };

    const radarOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
        },
    };

    const horizontalBarOptions = {
        indexAxis: 'y' as const,
        elements: {
            bar: {
                borderWidth: 2,
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
        },
    };
    
    const verticalBarOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
        },
    };

    return (
        <div className="mt-4 mb-4">
            <h3 className="text-center">Dashboard de datos de personajes</h3>

            <div id="champion-charts">
                <section className="card shadow-sm">
                    <h4 className="card-header p-3">Gráficas de personajes por su rango</h4>
                    <Doughnut className="p-1" data={getChampionsByRangeType()} options={doughnutOptions}/>
                </section>
                
                <section className="card shadow-sm">
                    <h4 className="card-header p-3">Gráfica de número de personajes por su uso de energía</h4>
                    <Pie className="p-1" data={getChampionsByResource()} options={pieOptions}/>
                </section>
                
                <section className="card shadow-sm">
                    <h4 className="card-header p-3">Gráfica de número de personajes por posición principal</h4>
                    <Radar className="p-1" data={getChampionsByDifficulty()} options={radarOptions}/>
                </section>
                
                <section className="card shadow-sm">
                    <h4 className="card-header p-3">Gráfica de número de personajes por posición principal</h4>
                    <Bar className="p-1" data={getChampionsByHeroType()} options={horizontalBarOptions}/>
                </section>
                
                <section className="card shadow-sm">
                    <h4 className="card-header p-3">Gráfica de número de personajes por posición secundaria</h4>
                    <Bar className="p-1" data={getChampionsByAltType()} options={verticalBarOptions}/>
                </section>
            </div>

        </div>
    )
}
