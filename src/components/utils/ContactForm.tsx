import {
  Button,
  Field,
  FieldLabel,
  Input,
  Spinner,
  Textarea,
} from "@components/ui";
import { actions } from "astro:actions";
import { useState, type SubmitEvent } from "react";

export default function ContactForm() {
  const [error, setError] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  const sendMessage = async (formElem: HTMLFormElement) => {
    const formData = new FormData(formElem);

    setError("");
    setSending(true);

    try {
      const result = await actions.send(formData);

      if (!!result.data) setSent(true);
      else setError(JSON.stringify(result.error));
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const formJsx = (
    <form
      name="contactForm"
      onSubmit={(e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendMessage(e.currentTarget);
      }}
    >
      <Field>
        <FieldLabel htmlFor="name">Your Name</FieldLabel>
        <Input name="name" />
      </Field>
      <Field>
        <FieldLabel htmlFor="email">Your E-mail</FieldLabel>
        <Input name="email" />
      </Field>
      <Field>
        <FieldLabel htmlFor="subject">Subject (optional)</FieldLabel>
        <Input name="subject" />
      </Field>
      <Field>
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <Textarea name="message" />
      </Field>
      <Button name="submit" type="submit" disabled={sending}>
        Send
        {sending && <Spinner data-icon="inline-start" />}
      </Button>
      {error && <span>Error! Please try again.</span>}
    </form>
  );

  const sentJsx = <span>Success!</span>;

  return <div id="contactForm">{!sent ? formJsx : sentJsx}</div>;
}
