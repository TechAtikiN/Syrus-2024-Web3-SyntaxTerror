import { stat } from "fs";
import { createTransport } from "nodemailer";

const transporter = createTransport({
    service: "gmail",
  auth: {
      user: "patiljanhavi69@gmail.com",
      pass: "avlr wpvo ecgp basa",
    },
});

// @ts-ignore
export default async function handler(req, res) {
    const { email,  tokenId } = req.body;
    console.log('email',email, tokenId);
    // html template for mail being sent to organization
    let plantiffMailFormattedHtml = ``;

        plantiffMailFormattedHtml = `<h2>Created new case for ${email}</h2>
        <p><strong>You can track your case here</strong>
        <a href="https://nyay-setu-user.vercel.app?token=${tokenId}">Track your case</a>
        `;

    const plaintiffMailData = {
        from: 'patiljanhavi69@gmail.com', // sender address
        to: email,
        subject: "Case registred under NyaySetu", // subject line
        html: plantiffMailFormattedHtml, // html body
    };

    try {
      const plaintiffMailInfo = await transporter.sendMail(plaintiffMailData); // trigger mail request to us
      console.log("plaintiffMailInfo",plaintiffMailInfo);
        return res.status(200).end(
            JSON.stringify({
                message: "Success",
                reqMessageId: plaintiffMailInfo.messageId,
            })
        );
    } catch (err) {
      console.log("err",err);
        return res.status(500).end(
            JSON.stringify({
                message: "Could not send mail",
            })
        );
    }
}
