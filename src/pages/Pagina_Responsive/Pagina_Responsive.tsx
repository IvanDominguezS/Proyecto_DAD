import React, { useState } from 'react';
import { Contador } from './Contador';
import { ListaTareas } from './ListaTareas';
import { Trivia } from './Trivia';

import '../../css/responsive.css';

export const Pagina_Responsive = () => {
  const [activeElements, setActiveElements] = useState<boolean[]>([false, false, false]);
  const responsiveElements = [
    <Contador />,
    <ListaTareas />,
    <Trivia />,
  ];

  const toggleActiveElement = (index: number) => {
    const newActiveElements = [...activeElements];
    newActiveElements[index] = !newActiveElements[index];

    setActiveElements(newActiveElements);
  }

  return (
    <div className="container mt-3">
      <h2 className="text-center">Elementos responsive:</h2>

      <section id="buttons" className="btn-group" role="group">
        {
          responsiveElements.map((_, index) => (
            <button key={index} className="btn btn-outline-primary" onClick={() => toggleActiveElement(index)}>
              { activeElements[index] ? "Desactivar componente " + (index + 1) : "Activar componente " + (index + 1) }
            </button>
          ))
        }
      </section>

      <section id="responsive-elements">
        {
          //Usamos "React.Fragment" para llamar al elemento y poder darle una key.
          responsiveElements.map((element, index) => (
            activeElements[index] && <React.Fragment key={index}>{element}</React.Fragment>
          ))
        }
      </section>
    </div>

  )
}
