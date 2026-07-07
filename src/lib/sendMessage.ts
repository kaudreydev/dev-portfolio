import { Resend, type CreateEmailResponseSuccess } from "resend";
import { type ContactMessage } from "~/types";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const emailSite = import.meta.env.EMAIL_SITE;
const emailOwner = import.meta.env.EMAIL_OWNER;

// Send e-mail to site owner
async function sendToOwner({
  name,
  email,
  subject,
  message,
}: ContactMessage): Promise<CreateEmailResponseSuccess> {
  const emailToOwner = {
    from: emailSite,
    to: emailOwner,
    replyTo: email,
    subject: `Profile Contact Message From ${name} - "${subject}"`,
    html: `
            <b>Name:</b> ${name}<br />
            <b>E-mail:</b> ${email}<br />
            <br />
            <b>Subject:</b> ${subject}<br />
            <b>Message:</b> <p>"${message}"</p>
        `,
  };

  console.log("E-mail to Owner: ", emailToOwner);

  const { data, error } = await resend.emails.send(emailToOwner);

  if (error) {
    console.error("OwnerMail Failed: ", error.message);
    throw new Error(error.message);
  } else {
    console.log("E-mail sent to Owner! Data: ", data);
  }

  return data;
}

// Send e-mail to message sender
async function sendToSender({
  name,
  email,
}: ContactMessage): Promise<CreateEmailResponseSuccess> {
  const emailToSender = {
    from: emailSite,
    to: email,
    replyTo: emailOwner,
    subject: `Thanks for contacting KAudreyDev!`,
    html: `
        Hi ${name}, thanks for reaching out!<br />
        <br />  
        Your message has been received. You can reply to this e-mail if you have anything else you'd like to add.<br />
        I'll be sure to get back to you within 24-48 hours. Talk to you soon!<br />
        <br />
        Kind regards,<br />
        <br />
        Kathryn Audrey (KAudreyDev)<br />
        Full-Stack Software Engineer<br />
        ${emailOwner}<br />
        https://kaudrey.dev/
          `,
  };

  console.log("E-mail to Sender: ", emailToSender);

  const { data, error } = await resend.emails.send(emailToSender);

  if (error) {
    console.error("SenderMail Failed: ", error.message);
    throw new Error(error.message);
  } else {
    console.log("E-mail sent to Sender! Data: ", data);
  }

  return data;
}

export const sendMessage = async (messageData: ContactMessage) => {
  const ownerResult = await sendToOwner(messageData);
  const senderResult = await sendToSender(messageData);

  return [ownerResult, senderResult];
};
