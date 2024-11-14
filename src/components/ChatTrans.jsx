import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import Chat from './Chat copy'; 
import ChatWindow from './ChatWindow'; // ChatWindow 컴포넌트 임포트
import './Friends.css'; // CSS 스타일 임포트

const ChatTrans = ({ friend, chatHistory }) => {
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([]);
   // const [nickname, setNickname] = useState('익명');

    // 클릭
    const startChat = () => {
        setShowChat(true);
        // 이전 채팅 기록 불러오기
        setMessages(chatHistory);
    };

    // // 닉네임 설정
    // useEffect(() => {
    //     const value = prompt('닉네임을 입력해주세요') || '익명';
    //     setNickname(value.trim());
    // }, []);

    return (
        <div className="friend-chat-container">
            <Card className="friend-card" onClick={startChat}>
                <CardContent>
                    <Typography variant="h5">{friend.name}</Typography>
                    <img src={friend.imageUrl} alt={friend.name} className="friend-image" />
                </CardContent>
            </Card>

            {showChat && (
                <div className="chat-window">
                    <ChatWindow location={{ state: { nickname, chatHistory: messages } }} />
                </div>
            )}
        </div>
    );
};

export default ChatTrans;
