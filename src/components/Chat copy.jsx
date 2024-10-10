// src/component/Chat.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Button, TextField, Container, Paper, Typography } from '@mui/material';
import '../css/Chat.css'; 


const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [nickname, setNickname] = useState('익명');
    const messageListRef = useRef(null);
    let socket;

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amPm = hours >= 12 ? '오후' : '오전';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${amPm} ${formattedHours}:${formattedMinutes}`;
    };

    const open = () => {
        const value = prompt('닉네임을 입력해주세요') || '익명';
        setNickname(value.trim());
    };

    const sendMessage = () => {
        if (inputMessage.trim() === '') return;

        const message = {
            nickname: nickname,
            text: inputMessage.trim(),
            id: Date.now(),
            isMine: true,
            timestamp: new Date().toISOString(),
        };

        socket.send(JSON.stringify(message));
        setMessages((prevMessages) => [...prevMessages, message]);
        setInputMessage('');
        scrollToBottom();
    };

    const scrollToBottom = () => {
        const myDiv = messageListRef.current;
        if (myDiv) {
            myDiv.scrollTop = myDiv.scrollHeight - myDiv.clientHeight;
        }
    };

    useEffect(() => {
        open();

        socket = new WebSocket('ws://localhost:8079');

        socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.nickname !== nickname) {
                    message.isMine = false;
                    setMessages((prevMessages) => [...prevMessages, message]);
                }
                scrollToBottom();
            } catch (error) {
                console.error('Received non-JSON message:', event.data);
            }
        };

        return () => {
            socket.close();
        };
    }, [nickname]);

    return (
        <Container maxWidth="sm" style={{ padding: '20px', marginTop: '20px' }}>
            <Paper elevation={3} style={{ padding: '20px', height: '70vh', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    JOY TALK
                </Typography>
                <div ref={messageListRef} style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '20px' }}>
                    {messages.map((message) => (
                        <div key={message.id} style={{ textAlign: message.isMine ? 'right' : 'left' }}>
                            {!message.isMine && (
                                <Typography variant="caption" color="textSecondary">
                                    {message.nickname}
                                </Typography>
                            )}
                            <Typography variant="body1" style={{ margin: '5px 0' }}>
                                {message.text}
                                <span style={{ fontSize: '0.8em', marginLeft: '5px', color: 'gray' }}>
                                    {formatTimestamp(message.timestamp)}
                                </span>
                            </Typography>
                        </div>
                    ))}
                </div>
                <div style={{ display: 'flex' }}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="메시지를 입력하세요"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button variant="contained" color="primary" onClick={sendMessage} style={{ marginLeft: '10px' }}>
                        전송
                    </Button>
                </div>
            </Paper>
        </Container>
    );
};

export default Chat;
