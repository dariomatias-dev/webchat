import Chat from "@/components/Chat";
import { useData } from "@/components/Context";
import CreateUser from "@/components/CreateUser";
import Login from "@/components/Login";

const Home = () => {
  const { screen } = useData();
  console.log(screen)
  return (
    <div className='flex justify-center'>
      {screen === 'login' && <Login />}
      {screen === 'createUser' && <CreateUser />}
      {screen === 'chat' && <Chat />}
    </div>
  );
};

export default Home;
