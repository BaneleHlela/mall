import { useAppSelector } from "../../../app/hooks";
import { FaCheckCircle, FaClock, FaExclamationTriangle } from "react-icons/fa";

const DriverDocuments = () => {
  const driver = useAppSelector((state) => state.driver.driver);

  const documents = driver?.documents || {};
  const docEntries = [
    { key: 'idOrPassport', label: 'ID or Passport' },
    { key: 'criminalClearance', label: 'Criminal Clearance' },
    { key: 'driversLicence', label: "Driver's Licence" },
    { key: 'vehicleRegistration', label: 'Vehicle Registration' },
  ];

  const getStatus = (doc: any) => {
    if (!doc) return { icon: <FaExclamationTriangle className="text-yellow-500" />, text: 'Not uploaded', color: 'text-yellow-600' };
    if (doc.verified) return { icon: <FaCheckCircle className="text-green-500" />, text: 'Verified', color: 'text-green-600' };
    return { icon: <FaClock className="text-orange-500" />, text: 'Pending verification', color: 'text-orange-600' };
  };

  return (
    <div className="w-full max-w-6xl p-6">
      <h1 className="text-3xl font-bold mb-6">Documents</h1>

      {/* Account Status Banner */}
      <div className={`mb-6 p-4 rounded-xl border ${
        driver?.documentsVerified ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'
      }`}>
        <div className="flex items-center gap-3">
          {driver?.documentsVerified ? (
            <FaCheckCircle className="text-green-500 text-xl" />
          ) : (
            <FaClock className="text-yellow-500 text-xl" />
          )}
          <div>
            <p className="font-semibold">
              {driver?.documentsVerified ? 'All documents verified' : 'Documents pending verification'}
            </p>
            <p className="text-sm text-slate-600">
              {driver?.documentsVerified 
                ? 'You can go live and accept deliveries.' 
                : 'Admin review in progress. You will be notified once verified.'}
            </p>
          </div>
        </div>
      </div>

      {/* Documents Status */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-semibold text-lg mb-4">Document Verification Status</h2>
        
        <div className="space-y-4">
          {docEntries.map(({ key, label }) => {
            const doc = documents[key];
            const status = getStatus(doc);
            return (
              <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-medium">{label}</p>
                  {doc && (
                    <p className="text-xs text-slate-500">
                      Uploaded {new Date(doc.uploadedAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className={`flex items-center gap-2 font-medium ${status.color}`}>
                  {status.icon}
                  <span>{status.text}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t text-sm text-slate-500">
          Upload or replace documents from the Profile settings page. Verification typically takes 1-3 business days.
        </div>
      </div>
    </div>
  );
};

export default DriverDocuments;
