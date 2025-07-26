import { FaTools } from "react-icons/fa";

const ComingSoon = ({message}: {message: string}) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-evenly text-center text-white">
        {/* Background */}
        <div className="absolute inset-0 w-full h-full z-0 bg-black">
            <img 
                src="https://storage.googleapis.com/the-mall-uploads-giza/stores/68726dde5987f5810dee5a8a/images/mall%20image.webp" 
                alt="" 
                className="h-full w-full object-cover opacity-50" 
            />
        </div>
        {/* Coming Soon */}
        <h1 
            style={{
                lineHeight: '1',
                fontFamily: "Fascinate Inline"	
            }}
            className="text-[400%] font-[Fascinate] z-1"
        >
            Coming Soon
        </h1>
        <FaTools className="animate-spin text-[4vh]"/>
        {/* Message */}
        <p className="text-center text-gray-600 w-[80%] max-w-[800px] bg-white shadow-md rounded-[2vh] p-[2vh] z-1">{message}</p>
    </div>
  )
}

export default ComingSoon