export const verificationEmailTemplate = `
<!DOCTYPE html> 
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Email</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: white; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); max-width: 600px; overflow: hidden;">
    <div style="background: #4cb5e6; padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Verify Your Email</h1>
    </div>
    <div style="padding: 24px;">
      <p style="margin-top: 0;">Hello,</p>
      <p>Thank you for signing up. To complete your registration, please use the verification code below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4cb5e6;">{verificationCode}</span>
      </div>
      <p>Enter this code on the verification screen to complete your registration..</p>
      <p>For your security, this code will expire in 10 minutes.</p>
      <p>Didn’t request this? You can safely ignore this message..</p>
      <p style="margin-bottom: 0;">Thanks,<br>The SkyVault Team</p>
    </div>
    <div style="text-align: center; padding: 12px; font-size: 12px; color: #888; background-color: #f1f1f1;">
      Need help? Visit our <a href="" style="color: #4cb5e6; text-decoration: none;">Help Center</a>.    
    </div>
  </div>
</body>
</html>
`;

export const welcomeEmailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to SkyVault</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: white; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); max-width: 600px; overflow: hidden;">
    <div style="background: #4cb5e6; padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Welcome, {name}!</h1>
    </div>
    <div style="padding: 24px;">
      <p style="margin-top: 0;">Your SkyVault account is ready.</p>
      <p>This space is designed for securely <b>writing</b> and <b>storing</b> personal notes — including sensitive information like <b>passwords, reminders, or private thoughts.</b></p>
      <p>Always use a strong master password and avoid storing real credentials during testing.</p>
      <p>Manage your notes confidently, knowing this project was built with security in mind.</p>
      <p style="margin-bottom: 0;">Thanks,<br>The SkyVault Team</p>
    </div>
    <div style="text-align: center; padding: 12px; font-size: 12px; color: #888; background-color: #f1f1f1;">
      Need help? Visit our <a href="" style="color: #4cb5e6; text-decoration: none;">Help Center</a>.
    </div>
  </div>
</body>
</html>
`;

export const passwordResetRequestTemplate = `
<!DOCTYPE html> 
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: white; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); max-width: 600px; overflow: hidden;">
    <div style="background: #4cb5e6; padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Password Reset</h1>
    </div>
    <div style="padding: 24px;">
      <p style="margin-top: 0;">Hello,</p>
      <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
      <p>To reset your password, click the button below:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="{resetURL}" style="background-color: #4cb5e6; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
      </div>
      <p>This link will expire in 1 hour for security reasons.</p>
      <p>If you have any issues, feel free to reach out to our support team.</p>
      <p style="margin-bottom: 0;">Best regards,<br>Your App Team</p>
    </div>
    <div style="text-align: center; padding: 12px; font-size: 12px; color: #888; background-color: #f1f1f1;">
      This is an automated message, please do not reply.
    </div>
  </div>
</body>
</html>
`;



export const passwordResetSuccessTemplate = `
<!DOCTYPE html> 
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: white; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); max-width: 600px; overflow: hidden;">
    <div style="background: #4cb5e6; padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Password Reset Successful</h1>
    </div>
    <div style="padding: 24px;">
      <p style="margin-top: 0;">Hello,</p>
      <p>We're writing to confirm that your password has been successfully reset.</p>
      <div style="text-align: center; margin: 30px 0;">
        <div style="background-color: #4cb5e6; color: white; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; display: inline-block; font-size: 32px;">
          ✓
        </div>
      </div>
      <p>If you did not initiate this password reset, please contact our support team immediately.</p>
      <p>For your security, we recommend the following:</p>
      <ul style="padding-left: 20px; margin-top: 10px;">
        <li>Use a strong, unique password</li>
        <li>Enable two-factor authentication</li>
        <li>Avoid reusing passwords across different websites</li>
      </ul>
      <p>Thank you for helping us keep your account secure.</p>
      <p style="margin-bottom: 0;">Best regards,<br>Your App Team</p>
    </div>
    <div style="text-align: center; padding: 12px; font-size: 12px; color: #888; background-color: #f1f1f1;">
      This is an automated message, please do not reply.
    </div>
  </div>
</body>
</html>
`;
