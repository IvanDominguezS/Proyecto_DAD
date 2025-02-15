import { useState } from "react";

export const ListaTareas = () => {
    const [tarea, setTarea] = useState("");
    const [tareas, setTareas] = useState<string[]>([]);

    const eliminarTarea = (index: number) => {
        const nuevasTareas = tareas.filter((_, i) => index != i); //"_" permite especificar que el primer parámetro no lo necesitamos.
        setTareas(nuevasTareas);
    }

    const agregarTarea = () => {
        const nuevasTareas = [...tareas,tarea];
        setTareas(nuevasTareas.sort());
        setTarea("");
    };

    return (
        <div id="lista-tareas" className="responsive-element container">
            <h2>Lista de tareas ordenadas</h2>

            <section id="campo-tareas" className="input-group">
                <input
                    type="text"
                    className="form-control"
                    value={tarea}
                    onChange={(e) => setTarea(e.target.value)}
                    placeholder="Escribe la nueva tarea"
                />
                <button className="btn btn-outline-primary" onClick={agregarTarea}>Añadir Tarea</button>
            </section>

            <section>
                <ul className="list-group">
                    {
                        tareas.map((t, index) => (
                            <li className="list-group-item" key={index}>
                                {t}
                                <button className="btn btn-outline-danger" onClick={() => eliminarTarea(index)}>Eliminar</button>
                            </li>
                        ))
                    }
                </ul>
            </section>
        </div>
    );
}