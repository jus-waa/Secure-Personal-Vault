import { client, sender } from "./mailtrap.config.js"
import { 
    verificationEmailTemplate,
    welcomeEmailTemplate

 } from "./emailTemplates.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try {
        const res = await client.send({
            from: sender, 
            to: recipient,
            subject: "Email Verification Code",
            html: verificationEmailTemplate.replace("{verificationCode}", verificationToken),
            category: "Email Verification"
        });
 	    console.log("Email sent successfully", res);
	} catch (error) {
		console.error(`Error sending verification`, error);
		throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{email}]

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