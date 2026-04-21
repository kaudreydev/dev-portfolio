import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Spinner,
  Textarea,
} from "@components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { actions } from "astro:actions";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { contactMessage, type ContactMessage } from "~/types";

export default function ContactForm() {
  const [error, setError] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  const form = useForm<ContactMessage>({
    resolver: zodResolver(contactMessage),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const sendMessage = async (formData: ContactMessage) => {
    setError(false);
    setSending(true);

    try {
      const result = await actions.send(formData);

      if (!!result.data) setSent(true);
      else setError(true);
    } catch (error) {
      console.error(error);
    } finally {
      setSending(false);
    }
  };

  const formJsx = (
    <div id="contact-form-container" className="w-80 md:w-120 mx-auto mt-4">
      <form name="contact-form" onSubmit={form.handleSubmit(sendMessage)}>
        <div className="flex flex-col gap-2 justify-between">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="contact-form-name">Your Name</FieldLabel>
                <Input
                  {...field}
                  name="contact-form-name"
                  required
                  aria-required="true"
                  aria-invalid={fieldState.invalid}
                  placeholder="Joseph Sisko"
                  autoComplete="off"
                  maxLength={100}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="contact-form-email">
                  Your E-mail
                </FieldLabel>
                <Input
                  {...field}
                  name="contact-form-email"
                  type="email"
                  required
                  aria-required="true"
                  aria-invalid={fieldState.invalid}
                  placeholder="joseph.sisko@example.com"
                  autoComplete="off"
                  maxLength={150}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="subject"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="subject">Subject (optional)</FieldLabel>
                <Input
                  {...field}
                  name="subject"
                  aria-invalid={fieldState.invalid}
                  placeholder="Web Work Opportunity"
                  autoComplete="off"
                  maxLength={150}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="contact-form-message">Message</FieldLabel>
                <Textarea
                  {...field}
                  name="contact-form-message"
                  className="min-h-24"
                  required
                  aria-required="true"
                  aria-invalid={fieldState.invalid}
                  placeholder="Let's connect!"
                  autoComplete="off"
                  maxLength={500}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button
            name="contact-form-submit"
            type="submit"
            disabled={sending}
            className="w-16 ml-auto"
          >
            Send
            {sending && <Spinner data-icon="inline-start" />}
          </Button>
          {error && (
            <span className="text-right">Error! Please try again.</span>
          )}
        </div>
      </form>
    </div>
  );

  return (
    <div>
      {!sent ? (
        <div>
          <p className="mx-4 text-base">
            Feel free to send me a message using the contact form below and I'll
            get back to you as soon as possible!
          </p>
          {formJsx}
        </div>
      ) : (
        <div>
          <p className="mx-4 text-base">
            Thank you! Your message has been sent.
          </p>
        </div>
      )}
    </div>
  );
}
