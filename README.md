  <h1 align="center">Black Oceane AI Chatbot</h1>

<p align="center">
  An open-source AI chatbot app template built with Next.js, the Vercel AI SDK and OpenAI 
</p>

<br/>

## Features

- [Next.js](https://nextjs.org) App Router
- React Server Components (RSCs), Suspense, and Server Actions
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming chat UI
- Support for OpenAI (default), Anthropic, Hugging Face, or custom AI chat models and/or LangChain
- Edge runtime-ready
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - [Radix UI](https://radix-ui.com) for headless component primitives
  - Icons from [Phosphor Icons](https://phosphoricons.com)

## Model Providers

This template ships with OpenAI `gpt-3.5-turbo` as the default.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Black Oceane AI Chatbot. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.

```bash
npm install
npm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).

## Authors

This app is created by:

- Alex ([@AlekssRG](https://twitter.com/AlekssRG))
