import { useAppDispatch } from "../../../app/hooks";
import LocationPicker from "../../../components/the_mall/location/LocationPicker";
import { useState } from "react";
import { updateUser } from "../../../features/user/userSlice";

const AddUserAddressPage = () => {
  const dispatch = useAppDispatch();
  const [nickname, setNickname] = useState("");
  const [locationData, setLocationData] = useState<{
    lat: number;
    lng: number;
    address: string;
  } | null>(null);

  const handleLocationSelect = (location: {
    lat: number;
    lng: number;
    address: string;
  }) => {
    setLocationData(location);
  };

  const handleSubmit = () => {
    if (!locationData) {
      alert("Please select a location");
      return;
    }

    dispatch(updateUser({
      locations: [
        {
          nickname,
          ...locationData,
        },
      ],
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add Address</h2>

      <input
        type="text"
        placeholder="e.g. Home, Work"
        className="w-full p-2 mb-4 border rounded"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />

      <LocationPicker onLocationSelect={handleLocationSelect} />

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        Save Address
      </button>
    </div>
  );
};

export default AddUserAddressPage;
