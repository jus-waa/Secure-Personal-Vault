import { client, sender } from "./email.config.js"
import { 
    verificationEmailTemplate,
    welcomeEmailTemplate,
    passwordResetRequestTemplate,
    passwordResetSuccessTemplate,
 } from "./emailTemplates.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const mailOptions = await client.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email, 
            subject: "Verify Your Email",
            html: verificationEmailTemplate.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });    
        console.log("Email sent successfully", mailOptions);
    } catch (error) {
        console.error("Error sending email", error);
        throw new Error("Email failed: " + error.message);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    try {
        const mailOptions = await client.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Welcome!",
            html: welcomeEmailTemplate.replace("{name}", name),
            category: "Welcome Email"
        });
 	    console.log("Email sent successfully", mailOptions);
	} catch (error) {
		console.error(`Error sending welcome email`, error);
		throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    try {
        const mailOptions = await client.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Password Reset",
            html: passwordResetRequestTemplate.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });
 	    console.log("Email sent successfully", mailOptions);
    } catch (error) {
        console.error(`Error sending password reset`, error);
		throw new Error(`Error sending password reset: ${error}`);
    }
}

export const sendResetSuccessEmail = async (email) => {
    try {
        const mailOptions = await client.sendMail({
            from: `"${sender.name}" <${sender.email}>`,
            to: email,
            subject: "Password Reset Successful",
            html: passwordResetSuccessTemplate,
            category: "Password Reset"
        })
        console.log("Email sent successfully", mailOptions);
    } catch (error) {
        console.error(`Error sending password reset`, error);
		throw new Error(`Error sending password reset: ${error}`);
    }
}