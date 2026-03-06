import React from "react";

const DataDeletion: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto lg:min-h-screen bg-gray-100 px-6 py-16 text-gray-800">
      <h1 className="text-3xl font-semibold mb-6">
        Data Deletion Instructions
      </h1>

      <p className="mb-6">
        If you would like your data removed from The Mall, you may request
        deletion using one of the methods below.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Option 1 — Delete from your account
      </h2>

      <p>
        Users can delete their account from the account settings page. This will
        remove personal data associated with the account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Option 2 — Request deletion by email
      </h2>

      <p>
        Send a deletion request to:
      </p>

      <p className="font-medium mt-2">contact@themallbeta.com</p>

      <p className="mt-4">
        Include your account email address and request for data deletion.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Facebook Login Users
      </h2>

      <p>
        If you signed up using Facebook Login, you can remove The Mall from your
        Facebook account settings and request deletion of your data by email.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">
        Contact
      </h2>

      <p>Email: contact@themallbeta.com</p>
    </div>
  );
};

export default DataDeletion;