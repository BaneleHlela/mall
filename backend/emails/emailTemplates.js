export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="margin:0; padding:0; background-color:#ffffff; font-family: Arial, Helvetica, sans-serif; color:#222;">

  <div style="max-width:600px; margin:0 auto; padding:40px 24px;">

    <!-- Header -->
    <h1 style="font-size:28px; font-weight:700; margin-bottom:8px;">
      Verify Your Email
    </h1>

    <p style="font-size:16px; line-height:1.7; margin-bottom:16px;">
      Welcome to <strong>The Mall</strong>.
    </p>

    <p style="font-size:16px; line-height:1.7; margin-bottom:24px;">
      To complete your sign up, please verify your email address using the code below.
    </p>

    <!-- Verification Code -->
    <div style="margin:32px 0; padding:24px; background-color:#f5f5f5; border-radius:8px; text-align:center;">
      <p style="font-size:13px; letter-spacing:1px; color:#666; margin-bottom:12px;">
        YOUR VERIFICATION CODE
      </p>
      <span style="font-size:34px; font-weight:700; letter-spacing:8px;">
        {verificationCode}
      </span>
    </div>

    <p style="font-size:16px; line-height:1.7; margin-bottom:20px;">
      Or simply click the button below to verify instantly:
    </p>

    <!-- CTA Button -->
    <div style="text-align:left; margin-bottom:32px;">
      <a href="{verificationLink}" 
         style="background-color:#111; color:#ffffff; text-decoration:none; padding:14px 24px; border-radius:6px; font-weight:600; display:inline-block;">
        Verify Email
      </a>
    </div>

    <p style="font-size:14px; color:#555; line-height:1.7; margin-bottom:16px;">
      This code and link will expire in 24 hours for security reasons.
    </p>

    <p style="font-size:14px; color:#555; line-height:1.7; margin-bottom:32px;">
      If you didn't create an account with The Mall, you can safely ignore this email.
    </p>

    <p style="font-size:16px; margin-bottom:4px;">
      — The Mall Team
    </p>

    <!-- Footer -->
    <hr style="border:none; border-top:1px solid #eee; margin:32px 0;" />

    <p style="font-size:13px; color:#888; line-height:1.6;">
      You're receiving this email because a new account was created using this email address.
    </p>

  </div>

</body>
</html>
`;



export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset Successful</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <ul>
      <li>Use a strong, unique password</li>
      <li>Enable two-factor authentication if available</li>
      <li>Avoid using the same password across multiple sites</li>
    </ul>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>The Mall Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Password Reset</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>The Mall Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to The Mall</title>
</head>
<body style="margin:0; padding:0; background-color:#ffffff; font-family: Arial, Helvetica, sans-serif; color:#222;">

  <div style="max-width:600px; margin:0 auto; padding:40px 24px;">

    <!-- Header -->
    <h1 style="font-size:28px; font-weight:700; margin-bottom:8px;">
      You're Early. And That Matters.
    </h1>

    <p style="font-size:16px; margin-bottom:24px; color:#444;">
      Welcome,
    </p>

    <p style="font-size:16px; line-height:1.7; margin-bottom:16px;">
      Welcome to <strong>The Mall</strong>.
    </p>

    <p style="font-size:16px; line-height:1.7; margin-bottom:16px;">
      We're genuinely excited to have you here at this early stage. The Mall isn't just another marketplace — it's a platform built to give businesses of all kinds the space and tools to create strong brands and grow online, without limits.
    </p>

    <p style="font-size:16px; line-height:1.7; margin-bottom:16px;">
      Right now, access is open to vendors and sellers — whether you sell products, offer services, manage rentals, or run something unique.
    </p>

    <p style="font-size:16px; line-height:1.7; margin-bottom:20px;">
      You're early. And that matters.
    </p>

    <!-- Bullet Section -->
    <div style="margin-bottom:28px;">
      <p style="font-weight:600; margin-bottom:10px;">Here's what you can do right now:</p>
      <ul style="padding-left:18px; line-height:1.8; margin:0;">
        <li>Create your own store</li>
        <li>Experiment with layouts and features</li>
        <li>Explore the demo stores for inspiration</li>
        <li>Share The Mall with someone who needs it</li>
      </ul>
    </div>

    <!-- CTA Button -->
    <div style="text-align:left; margin-bottom:32px;">
      <a href="{dashboard_link}" 
         style="background-color:#111; color:#ffffff; text-decoration:none; padding:14px 24px; border-radius:6px; font-weight:600; display:inline-block;">
        Create Your Store
      </a>
    </div>

    <p style="font-size:16px; line-height:1.7; margin-bottom:32px;">
      We're still building. Still improving. Still expanding. And we're excited to grow alongside you.
    </p>

    <p style="font-size:16px; margin-bottom:4px;">
      — The Mall Team
    </p>

    <!-- Footer -->
    <hr style="border:none; border-top:1px solid #eee; margin:32px 0;" />

    <p style="font-size:13px; color:#888; line-height:1.6;">
      You're receiving this email because you signed up for The Mall.
    </p>

  </div>

</body>
</html>
`;



