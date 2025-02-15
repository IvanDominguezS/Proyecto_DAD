import React from 'react';
import "regenerator-runtime/runtime";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import '../css/voice.css';

export function Pagina_Voz() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition({ clearTranscriptOnListen: false });

  if (!browserSupportsSpeechRecognition) { //
    return <p className="alert alert-danger">El navegador no soporta esta funcionalidad. Prueba con Chrome o Edge, por ejemplo.</p>
  };

  const handleListeningToggle = () => {
    if (listening) SpeechRecognition.stopListening();
    else SpeechRecognition.startListening({ language: 'es-ES' });
  };

  return (
    <div className="container mt-3">
      <h2 className='text-center' >Voz a texto:</h2>

      <section id="transcript-section">
        <p>{transcript == "" ? <span className="text-muted">¡Dale al botón y habla!</span> : transcript}</p>
      </section>

      <section id="button-section" >
        <button
          className="btn btn-outline-primary"
          onClick={() => handleListeningToggle()}
        >
          <i className={listening ? "bi bi-mic-mute" : "bi bi-mic"} />
        </button>

        <button className="btn btn-outline-warning btn-lg" onClick={resetTranscript}>Limpiar</button>
      </section>

    </div>
  );
}