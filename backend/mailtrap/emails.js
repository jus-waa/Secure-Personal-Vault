import { client, sender } from "./email.config.js"
import { 
    verificationEmailTemplate,
    welcomeEmailTemplate,
    passwordResetRequestTemplate,
 } from "./emailTemplates.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const mailOptions = {
            from: `"${sender.name}" <${sender.email}>`,
            to: email, 
            subject: "Verify Your Email",
            html: verificationEmailTemplate.replace("{verificationCode}", verificationToken),
            text: `Your verification code is: ${verificationToken}`,
        };    
        const res = await client.sendMail(mailOptions);
        console.log("Email sent successfully", res);
    } catch (error) {
        console.error("Error sending email", error);
        throw new Error("Email failed: " + error.message);
    }
};


export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}];

    try {
        const res = await client.send({
            from: sender, 
            to: recipient,
            subject: "Welcome!",
            html: welcomeEmailTemplate.replace("{name}", name),
            category: "Welcome Email"
        });
 	    console.log("Email sent successfully", res);
	} catch (error) {
		console.error(`Error sending welcome email`, error);
		throw new Error(`Error sending welcome email: ${error}`);
    }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{email}];

    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: "Password Reset",
            html: passwordResetRequestTemplate.replace("{resetURL}", resetURL),
            category: "Password Reset",
        })
    } catch (error) {
        console.error(`Error sending password reset`, error);
		throw new Error(`Error sending password reset: ${error}`);
    }
}