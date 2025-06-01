import { client, sender } from "../mailtrap/mailtrap.config.js"
import { verificationEmailTemplate } from "../mailtrap/emailTemplates.js"

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