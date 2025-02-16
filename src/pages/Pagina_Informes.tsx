import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { LeagueChampionsCharts } from '../components/LeagueChampionsCharts';

import championsFile from "../assets/data/200125_LoL_champion_data.csv";

export function dificultadToString(dificultad: string): string {

    switch (Number(dificultad)) {
        case 1: return "Fácil";
        case 2: return "Intermedio";
        case 3: return "Difícil";
        default: return "Desconocido";
    }

}

export const Pagina_Informes = () => {

    const [dificultad, setDificultad] = useState("1");
    const [tipoPersonaje, setTipoPersonaje] = useState("Fighter");
    const [championData, setChampionData] = useState([]);

    // Fetch al archivo CSV.
    useEffect(() => {
        fetch(championsFile)
            .then((response) => response.text()) // Obtiene el CSV como texto.
            .then((csvText) => {

                Papa.parse(csvText, { // Procesa el CSV a un JSON con "papaparse".
                    complete: (result: any) => setChampionData(result.data),
                    header: true, // Usamos la primera fila como encabezado.
                    skipEmptyLines: true,
                });

            })
            .catch((error) => console.error('Error al leer el CSV: ', error));
    }, []);

    const filteredChampionData = championData.filter((element: any) => {
        return element.difficulty === dificultad && element.herotype === tipoPersonaje;
    });

    const saveDocument = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Campeones del LoL", 105, 15, { align: "center" });

        doc.setFontSize(12);
        doc.text("Lista de campeones filtrados por ", 14, 25);
        if(filteredChampionData.length > 0) { //Para poder controlar que haya, como mínimo, 1 campeón seleccionado.
            autoTable(doc, {
                head: [["Nombre", "Dificultad", "Tipo de Héroe", "Recurso"]],
                body: filteredChampionData.map((champ: any) => [
                    `${champ.name}, ${champ.title}`,
                    dificultadToString(champ.difficulty),
                    champ.herotype,
                    champ.resource,
                ]),
                startY: 30,
            });
    
            // Total de campeones y resumen.
            const finalY = (doc as any).lastAutoTable.finalY; // Guardamos la posición después de la tabla
            doc.text("Total de campeones mostrados: " + filteredChampionData.length, 14, finalY + 5);
            doc.text("Estos son todos los campeones " + tipoPersonaje + " del juego con dificultad " + dificultadToString(dificultad), 14, doc.internal.pageSize.height - 10);
        } else { //En caso de que no haya campeones, ponemos un mensaje de error.
            doc.setTextColor("red");
            doc.text("No hay ningún campeón que coincida con la búsqueda realizada.", 14, 35)
        }
        
        doc.save("ChampionsList.pdf");

    }

    return (

        <div className="container mt-3">
            <h2>Informes de personajes de LoL</h2>

            <section>
                <label className="form-label">Dificultad: </label>
                <select className="form-select" value={dificultad} onChange={(e) => setDificultad(e.target.value)}>
                    <option value="1">Fácil</option>
                    <option value="2">Intermedio</option>
                    <option value="3">Difícil</option>
                </select>
            </section>

            <section>
                <label className="form-label">Tipo de campeón: </label>
                <select className="form-select" value={tipoPersonaje} onChange={(e) => setTipoPersonaje(e.target.value)}>
                    <option value="Fighter">Luchador</option>
                    <option value="Mage">Mago</option>
                    <option value="Assasin">Asesino</option>
                    <option value="Tank">Tanque</option>
                    <option value="Support">Soporte</option>
                    <option value="Marksman">Tirador</option>
                </select>
            </section>

            <section className="w-75 mt-3 m-auto">
                <button className="btn btn-primary w-100" onClick={() => saveDocument()}>Imprimir</button>
            </section>
            
            <LeagueChampionsCharts championData={championData}/>
        </div>

    )
}
