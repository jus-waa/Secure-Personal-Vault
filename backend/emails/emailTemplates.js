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
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #FFFBEB; overflow: hidden; height: 100vh; display: flex; justify-content: center; align-items: center; position: relative;">
  <div style="position: absolute; top: 24rem; right: -10rem; z-index: -1; background: linear-gradient(to top right, #fef9c3, #fdba74); border-radius: 50%; height: 16rem; width: 16rem;"></div>
  <div style="position: absolute; top: 12rem; right: -9rem; z-index: -1; background: linear-gradient(to top right, #fef9c3, #fdba74); border-radius: 50%; height: 20rem; width: 20rem;"></div>
  <div style="position: absolute; top: -5rem; right: -6rem; z-index: -1; background: linear-gradient(to top left, #fef9c3, #fdba74); border-radius: 50%; height: 20rem; width: 20rem;"></div>
  <div style="position: absolute; top: 0; right: -2rem; z-index: -1; background: linear-gradient(to top right, #fef9c3, #fdba74); border-radius: 50%; height: 24rem; width: 24rem;"></div>
  <div style="position: absolute; top: -12rem; right: 8rem; z-index: -1; background: linear-gradient(to top right, #fef9c3, #fdba74); border-radius: 50%; height: 24rem; width: 24rem;"></div>
  <div style="position: absolute; top: -12rem; right: 24rem; z-index: -1; background: linear-gradient(to top right, #fef9c3, #fdba74); border-radius: 50%; height: 16rem; width: 16rem;"></div>

  <div style="position: absolute; bottom: 24rem; left: -10rem; z-index: -1; background: linear-gradient(to bottom left, #fef9c3, #fdba74); border-radius: 50%; height: 16rem; width: 16rem;"></div>
  <div style="position: absolute; bottom: 12rem; left: -9rem; z-index: -1; background: linear-gradient(to bottom left, #fef9c3, #fdba74); border-radius: 50%; height: 20rem; width: 20rem;"></div>
  <div style="position: absolute; bottom: -5rem; left: -6rem; z-index: -1; background: linear-gradient(to bottom right, #fef9c3, #fdba74); border-radius: 50%; height: 20rem; width: 20rem;"></div>
  <div style="position: absolute; bottom: 0; left: -2rem; z-index: -1; background: linear-gradient(to bottom left, #fef9c3, #fdba74); border-radius: 50%; height: 24rem; width: 24rem;"></div>
  <div style="position: absolute; bottom: -12rem; left: 8rem; z-index: -1; background: linear-gradient(to bottom left, #fef9c3, #fdba74); border-radius: 50%; height: 24rem; width: 24rem;"></div>
  <div style="position: absolute; bottom: -12rem; left: 24rem; z-index: -1; background: linear-gradient(to bottom left, #fef9c3, #fdba74); border-radius: 50%; height: 16rem; width: 16rem;"></div>

  <div style="background: white; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); max-width: 600px; overflow: hidden;">
    <div style="background: #4cb5e6; padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Welcome, {Name}!</h1>
    </div>
    <div style="padding: 24px;">
      <p style="margin-top: 0;">Your SkyVault account is ready.</p>
      <p>This space is designed for securely <b>writing</b> and <b>storing</b> personal notes — including sensitive information like <b>passwords, reminders, or private thoughts.</b></p>
      <p>Always use a strong master password and avoid storing real credentials during testing.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="{dashboardURL}" style="background-color: #4cb5e6; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Go to Dashboard</a>
      </div>
      <p>Manage your notes confidently, knowing this project was built with security in mind.</p>
    </div>
     <div style="text-align: center; padding: 12px; font-size: 12px; color: #888; background-color: #f1f1f1;">
      Need help? Visit our <a href="" style="color: #4cb5e6; text-decoration: none;">Help Center</a>.    
    </div>
  </div>
</body>
</html>
`;

export const passwordResetSuccessTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset Successful</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #FFFBEB; overflow: hidden; height: 100vh; display: flex; justify-content: center; align-items: center; position: relative;">
  <div style="position: absolute; top: 24rem; right: -10rem; z-index: -1; background: linear-gradient(to top right, #fef9c3, #fdba74); border-radius: 50%; height: 16rem; width: 16rem;"></div>
  <div style="position: absolute; top: 12rem; right: -9rem; z-index: -1; background: linear-gradient(to top right, #fef9c3, #fdba74); border-radius: 50%; height: 20rem; width: 20rem;"></div>
  <div style="position: absolute; top: -5rem; right: -6rem; z-index: -1; background: linear-gradient(to top left, #fef9c3, #fdba74); border-radius: 50%; height: 20rem; width: 20rem;"></div>
  <div style="position: absolute; top: 0; right: -2rem; z-index: -1; background: linear-gradient(to top right, #fef9c3, #fdba74); border-radius: 50%; height: 24rem; width: 24rem;"></div>
  <div style="position: absolute; top: -12rem; right: 8rem; z-index: -1; background: linear-gradient(to top right, #fef9c3, #fdba74); border-radius: 50%; height: 24rem; width: 24rem;"></div>
  <div style="position: absolute; top: -12rem; right: 24rem; z-index: -1; background: linear-gradient(to top right, #fef9c3, #fdba74); border-radius: 50%; height: 16rem; width: 16rem;"></div>

  <div style="position: absolute; bottom: 24rem; left: -10rem; z-index: -1; background: linear-gradient(to bottom left, #fef9c3, #fdba74); border-radius: 50%; height: 16rem; width: 16rem;"></div>
  <div style="position: absolute; bottom: 12rem; left: -9rem; z-index: -1; background: linear-gradient(to bottom left, #fef9c3, #fdba74); border-radius: 50%; height: 20rem; width: 20rem;"></div>
  <div style="position: absolute; bottom: -5rem; left: -6rem; z-index: -1; background: linear-gradient(to bottom right, #fef9c3, #fdba74); border-radius: 50%; height: 20rem; width: 20rem;"></div>
  <div style="position: absolute; bottom: 0; left: -2rem; z-index: -1; background: linear-gradient(to bottom left, #fef9c3, #fdba74); border-radius: 50%; height: 24rem; width: 24rem;"></div>
  <div style="position: absolute; bottom: -12rem; left: 8rem; z-index: -1; background: linear-gradient(to bottom left, #fef9c3, #fdba74); border-radius: 50%; height: 24rem; width: 24rem;"></div>
  <div style="position: absolute; bottom: -12rem; left: 24rem; z-index: -1; background: linear-gradient(to bottom left, #fef9c3, #fdba74); border-radius: 50%; height: 16rem; width: 16rem;"></div>

  <div style="background: white; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); max-width: 600px; overflow: hidden;">
    <div style="background: #4cb5e6; padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">Password Updated</h1>
    </div>
    <div style="padding: 24px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <div style="background-color: #4cb5e6; color: white; width: 60px; height: 60px; line-height: 60px; border-radius: 50%; display: inline-block; font-size: 32px;">
          ✓
        </div>
      </div>
      <p>Your password has been successfully changed.</p>
      <p>You can now log in using your new password.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="" style="text-decoration: none; background-color: #4cb5e6; color: white; padding: 10px 20px; border-radius: 4px; font-weight: bold;">
          Go to Login
        </a>
      </div>
      <p style="font-size: 14px; color: #666;">If you didn't make this change, please <a href="" style="color: #4cb5e6; text-decoration: none;">contact support</a> immediately.</p>
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
    <p>Best regards,<br>Your App Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>This is an automated message, please do not reply to this email.</p>
  </div>
</body>
</html>
`;