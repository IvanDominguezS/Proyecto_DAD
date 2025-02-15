import React, { useState } from 'react';

export const Contador = () => {
    const [contador, setContador] = useState(0);
    const esPar = contador % 2 == 0;

    const sumarContador = () => {
        setContador(contador + 1);
    }

    const restarContador = () => {
        setContador(contador - 1);
    }

    const reiniciarContador = () => {
        setContador(0);
    }

    return (
        <div id="contador" className="responsive-element container">
            <h2>Contador</h2>
            <h3>El número es {contador}.</h3>

            <div className="btn-group">
                <button className="btn btn-outline-success" onClick={sumarContador}>Sumar al contador</button>
                <button className="btn btn-outline-danger" onClick={restarContador}>Restar al contador</button>
                <button className="btn btn-outline-warning" onClick={reiniciarContador}>Reiniciar el contador</button>
            </div>

            <p>
                {
                    esPar ? "Es un número par" : "Es un número impar"
                }
            </p>
        </div>
    )
}