export const STORE_CREATED_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Store Created</title>
</head>
<body style="margin:0; padding:0; background-color:#ffffff; font-family: Arial, Helvetica, sans-serif; color:#222;">

  <div style="max-width:600px; margin:0 auto; padding:40px 24px;">

    <!-- Header -->
    <h1 style="font-size:28px; font-weight:700; margin-bottom:8px;">
      {storeName} is Ready.
    </h1>

    <p style="font-size:16px; margin-bottom:24px; color:#444;">
      Hello there,
    </p>

    <p style="font-size:16px; line-height:1.7; margin-bottom:16px;">
      Congratulations — your store  has been successfully created on <strong>The Mall</strong>.
    </p>

    <p style="font-size:16px; line-height:1.7; margin-bottom:16px;">
      Now it's time to bring it to life. Style it. Add your products, services, rentals — whatever you're selling. Make it yours.
    </p>

    <!-- Pre-launch Highlight Box  -->
    <div style="margin: 28px 0; padding: 20px 24px; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-radius: 10px; border-left: 4px solid #22c55e;">
      <p style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: #166534; margin: 0 0 6px 0;">
        🎉 Pre-Launch Special
      </p>
      <p style="font-size: 15px; line-height: 1.6; color: #374151; margin: 0;">
        Get full access to everything on The Mall for an entire year for just <strong style="color: #166534; font-size: 18px;">R25</strong>.
        <span style="display: inline-block; background: #166534; color: #fff; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 10px; margin-left: 6px; vertical-align: middle;">LIMITED TIME</span>
      </p>
    </div>

    <p style="font-size:16px; line-height:1.7; margin-bottom:20px;">
      Manage and customize your store from your dashboard:
    </p>

    <!-- CTA Button -->
    <div style="text-align:left; margin-bottom:32px;">
      <a href="{dashboardURL}" 
         style="background-color:#4379ba; color:#ffffff; text-decoration:none; padding:14px 24px; border-radius:6px; font-weight:600; display:inline-block;">
        Go to Dashboard
      </a>
    </div>

    <p style="font-size:16px; line-height:1.7; margin-bottom:16px;">
      Once your store is styled and ready, wait for launch day.
    </p>

    <p style="font-size:16px; line-height:1.7; margin-bottom:16px;">
      The Mall launches in specific areas once a minimum number of stores join that region.
      Encourage others to create their stores so we can launch in your area as soon as possible.
    </p>

    <p style="font-size:16px; line-height:1.7; margin-bottom:32px;">
      Let's build momentum.
    </p>

    <p style="font-size:16px; margin-bottom:4px;">
      — The Mall Team
    </p>

    <!-- Footer -->
    <hr style="border:none; border-top:1px solid #eee; margin:32px 0;" />

    <p style="font-size:13px; color:#888; line-height:1.6;">
      You're receiving this email because you created a store on The Mall.
    </p>

  </div>

