import { useState } from 'react';
import { TriviaQuestion } from '../../interfaces/TriviaQuestion';

const triviaQuestions: TriviaQuestion[] = [
    {
        question: "¿Qué es React?",
        options: ["Un lenguaje de programación", "Una librería de JavaScript", "Un sistema de gestión de bases de datos"],
        answer: "Una librería de JavaScript",
    },
    {
        question: "¿Qué método se usa para crear un estado en un componente funcional?",
        options: ["this.setState()", "useState()", "createState()"],
        answer: "useState()",
    },
    {
        question: "¿Cómo se llama el hook que permite ejecutar efectos secundarios?",
        options: ["useEffect()", "useEvent()", "useCallback()"],
        answer: "useEffect()",
    },
    {
        question: "¿Qué es JSX?",
        options: ["Una extensión de sintaxis para JavaScript", "Un tipo de base de datos", "Un componente de React"],
        answer: "Una extensión de sintaxis para JavaScript",
    },
    {
        question: "¿Cómo se puede pasar información entre componentes en React?",
        options: ["Usando props", "Usando variables globales", "Usando cookies"],
        answer: "Usando props",
    }
]

const Question = ({ question, selectedAnswer, handleAnswerSelect } : {question: TriviaQuestion, selectedAnswer: string, handleAnswerSelect: (answer: string) => void}) => {
    return (
        <>
            <h3>{question.question}</h3>

            <div className="options">
                {
                    question.options.map((option, index) => (
                        <button
                            className={option == selectedAnswer ? "btn selected" : "btn"}
                            key={index}
                            onClick={() => handleAnswerSelect(option)}
                        >
                            {index + 1}. { option }
                        </button>
                    ))
                }

            </div>
        </>
    );
}

export const Trivia = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const isAnswered = selectedAnswers[currentQuestionIndex] != null;

    const handleAnswerSelect = (answer: string) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[currentQuestionIndex] = answer;

        setSelectedAnswers(newSelectedAnswers);
    }

    const handleNextQuestion = () => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    const countScore = () => {
        let count = 0;

        triviaQuestions.map((question, index) => {
            if(question.answer == selectedAnswers[index]) count++;
        });

        return count;
    }

    const resetTrivia = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers([]);
    }

    return (
        <div id="trivia" className="responsive-element container">
            <h2>Cuestionario de React</h2>

            {
                currentQuestionIndex < triviaQuestions.length ? (

                    <div>

                        <Question question={triviaQuestions[currentQuestionIndex]} selectedAnswer={selectedAnswers[currentQuestionIndex]} handleAnswerSelect={handleAnswerSelect} />
                        <button className="btn btn-outline-success" onClick={handleNextQuestion} disabled={!isAnswered}>Siguiente pregunta</button>
                            
                    </div>

                ) : (

                    <div>

                        <h3 className="result">Resultado: {countScore()} / 5</h3>
                        <button className="btn btn-outline-success" onClick={resetTrivia}>Reiniciar cuestionario</button>

                    </div>
                    
                )
            }

        </div>
    )
}
