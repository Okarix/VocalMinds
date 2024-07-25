'use client';

import React, { createContext, useContext, useState } from 'react';

export interface ChatMessage {
	role: 'user' | 'system';
	content: string;
	timestamp: string;
}

interface ChatContextType {
	messages: ChatMessage[];
	addMessage: (msg: ChatMessage) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
	children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
	const [messages, setMessages] = useState<ChatMessage[]>([]);

	const addMessage = (msg: ChatMessage) => {
		setMessages(prevMessages => [...prevMessages, msg]);
	};

	return <ChatContext.Provider value={{ messages, addMessage }}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
	const context = useContext(ChatContext);
	if (!context) {
		throw new Error('useChat must be used within a ChatProvider');
	}
	return context;
};
