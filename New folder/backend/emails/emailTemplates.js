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
      If you didn’t create an account with The Mall, you can safely ignore this email.
    </p>

    <p style="font-size:16px; margin-bottom:4px;">
      — The Mall Team
    </p>

    <!-- Footer -->
    <hr style="border:none; border-top:1px solid #eee; margin:32px 0;" />

    <p style="font-size:13px; color:#888; line-height:1.6;">
      You’re receiving this email because a new account was created using this email address.
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
      You’re Early. And That Matters.
    </h1>

    <p style="font-size:16px; margin-bottom:24px; color:#444;">
      Welcome,
    </p>

    <p style="font-size:16px; line-height:1.7; margin-bottom:16px;">
      Welcome to <strong>The Mall</strong>.
    </p>

    <p style="font-size:16px; line-height:1.7; margin-bottom:16px;">
      We’re genuinely excited to have you here at this early stage. The Mall isn’t just another marketplace — it’s a platform built to give businesses of all kinds the space and tools to create strong brands and grow online, without limits.
    </p>

    <p style="font-size:16px; line-height:1.7; margin-bottom:16px;">
      Right now, access is open to vendors and sellers — whether you sell products, offer services, manage rentals, or run something unique.
    </p>

    <p style="font-size:16px; line-height:1.7; margin-bottom:20px;">
      You’re early. And that matters.
    </p>

    <!-- Bullet Section -->
    <div style="margin-bottom:28px;">
      <p style="font-weight:600; margin-bottom:10px;">Here’s what you can do right now:</p>
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
      We’re still building. Still improving. Still expanding. And we’re excited to grow alongside you.
    </p>

    <p style="font-size:16px; margin-bottom:4px;">
      — The Mall Team
    </p>

    <!-- Footer -->
    <hr style="border:none; border-top:1px solid #eee; margin:32px 0;" />

    <p style="font-size:13px; color:#888; line-height:1.6;">
      You’re receiving this email because you signed up for The Mall.
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
      Now it’s time to bring it to life. Style it. Add your products, services, rentals — whatever you’re selling. Make it yours.
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
      Let’s build momentum.
    </p>

    <p style="font-size:16px; margin-bottom:4px;">
      — The Mall Team
    </p>

    <!-- Footer -->
    <hr style="border:none; border-top:1px solid #eee; margin:32px 0;" />

    <p style="font-size:13px; color:#888; line-height:1.6;">
      You’re receiving this email because you created a store on The Mall.
    </p>

  </div>

</body>
</html>
`;

