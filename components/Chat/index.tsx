import { useState, useEffect, useRef } from "react";
import { AiOutlineSend } from 'react-icons/ai';

import { db, collection, addDoc, query, orderBy, limit, onSnapshot, getDocs } from "@/services/firebase";
import { useData } from "../Context";
import Image from "next/image";

type MessagesProps = {
    userUid: string;
    message: string;
    send: {
        seconds: number;
        milliseconds: number;
    };
};

const Chat = () => {
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState<MessagesProps[]>([]);
    const [enableMessagesUpdate, setEnableMessagesUpdate] = useState(false);

    const { userUid, users } = useData();

    const refChat = useRef<HTMLDivElement>(null);

    const sendMessage = () => {
        addDoc(collection(db, 'messages'), {
            userUid,
            message: content,
            send: new Date(),
        });
        setContent('');
    };

    const searchMesages = async () => {
        const data: MessagesProps[] = [];
        const q = query(collection(db, 'messages'), orderBy('send', 'asc'), limit(100))
        await getDocs(q)
            .then(result => {
                result.forEach(doc => {
                    data.push(doc.data() as MessagesProps);
                });
            })
            .catch(err => {
                console.log(err);
            });
        setMessages(data);
        setEnableMessagesUpdate(true);
    };

    const updateMessages = async () => {
        let message = {} as MessagesProps;
        let registerLastMessage = false;
        const q = query(collection(db, 'messages'), orderBy('send', 'desc'), limit(1));
        onSnapshot(q, snapshot => {
            snapshot.forEach(doc => {
                message = doc.data() as MessagesProps;
            });

            if (registerLastMessage)
                setMessages(prevState => {
                    if (prevState.length === 100)
                        prevState.shift();
                    return [...prevState, message];
                });
            registerLastMessage = true;
        });

        setEnableMessagesUpdate(false);
    };

    useEffect(() => {
        const height = refChat.current?.scrollHeight;
        refChat.current?.scrollTo(0, height || 0);
        if (messages.length && enableMessagesUpdate)
            updateMessages();
    }, [messages, enableMessagesUpdate]);

    useEffect(() => {
        searchMesages();
    }, []);

    return (
        <>
            <div className="w-[600px] h-screen">
                <div ref={refChat} className="w-full h-full flex flex-col gap-6 pt-10 px-3 pb-24 bg-black overflow-auto scroll-smooth">
                    {
                        messages.map((message: MessagesProps, index) => {
                            return (
                                <div
                                    key={index}
                                    style={userUid === message.userUid ? { flexDirection: 'row-reverse' } : {}}
                                    className="flex gap-2"
                                >
                                    <Image
                                        src={users[userUid].photoUrl}
                                        width={1}
                                        height={1}
                                        alt="User photo."
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div
                                        style={userUid === message.userUid ? { backgroundColor: '#00b5e0', borderTopLeftRadius: '16px', borderTopRightRadius: '0' } : {}}
                                        className="flex flex-col gap-2 max-w-[75%] bg-zinc-900 py-2 px-4 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
                                    >
                                        <span
                                            style={userUid === message.userUid ? { color: '#FFFFFF' } : {}}
                                            className='text-zinc-300'
                                        >
                                            {users[message.userUid]?.name || 'Dário Matias'}
                                        </span>
                                        <p>
                                            {message.message}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            <div className='fixed bottom-2 flex justify-center'>
                <div className="relative">
                    <input
                        type='text'
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        onKeyUp={e => { if (e.key === 'Enter') sendMessage() }}
                        className='w-[550px] max-h-16 bg-[#272727] rounded-3xl text-lg outline-none pl-2 pr-12 py-5'
                    />
                    <AiOutlineSend
                        onClick={sendMessage}
                        className="w-8 h-8 absolute right-2 bottom-4"
                    />
                </div>
            </div>
        </>
    );
};

export default Chat;
