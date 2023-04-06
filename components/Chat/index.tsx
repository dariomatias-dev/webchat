import { useState, useEffect, useRef } from "react";
import { AiOutlineSend } from 'react-icons/ai';
import styles from '../../styles/InputWithValue.module.scss';

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
                <div
                    ref={refChat}
                    className="w-full h-full flex flex-col gap-6 pt-10 px-3 pb-28 bg-black overflow-auto scroll-smooth"
                >
                    {
                        messages.map((message: MessagesProps, index) => {
                            return (
                                <div
                                    key={index}
                                    style={userUid === message.userUid ? { flexDirection: 'row-reverse' } : {}}
                                    className="flex gap-2"
                                >
                                    <Image
                                        src={users[message.userUid].photoUrl}
                                        width={1000}
                                        height={1000}
                                        alt="User photo."
                                        className="w-10 h-10 rounded-full"
                                    />

                                    <div
                                        style={userUid === message.userUid ? { backgroundColor: '#00b5e0', borderTopLeftRadius: '16px', borderTopRightRadius: '0' } : {}}
                                        className="flex flex-col max-w-[70%] bg-zinc-900 py-2 px-4 rounded-tr-2xl rounded-br-2xl rounded-bl-2xl"
                                    >
                                        <span
                                            style={userUid === message.userUid ? { color: '#FFFFFF' } : {}}
                                            className='text-zinc-300 text-end'
                                        >
                                            {userUid === message.userUid ? 'Você' : users[message.userUid]?.name || 'User'}
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

            <div className='fixed bottom-0 w-full select-none'>
                <div className='max-w-[600px] flex justify-center items-center gap-4 bg-[#080808] border-t-2 border-zinc-900 mx-auto py-3 px-5'>
                    <textarea
                        value={content}
                        placeholder="Mensagem"
                        onChange={e => setContent(e.target.value)}
                        className={`${styles.input} max-w-[500px] w-[90%] h-14 max-h-32 bg-[#141414] text-lg border border-zinc-800 hover:border-zinc-700 focus:border-[#60a5fa] outline-none pt-3 px-2 transition duration-300`}
                    />

                    <AiOutlineSend
                        onClick={() => content ? sendMessage() : ''}
                        style={content ? { cursor: 'pointer' } : { color: '#52525b', cursor: 'not-allowed' }}
                        className="w-8 h-8 right-2 bottom-4 text-zinc-400 hover:text-white transition duration-300"
                    />
                </div>
            </div>
        </>
    );
};

export default Chat;
