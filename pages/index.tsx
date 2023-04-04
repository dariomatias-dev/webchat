import Chat from "@/components/Chat";
import Login from "./Login";
import { useData } from "@/components/Context";

const Home = () => {
  const { userUid } = useData();

  return (
    <div className='flex justify-center'>
      {userUid ? <Chat /> : <Login />}
    </div>
  );
};

export default Home;
