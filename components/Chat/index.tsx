import { useEffect, useState } from "react";
import { AiOutlineSend } from 'react-icons/ai';

import { db, collection, addDoc, query, orderBy, limit, onSnapshot, getDocs } from "@/services/firebase";
import { useData } from "../Context";

type MessagesProps = {
    userUid: string;
    message: string;
    send: Date;
};

const Chat = () => {
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState<MessagesProps[]>([]);
    const [enableMessagesUpdate, setEnableMessagesUpdate] = useState(false);

    const { userUid } = useData();

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
        if (messages.length && enableMessagesUpdate)
            updateMessages();
    }, [messages, enableMessagesUpdate]);

    useEffect(() => {
        searchMesages();
    }, []);

    return (
        <>
            <div className="w-[600px] h-screen">
                <div className="w-full h-full flex flex-col gap-4 p-10 bg-black overflow-auto pb-24">
                    {
                        messages.map((message: any, index) => {
                            return (
                                <p
                                    key={index}
                                    className="flex max-w-max bg-[#00b5e0] py-2 px-4 rounded-xl"
                                >
                                    {message.message}
                                </p>
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
