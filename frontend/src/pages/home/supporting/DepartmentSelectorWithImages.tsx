
interface DepartmentSelectorWithImagesProps {
    onSelect: () => void;
    department: {
        full: string;
        thumbnails: string[];
        description: string;
    };
}


const DepartmentSelectorWithImages: React.FC<DepartmentSelectorWithImagesProps> = ({onSelect, department }) => {
  return (
    <div onClick={onSelect} className="relative h-[35vh] aspect-3/4 bg-black">
        <img src={department.thumbnails[0]} alt="Department Image" className="w-full h-full object-cover  opacity-80" onClick={() => onSelect} />
        <p style={{ lineHeight: "1"}} className="absolute bottom-2 w-full text-white text-center text-[3vh] h-[30%] flex items-center justify-center">{department.full}</p>
    </div>
  )
}

export default DepartmentSelectorWithImages