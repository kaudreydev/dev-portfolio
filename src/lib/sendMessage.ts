import htmlReplace from "@lib/html-replace";
import emailTemplateOwner from "@templates/emailOwner.html?raw";
import emailTemplateSender from "@templates/emailSender.html?raw";
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
    subject: `Profile Contact Message From ${name} - ${subject ? `"${subject}"` : "(No Subject)"}`,
    html: htmlReplace(
      emailTemplateOwner,
      name,
      email,
      subject || "(No Subject)",
      message.replaceAll("\n", "<br />"),
    ),
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
  subject,
  message,
}: ContactMessage): Promise<CreateEmailResponseSuccess> {
  const emailToSender = {
    from: emailSite,
    to: email,
    replyTo: emailOwner,
    subject: `Thanks for contacting KAudreyDev!`,
    html: htmlReplace(
      emailTemplateSender,
      name,
      emailOwner,
      new Date(Date.now()).toString(),
      subject ? `&quot;${subject}&quot;` : "(No Subject)",
      message.replaceAll("\n", "<br />"),
    ),
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
