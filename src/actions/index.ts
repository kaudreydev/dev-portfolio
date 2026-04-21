import { defineAction } from "astro:actions";
import { contactMessage } from "~/types";
import { sendMessage } from "./sendMessage";

export const server = {
  send: defineAction({
    accept: "json",
    input: contactMessage,
    handler: sendMessage,
  }),
};
