type Props = {
    message: string;
};

const WelcomeImage = ({ message }: Props) => {
    return (
        <div className='relative w-full flex justify-center items-center text-center'>
            <div className='w-full h-full bg-background-welcome bg-cover bg-left'>
                <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-40' />
            </div>

            <div className='absolute flex flex-col gap-2'>
                <h1 className='text-4xl font-bold'>
                    Bem vindo(a)!
                </h1>
                <p>
                    {message}
                </p>
            </div>
        </div>
    );
};

export default WelcomeImage;
