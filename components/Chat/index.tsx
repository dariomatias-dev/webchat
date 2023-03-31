import { db, collection, onSnapshot } from "@/services/firebase";
import { addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { AiOutlineSend } from 'react-icons/ai';

const Chat = () => {
    const [content, setContent] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        addDoc(collection(db, 'messages'), { message: content });
        setContent('');
    };

    const searchMesages = async () => {
        onSnapshot(collection(db, 'messages'), snapshot => {
            let data: any = [];
            snapshot.forEach(doc => {
                data.push(doc.data());
            });
            setMessages(data);
        });
    };

    useEffect(() => {
        searchMesages();
    }, []);

    return (
        <>
            <div className="w-[600px] h-screen bg-[#060f14]">
                <div className="w-full flex flex-col gap-4 p-20 bg-[#060f14]">
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
