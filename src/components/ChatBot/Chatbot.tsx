import React, { useRef, useState } from 'react'
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Avatar,
    ConversationHeader,
} from "@chatscope/chat-ui-kit-react";

import { generateContent } from './model'
import { initialMessage } from './ChatBotConst';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "../../css/chatbot.css";

import guiiaImage from "../../assets/img/GUIIA.jpg";

export const Chatbot = () => {
    const [userInput, setUserInput] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const messageIdRef = useRef(0);
    const [messages, setMessages] = useState<React.ReactElement[]>(
        [
            <Message
                model={{
                    direction: 'incoming',
                    position: 'single',
                    message: initialMessage,
                }}
                key={messageIdRef.current++}
            />
        ]
    );

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    function handleChatSend() {
        setMessages(
            [
                ...messages,
                (<Message
                    model={{
                        direction: 'outgoing',
                        position: 'single',
                        message: userInput,
                    }}
                    key={messageIdRef.current++}
                />)
            ]
        );

        generateContent(userInput)
            .then(response => { //Usando el "then", se espera a que haya terminado.
                setMessages(prevMessages =>
                    [
                        ...prevMessages,
                        (
                            <Message
                                model={{
                                    direction: 'incoming',
                                    position: 'single',
                                    message: response(),
                                }}
                                key={messageIdRef.current++}
                            />
                        )

                    ]
                );
            }
            )

    }

    if (!isOpen) {
        return (
            <div id="chatbot-not-expanded" onClick={toggleOpen}>
                <section id="avatar" />
                <p>¡Hola! 👋 Soy la asistente virtual del hotel. ¿Cómo puedo ayudarte hoy?</p>
            </div>
        )
    }

    return (
        <MainContainer>
            <ChatContainer>

                <ConversationHeader>
                    <ConversationHeader.Back onClick={toggleOpen} />
                    <Avatar
                        name="GUIIA"
                        src={guiiaImage}
                    />
                    <ConversationHeader.Content
                        userName="GUIIA"
                    />
                </ConversationHeader>

                <MessageList>
                    {messages}
                </MessageList>

                <MessageInput placeholder="Inicia el chat aquí" onChange={(e) => setUserInput(e)} onSend={handleChatSend} attachButton={false} />

            </ChatContainer>
        </MainContainer>


    )
}
