import { Plus } from "lucide-react";

const AddStore = () => {
  return (
    <div 
        className="h-[25vh] w-[95vw] bg-blue-200 m-2 border-2 border-blue-500 rounded-lg flex justify-center items-center cursor-pointer hover:bg-blue-300 transition duration-200 ease-in-out transform hover:scale-98"
    >
        <Plus 
            className="h-[23vh] w-[23vh] text-blue-500 opacity-25"
        />
    </div>
  )
}

export default AddStore