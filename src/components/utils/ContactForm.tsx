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
      <div className="flex flex-col gap-2 justify-between">
        <Field>
          <FieldLabel htmlFor="name">Your Name</FieldLabel>
          <Input
            name="name"
            required
            aria-required="true"
            alt="Your Name field"
            maxLength={100}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Your E-mail</FieldLabel>
          <Input
            name="email"
            required
            aria-required="true"
            alt="Your E-mail field"
            maxLength={150}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="subject">Subject (optional)</FieldLabel>
          <Input
            name="subject"
            alt="Subject field (optional)"
            maxLength={150}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            name="message"
            required
            aria-required="true"
            className="min-h-24"
            title="Message field"
            maxLength={500}
          />
        </Field>
        <Button
          name="submit"
          type="submit"
          disabled={sending}
          className="w-16 ml-auto"
        >
          Send
          {sending && <Spinner data-icon="inline-start" />}
        </Button>
        {error && <span className="text-right">Error! Please try again.</span>}
      </div>
    </form>
  );

  const sentJsx = <span>Success!</span>;

  return (
    <div id="contactForm" className="w-80 md:w-120 mx-auto mt-4">
      {!sent ? formJsx : sentJsx}
    </div>
  );
}
