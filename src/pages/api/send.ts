import sendMessage from "~/lib/send-message";
import type { APIRoute } from "astro";
import type { ContactMessage } from "~/types";

export const POST = (async ({ request }) => {
  const { formData } = (await request.json()) satisfies ContactMessage;

  let result = null;

  try {
    result = await sendMessage(formData);
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      { status: 400 },
    );
  }

  return new Response(JSON.stringify({ data: result }));
}) satisfies APIRoute;
