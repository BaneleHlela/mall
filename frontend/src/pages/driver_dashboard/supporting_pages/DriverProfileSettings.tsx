import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { useParams, useNavigate } from "react-router-dom";
import { FaUser, FaClock, FaMapMarkedAlt, FaWineBottle, FaTrash } from "react-icons/fa";

const DriverProfileSettings = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { driverProfileId } = useParams<{ driverProfileId: string }>();
  const driver = useAppSelector((state) => state.driver.driver);

  const settingsLinks = [
    { icon: <FaUser />, label: "Basic Information", path: "basic" },
    { icon: <FaClock />, label: "Operating Hours", path: "operating-hours" },
    { icon: <FaMapMarkedAlt />, label: "Collection Zones", path: "collection-zones" },
    { icon: <FaMapMarkedAlt />, label: "Delivery Zones", path: "delivery-zones" },
    { icon: <FaWineBottle />, label: "Alcohol Delivery", path: "alcohol" },
  ];

  const handleDeleteProfile = () => {
    if (confirm("Are you sure you want to delete your driver profile? This action cannot be undone.")) {
      // TODO: dispatch delete action when backend ready
      alert("Delete profile functionality will be implemented with backend.");
      navigate("/");
    }
  };

  return (
    <div className="w-full max-w-4xl p-6">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <div className="bg-white rounded-2xl border border-slate-200 divide-y">
        {settingsLinks.map((item, index) => (
          <Link
            key={index}
            to={`/driver-dashboard/${driverProfileId}/profile/${item.path}`}
            className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              {item.icon}
            </div>
            <span className="font-medium text-slate-800">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Delete Profile Button */}
      <div className="mt-8 pt-6 border-t">
        <button
          onClick={handleDeleteProfile}
          className="flex items-center gap-2 px-5 py-3 text-red-600 hover:bg-red-50 border border-red-200 rounded-xl transition-colors"
        >
          <FaTrash />
          <span>Delete Driver Profile</span>
        </button>
        <p className="text-xs text-slate-500 mt-2 ml-1">This will permanently remove your driver account and all associated data.</p>
      </div>
    </div>
  );
};

export default DriverProfileSettings;
