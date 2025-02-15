export const Pagina_Home = () => {
  return (
    <div className="container mt-5">
      <section className="text-center mb-4">
        <h1 className="display-4 fw-bold">Bienvenido a mi proyecto final de DAD</h1>
        <p className="lead">
          Este es un proyecto desarrollado con React y TypeScript. Aquí puedes
          encontrar una descripción de las características principales de la
          aplicación.
        </p>
      </section>

      <section className="card shadow-sm p-4 mb-4">
        <h2 className="h4">¿De qué trata este proyecto?</h2>
        <p>
          Este proyecto sirve como última tarea para la asignatura de DAD.
          En este proyecto utilizamos las tecnologías de ReactJS, TypeScript y otras herramientas para aprender a realizar tareas importantes en cualquier desarrollo y
          utilizar ciertas librerías de JavaScript / React.
        </p>
      </section>

      <section className="card shadow-sm p-4">
        <h2 className="h4">Características Principales</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <i className="bi bi-check-circle text-success me-2" /> Uso de Context y useReducer.
          </li>
          <li className="list-group-item">
            <i className="bi bi-check-circle text-success me-2" /> Recogida de datos de APIs externas.
          </li>
          <li className="list-group-item">
            <i className="bi bi-check-circle text-success me-2" /> Uso de Speech Recognition.
          </li>
          <li className="list-group-item">
            <i className="bi bi-check-circle text-success me-2" /> Creación de informes y de gráficos.
          </li>
        </ul>
      </section>
    </div>
  );
};

