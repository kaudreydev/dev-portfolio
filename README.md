# Dev Portfolio Site

This portfolio site, originally created for [KAudreyDev](https://github.com/kaudreydev), is built on [Astro](https://astro.build) using [React integration](https://docs.astro.build/en/guides/integrations-guide/react/) for client interactions. I decided to use Astro for my own learning, as I'd mostly used Next.js before and wanted to try something different this time.

I chose to use the [Astronaut](https://astro.build/themes/details/astronaut/) theme created by [Steve Frenzel](https://www.stevefrenzel.dev), as the theme provides a solid base to start an Astro app that includes considerations for accessibility and usability, which are important to me. Check out [the theme on Codeberg](https://codeberg.org/stvfrnzl/astro-naut) for all the details.

Sharing is caring so please feel free to use and customize this repo to create your own portfolio site, or start from scratch with Steve's Astronaut theme for Astro :)

# Getting Started

1. Clone the repository locally.
2. From the project directory, run `pnpm install`. (See [here](https://pnpm.io/pnpm-vs-npm) for reasons to use pnpm over npm.)
3. Once installation is finished, run `pnpm start` to start the local dev server.

# Customizing the Content

Most of the text and information displayed on the site is stored in markdown and JSON collections within the `src/content` directory. You can edit these files to populate them with your own information such as skills, experience, and projects. All information is strongly typed according to the types defined in `src/types.ts`.

- `about.md` - The content of this file is inserted directly into the About section. For my site, it contains my name and a short blurb about me.
- `contact.json` - A list of contact links that will be used to create `IconLink` components. The icons are stored and referenced from the `src/images` directory and must be in SVG format.
- `experience.json` - A list of jobs with the company, position title, year(s), and list of job details.
- `projects.json` - A list of projects with the company, project name, year(s), list of project details, and list of technologies used. The list of available technologies is found in `src/types.ts` if you need to expand it.
- `site.json` - Stores site metadata including title and description.
- `skills.json` - A list of skills including the skill name, icon name from [Simple Icons](https://simpleicons.org/), proficiency level from 0-3 (Familiar, Growing, Skilled, Expert), and years of experience. Note that Simple Icons does not have a complete collection of brand icons so you may need to source some on your own.

# Configuring the Contact Form

The contact form is a more complex component that requires configuration using [environment variables](https://docs.astro.build/en/guides/environment-variables/#env-files). Follow the steps below to get set up.

1. Sign up with [Resend](https://resend.com) and create an API key.
2. Create a file named `.env` in the root of the project directory.
3. Add the following keys with whatever values you wish to use:

```
EMAIL_SITE="Your Name <noreply@example.com>"
EMAIL_OWNER=your_email@example.com
RESEND_API_KEY=your_Resend_API_key
SITE_URL=https://yoursite.url/
```

- `EMAIL_SITE` will be used as the sender for e-mails sent from the site.
- `EMAIL_OWNER` will be used for the 'reply to' address on the confirmation e-mail, and will also be sent a notification containing message details when a contact message is submitted.
- `SITE_URL` is used for the Astro config and server headers and defaults to `https://localhost:4321/`

Feel free to customize the e-mail settings or format as you see fit!

# Credits

- Site developed using the [Astronaut](https://astro.build/themes/details/astronaut/) theme for Astro created by [Steve Frenzel](https://www.stevefrenzel.dev)
- Site header clipped from the [Void](https://astro.build/themes/details/void/) theme for Astro created by [Jorge Rosbel](https://github.com/JorgeRosbel)
- Site design inspired by portfolio sites for [Brittany Chiang](https://brittanychiang.com) and [Monica
  Dinculescu](https://meowni.ca)
- My wonderful partner [Kristine Horn](https://www.linkedin.com/in/krin-horn/), who helped me with organization, planning, testing, and accessibility. An extremely caring and talented individual any company would be lucky to have on their staff!
- Our darling kitties Felix and Pixel, whose company and emotional support helped make this project happen.
