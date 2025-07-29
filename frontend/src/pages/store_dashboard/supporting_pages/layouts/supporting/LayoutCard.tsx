import { useNavigate } from "react-router-dom";

interface LayoutCardProps {
  layout: {
    _id: string;
    store: string;
    imageUrl: string;
    name?: string;
  };
  onSelect: (layoutId: string) => void;
}

const LayoutCard: React.FC<LayoutCardProps> = ({ layout, onSelect }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full sm:w-[300px] h-[200px] overflow-hidden rounded-lg shadow-md group">
      <img
        src={layout.imageUrl}
        alt={layout.name || "Store Layout"}
        className="w-full h-full object-cover"
      />
      {/* Name */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-center">
            <h3 className="text-lg font-semibold">{layout._id || "Store Layout"}</h3>
        </div>

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
        <button
          onClick={() => navigate(`/stores/${layout.store}`)}
          className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
        >
          View
        </button>
        <button
          onClick={() => onSelect(layout._id)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Select
        </button>
      </div>
    </div>
  );
};

export default LayoutCard;