</body>
</html>
`;


export const SUBSCRIPTION_ACTIVATED_EMAIL_TEMPLATE = `
<!doctype html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subscription Activated - Email Preview</title>
  <script src="/_sdk/element_sdk.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    html, body {
      height: 100%;
      width: 100%;
    }
    
    body {
      font-family: 'Inter', Arial, Helvetica, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
      min-height: 100%;
      padding: 40px 20px;
    }
    
    .email-container {
      max-width: 640px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 25px 80px rgba(0,0,0,0.25), 0 10px 30px rgba(0,0,0,0.15);
    }
    
    .email-header {
      background: linear-gradient(135deg, #4379ba 0%, #5a8fd4 50%, #7ba3de 100%);
      padding: 48px 40px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .email-header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
      animation: shimmer 3s ease-in-out infinite;
    }
    
    @keyframes shimmer {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(10%, 10%); }
    }
    
    .celebration-icon {
      width: 80px;
      height: 80px;
      background: rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255,255,255,0.3);
      position: relative;
      z-index: 1;
    }
    
    .celebration-icon svg {
      width: 40px;
      height: 40px;
      fill: #ffffff;
    }
    
    .email-header h1 {
      color: #ffffff;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
      position: relative;
      z-index: 1;
      text-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .email-header p {
      color: rgba(255,255,255,0.9);
      font-size: 16px;
      position: relative;
      z-index: 1;
    }
    
    .email-body {
      padding: 40px;
    }
    
    .greeting {
      font-size: 17px;
      color: #374151;
      margin-bottom: 20px;
      line-height: 1.6;
    }
    
    .greeting strong {
      color: #4379ba;
    }
    
    .intro-text {
      font-size: 16px;
      color: #4b5563;
      line-height: 1.7;
      margin-bottom: 28px;
    }
    
    .intro-text strong {
      color: #1f2937;
    }
    
    .subscription-card {
      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #bbf7d0 100%);
      border-radius: 16px;
      padding: 28px;
      margin-bottom: 28px;
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(34, 197, 94, 0.2);
    }
    
    .subscription-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: linear-gradient(180deg, #22c55e 0%, #16a34a 100%);
      border-radius: 4px 0 0 4px;
    }
    
    .subscription-card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }
    
    .subscription-card-header svg {
      width: 20px;
      height: 20px;
      fill: #16a34a;
    }
    
    .subscription-card-header span {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #166534;
    }
    
    .subscription-details {
      display: grid;
      gap: 14px;
    }
    
    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      background: rgba(255,255,255,0.7);
      border-radius: 10px;
    }
    
    .detail-label {
      font-size: 14px;
      color: #6b7280;
      font-weight: 500;
    }
    
    .detail-value {
      font-size: 15px;
      color: #1f2937;
      font-weight: 600;
    }
    
    .next-steps {
      margin-bottom: 32px;
    }
    
    .next-steps-title {
      font-size: 16px;
      font-weight: 600;
      color: #1f2937;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .next-steps-title svg {
      width: 20px;
      height: 20px;
      fill: #4379ba;
    }
    
    .steps-list {
      list-style: none;
      padding: 0;
    }
    
    .steps-list li {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 14px 0;
      border-bottom: 1px solid #f3f4f6;
      font-size: 15px;
      color: #4b5563;
      line-height: 1.5;
    }
    
    .steps-list li:last-child {
      border-bottom: none;
    }
    
    .step-number {
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, #4379ba 0%, #5a8fd4 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 600;
      color: #ffffff;
      flex-shrink: 0;
    }
    
    .cta-section {
      text-align: center;
      margin-bottom: 32px;
    }
    
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #4379ba 0%, #5a8fd4 100%);
      color: #ffffff;
      text-decoration: none;
      padding: 16px 40px;
      border-radius: 12px;
      font-size: 16px;
      font-weight: 600;
      box-shadow: 0 8px 24px rgba(67, 121, 186, 0.35);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(67, 121, 186, 0.45);
    }
    
    .cta-button::after {
      content: '→';
      margin-left: 10px;
      transition: transform 0.3s ease;
    }
    
    .cta-button:hover::after {
      transform: translateX(4px);
    }
    
    .closing-text {
      font-size: 16px;
      color: #4b5563;
      line-height: 1.7;
      margin-bottom: 24px;
      text-align: center;
    }
    
    .signature {
      text-align: center;
      padding-top: 24px;
      border-top: 1px solid #e5e7eb;
    }
    
    .signature-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 8px;
    }
    
    .signature-logo svg {
      width: 32px;
      height: 32px;
    }
    
    .signature-logo span {
      font-size: 20px;
      font-weight: 700;
      background: linear-gradient(135deg, #4379ba 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .signature p {
      font-size: 14px;
      color: #9ca3af;
    }
    
    .email-footer {
      background: #f9fafb;
      padding: 24px 40px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    
    .footer-text {
      font-size: 13px;
      color: #9ca3af;
      line-height: 1.6;
      margin-bottom: 12px;
    }
    
    .footer-links {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }
    
    .footer-links a {
      font-size: 13px;
      color: #6b7280;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    .footer-links a:hover {
      color: #4379ba;
    }
    
    .confetti {
      position: absolute;
      top: 20px;
      width: 8px;
      height: 8px;
      border-radius: 2px;
      animation: fall 3s ease-in-out infinite;
      z-index: 0;
    }
    
    @keyframes fall {
      0%, 100% { transform: translateY(0) rotate(0deg); opacity: 1; }
      50% { transform: translateY(20px) rotate(180deg); opacity: 0.7; }
    }
    
    .confetti:nth-child(1) { left: 10%; background: #fbbf24; animation-delay: 0s; }
    .confetti:nth-child(2) { left: 25%; background: #f472b6; animation-delay: 0.5s; }
    .confetti:nth-child(3) { left: 40%; background: #34d399; animation-delay: 1s; }
    .confetti:nth-child(4) { left: 55%; background: #60a5fa; animation-delay: 0.3s; }
    .confetti:nth-child(5) { left: 70%; background: #a78bfa; animation-delay: 0.8s; }
    .confetti:nth-child(6) { left: 85%; background: #fb923c; animation-delay: 1.2s; }
    
    @media (max-width: 600px) {
      body {
        padding: 20px 12px;
      }
      
      .email-header {
        padding: 36px 24px;
      }
      
      .email-header h1 {
        font-size: 24px;
      }
      
      .email-body {
        padding: 28px 24px;
      }
      
      .subscription-card {
        padding: 20px;
      }
      
      .detail-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }
      
      .email-footer {
        padding: 20px 24px;
      }
    }
  </style>
  <style>body { box-sizing: border-box; }</style>
  <script src="https://cdn.tailwindcss.com/3.4.17" type="text/javascript"></script>
  <script src="/_sdk/data_sdk.js" type="text/javascript"></script>
 </head>
 <body>
  <div class="email-container"><!-- Header -->
   <div class="email-header">
    <div class="confetti"></div>
    <div class="confetti"></div>
    <div class="confetti"></div>
    <div class="confetti"></div>
    <div class="confetti"></div>
    <div class="confetti"></div>
    <div class="celebration-icon">
     <svg viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" />
     </svg>
    </div>
    <h1 id="header-title">Subscription Activated!</h1>
    <p>Welcome to the family</p>
   </div><!-- Body -->
   <div class="email-body">
    <p class="greeting">Hello <strong id="owner-name">{ownerName}</strong>,</p>
    <p class="intro-text">Great news! Your subscription for <strong id="store-name">{storeName}</strong> has been successfully activated on <strong>The Mall</strong>. You're all set to start reaching customers!</p><!-- Subscription Details Card -->
    <div class="subscription-card">
     <div class="subscription-card-header">
      <svg viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8h16v10zm-6-1h4v-2h-4v2zm-8-4h4v-2H6v2zm0 4h8v-2H6v2z" />
      </svg><span>Subscription Details</span>
     </div>
     <div class="subscription-details">
      <div class="detail-row"><span class="detail-label">Plan</span> <span class="detail-value" id="plan-name">{plan}</span>
      </div>
      <div class="detail-row"><span class="detail-label">Amount Paid</span> <span class="detail-value">R{amount}</span>
      </div>
      <div class="detail-row"><span class="detail-label">Start Date</span> <span class="detail-value">{startDate}</span>
      </div>
     </div>
    </div><!-- Next Steps -->
    <div class="next-steps">
     <div class="next-steps-title">
      <svg viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L11 13.17l6.59-6.59L19 8l-8 9z" />
      </svg> Here's what to do next
     </div>
     <ul class="steps-list">
      <li><span class="step-number">1</span> <span>Complete your store profile with a compelling description and logo</span></li>
      <li><span class="step-number">2</span> <span>Add your products, services, or rental items to showcase</span></li>
      <li><span class="step-number">3</span> <span>Customize your store's appearance to match your brand</span></li>
      <li><span class="step-number">4</span> <span>Share your store link with customers and start selling!</span></li>
     </ul>
    </div><!-- CTA Button -->
    <div class="cta-section"><a href="{dashboardURL}" class="cta-button">Go to Dashboard</a>
    </div>
    <p class="closing-text">Thank you for choosing The Mall. We're thrilled to have you on board and can't wait to see your business flourish!</p><!-- Signature -->
    <div class="signature">
     <div class="signature-logo">
      <svg viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#4379ba" d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z" /> <path fill="#764ba2" d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      </svg><span>The Mall</span>
     </div>
     <p>Your marketplace partner</p>
    </div>
   </div><!-- Footer -->
   <div class="email-footer">
    <p class="footer-text">You're receiving this email because your subscription on The Mall has been activated.</p>
    <div class="footer-links"><a href="#">Help Center</a> <a href="#">Terms of Service</a> <a href="#">Privacy Policy</a> <a href="#">Unsubscribe</a>
    </div>
   </div>
  </div>
  <script>
    const defaultConfig = {
      greeting_name: '{ownerName}',
      store_name: '{storeName}',
      plan_name: '{plan}',
      background_color: '#667eea',
      header_color: '#4379ba',
      accent_color: '#22c55e',
      text_color: '#374151',
      button_color: '#4379ba',
      font_family: 'Inter'
    };

    async function onConfigChange(config) {
      const ownerName = config.greeting_name || defaultConfig.greeting_name;
      const storeName = config.store_name || defaultConfig.store_name;
      const planName = config.plan_name || defaultConfig.plan_name;
      const fontFamily = config.font_family || defaultConfig.font_family;
      
      document.getElementById('owner-name').textContent = ownerName;
      document.getElementById('store-name').textContent = storeName;
      document.getElementById('plan-name').textContent = planName;
      
      document.body.style.fontFamily = "Arial, Helvetica, sans-serif";
    }

    function mapToCapabilities(config) {
      return {
        recolorables: [
          {
            get: () => config.background_color || defaultConfig.background_color,
            set: (value) => {
              config.background_color = value;
              window.elementSdk.setConfig({ background_color: value });
            }
          },
          {
            get: () => config.header_color || defaultConfig.header_color,
            set: (value) => {
              config.header_color = value;
              window.elementSdk.setConfig({ header_color: value });
            }
          },
          {
            get: () => config.accent_color || defaultConfig.accent_color,
            set: (value) => {
              config.accent_color = value;
              window.elementSdk.setConfig({ accent_color: value });
            }
          },
          {
            get: () => config.text_color || defaultConfig.text_color,
            set: (value) => {
              config.text_color = value;
              window.elementSdk.setConfig({ text_color: value });
            }
          },
          {
            get: () => config.button_color || defaultConfig.button_color,
            set: (value) => {
              config.button_color = value;
              window.elementSdk.setConfig({ button_color: value });
            }
          }
        ],
        borderables: [],
        fontEditable: {
          get: () => config.font_family || defaultConfig.font_family,
          set: (value) => {
            config.font_family = value;
            window.elementSdk.setConfig({ font_family: value });
          }
        },
        fontSizeable: undefined
      };
    }

    function mapToEditPanelValues(config) {
      return new Map([
        ['greeting_name', config.greeting_name || defaultConfig.greeting_name],
        ['store_name', config.store_name || defaultConfig.store_name],
        ['plan_name', config.plan_name || defaultConfig.plan_name]
      ]);
    }

    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
      });
    }
  </script>
 <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9db3d3b755164ec8',t:'MTc3MzMyOTI4OS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
`;
