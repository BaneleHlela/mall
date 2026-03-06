import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 text-gray-800">
      <h1 className="text-3xl font-semibold mb-4">Privacy Policy for The Mall</h1>

      <p className="mb-6 text-sm text-gray-500">
        Effective Date: March 6, 2026
      </p>

      <p className="mb-6">
        The Mall ("we", "our", or "us") operates the website
        https://themallbeta.com. This Privacy Policy explains how we collect,
        use, and protect your information when you use our platform.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">1. Information We Collect</h2>

      <p className="mb-3">Information you provide:</p>

      <ul className="list-disc pl-6 space-y-2">
        <li>Name</li>
        <li>Email address</li>
        <li>Account login information</li>
        <li>Store information if you register as a vendor</li>
        <li>Messages, reviews, or other content you post</li>
      </ul>

      <p className="mt-6 mb-3">Information collected automatically:</p>

      <ul className="list-disc pl-6 space-y-2">
        <li>Device information</li>
        <li>IP address</li>
        <li>Browser type</li>
        <li>Pages visited</li>
        <li>Cookies and usage data</li>
      </ul>

      <p className="mt-6">
        If you log in using Facebook or Google, we may receive your name, email
        address, and profile image (if available).
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">2. How We Use Your Information</h2>

      <ul className="list-disc pl-6 space-y-2">
        <li>Create and manage user accounts</li>
        <li>Allow vendors to operate stores</li>
        <li>Enable purchases and bookings</li>
        <li>Improve platform experience</li>
        <li>Communicate with users</li>
        <li>Prevent fraud and abuse</li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-3">3. Sharing of Information</h2>

      <p>
        We do not sell personal information. Information may only be shared with
        service providers, payment processors, or authorities if required by
        law.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">4. Cookies</h2>

      <p>
        We use cookies to remember sessions, analyze traffic, and improve
        performance. Users may disable cookies in their browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">5. Data Security</h2>

      <p>
        We take reasonable security measures to protect user information.
        However, no online transmission is completely secure.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">6. Your Rights</h2>

      <p>
        Users may request access, correction, or deletion of their data.
        Instructions can be found on the Data Deletion page.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-3">7. Contact</h2>

      <p>Email: contact@themallbeta.com</p>
      <p>Website: https://themallbeta.com</p>
    </div>
  );
};

export default PrivacyPolicy;