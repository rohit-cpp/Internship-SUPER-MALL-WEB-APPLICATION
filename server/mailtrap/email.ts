import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./htmlEmail";
import { client, sender } from "./mailtrap";
export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    const recipient = [
      {
        email
      }
    ];
try {
    const res = await client
  .send({
    from: sender,
    to: recipient,
    subject: "Verify your email",
    html:htmlContent.replace("{verificationToken}", verificationToken),
    category: "Email verification",
  })
  .then(console.log, console.error);

} catch (error) {
    console.log(error);
    throw new Error("Failed to send email verification")
    
}
}

export const sendWelcomeEmail = async (email: string, name: string) => {
    
   
    const recipient = [
        {
            email
        }
    ];
 const htmlContent = generateWelcomeEmailHtml(name);
    try {
        const res = await client
            .send({
                from: sender,
                to: recipient,
                subject: "Welocme to Epql",
                // text: "Congrats for sending test email with Mailtrap!",
                html: htmlContent,
                template_variables: {
                    company_info_name: "eqpl",
                    name: name
                }
   
            });

    } catch (error) {
        console.log(error);
        throw new Error("Failed to send welcome email")
    
    }
};

export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
   const recipient = [
        {
            email
        }
    ];
    const htmlContent = generatePasswordResetEmailHtml(resetURL);
    try{
    const res = await client
            .send({ 
                from: sender,
                to: recipient,
                subject: "Reset your password",
                // text: "Congrats for sending test email with Mailtrap!",
                html: htmlContent,
                category: "Reset Password"
            });

    } catch (error) {
        console.log(error);
        throw new Error("Failed to reset password")
    
    }
};

export const sendResetSuccessEmail = async (email: string) => {
   const recipient = [
        {
            email
        }
    ];
    const htmlContent = generateResetSuccessEmailHtml();
    try{
    const res = await client
            .send({
                from: sender,
                to: recipient,
                subject: "Password reset successfully",
                // text: "Congrats for sending test email with Mailtrap!",
                html: htmlContent,
                category: "Password Reseted"
            });

    } catch (error) {
        console.log(error);
        throw new Error("Failed to send password reset success email")
    
    }
};