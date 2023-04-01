type Props = {
    message: string;
}

const WelcomeImage = ({ message }: Props) => {
    return (
        <div className='relative flex justify-center items-center w-2/4'>
            <div className='h-full'>
                <img
                    src='./images/welcome.jpg'
                    alt=''
                    className='h-full'
                />

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
