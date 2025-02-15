import { useEffect, useState } from 'react';
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import '../css/voice.css';

// ########### NO SE ESTÁ USANDO, ES SOLO PARA LLEGAR A LOS REQUERIMIENTOS DE LA ACTIVIDAD 4.2. ###########
export function Pagina_Voz_2() {
    const [text, setText] = useState("");
    const [sent, setSent] = useState(false);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({ clearTranscriptOnListen: false });

    useEffect(() => {
        setText(transcript);
    }, [transcript]);

    const handleListeningToggle = () => {
        if (listening) SpeechRecognition.stopListening();
        else SpeechRecognition.startListening({ language: 'es-ES' });
    };

    const handleReset = () => {
        setSent(false);
        resetTranscript();
    }

    if (!browserSupportsSpeechRecognition) { //
        return <p className="alert alert-danger">El navegador no soporta esta funcionalidad. Prueba con Chrome o Edge, por ejemplo.</p>
    };

    return (
        <div className="container mt-3">
            <h2 className='text-center'>Voz a texto:</h2>

            <div id="input-voz" className="input-group mb-3">
                <input type="text" className="form-control" value={text} onChange={(e) => setText(e.target.value)} disabled={sent} />
                <button
                    className="btn btn-outline-primary"
                    onClick={() => handleListeningToggle()}
                    disabled={sent}
                >
                    <i className={listening ? "bi bi-mic-mute" : "bi bi-mic"} />
                </button>
                <button
                    className="btn btn-outline-primary"
                    onClick={() => setSent(true)}
                >Mandar mensaje</button>
            </div>

            <section id="transcript-section">
                <p>{!sent ? <span className="text-muted">¡Dale al botón y habla o escribe!</span> : text}</p>
            </section>

            <section id="boton_reinicio">
                <button className="btn btn-outline-warning btn-lg" onClick={() => handleReset()}>Limpiar</button>
            </section>
        </div>
    );
}