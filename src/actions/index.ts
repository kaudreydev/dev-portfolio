import { defineAction } from "astro:actions";
import { contactMessage } from "~/types";
import { sendMessage } from "./sendMessage";

export const server = {
  send: defineAction({
    accept: "form",
    input: contactMessage,
    handler: sendMessage,
  }),
};
