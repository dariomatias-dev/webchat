import Chat from "@/components/Chat";
import { useData } from "@/components/Context";
import CreateUser from "@/components/CreateUser";
import Login from "@/components/Login";

const Home = () => {
  const { screen } = useData();

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center'>
      {
        screen === 'login' && (
          <div className="w-full flex justify-center items-center bg-background-screen bg-center">
            <Login />
          </div>
        )
      }

      {
        screen === 'createUser' && (
          <div className="w-full flex justify-center items-center bg-background-screen bg-center">
            <CreateUser />
          </div>
        )
      }

      {
        screen === 'chat' && (
          <div className="w-full h-full flex justify-center items-center bg-background-chat">
            <Chat />
          </div>
        )
      }
    </div>
  );
};

export default Home;
