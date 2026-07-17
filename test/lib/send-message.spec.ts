import sendMessage from "@lib/send-message";
import { expect, test } from "vitest";
import type { ContactMessage } from "~/types";

const resendTestRecipient = "delivered@resend.dev";
const guidRegEx =
  /(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})/;

test("able to send e-mails using Resend", async () => {
  const testMessage = {
    name: "Send Message Test",
    email: resendTestRecipient,
    subject: "Send Message Test",
    message: "Send Message Test",
  } as ContactMessage;

  const [ownerResult, senderResult] = await sendMessage(testMessage);

  expect(ownerResult.id).toMatch(guidRegEx);
  expect(senderResult.id).toMatch(guidRegEx);
});
