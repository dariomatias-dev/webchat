import Chat from "@/components/Chat";
import { useData } from "@/components/Context";
import CreateUser from "@/components/CreateUser";
import Login from "@/components/Login";

const Home = () => {
  const { screen } = useData();

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center bg-background-chat'>
      {screen === 'login' && <Login />}
      {screen === 'createUser' && <CreateUser />}
      {screen === 'chat' && <Chat />}
    </div>
  );
};

export default Home;
