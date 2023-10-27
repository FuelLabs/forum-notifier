# Forum Handler

This project uses Vercel serverless functions and is written in TypeScript. The project includes handlers for processing "post" and "topic" events.

## Requirements

- Node.js (v18 or later recommended)
- npm (v6 or later recommended)
- Vercel CLI (v32 or later recommended)
- ngrok (v3 recommended)

## Setup

1. Clone the repository:

   ```
   git clone git@github.com:FuelLabs/forum-notifier.git
   ```

2. Navigate into the project directory:

   ```
   cd forum-notifier
   ```

3. Install the dependencies:

   ```
   npm install
   ```

## Local Development

To start the local development server, run:

```
vercel dev
```

This starts the server on `localhost:3000`.

To expose your local server to the internet for testing with external services, use `ngrok`. First, install `ngrok` globally:

```
npm install -g ngrok
```

Then, in a separate terminal window, run:

```
ngrok http 3000
```

`ngrok` will provide a URL that you can use to access your local server from the internet.

To test your serverless functions, you can make POST requests to `http://localhost:3000/api/handler` (or the corresponding `ngrok` URL). The functions expect the `x-discourse-event-type` header to be set to either `'post'` or `'topic'`.

## Deployment

To deploy your project to Vercel, run:

```
vercel
```

This command builds and deploys your project, and provides a live URL where you can access it.

## Signature

Set the `FORUM_SECRET` env var to be the same as the discourse webhook secret.

## Contributing

If you wish to contribute to this project, please first create an issue to discuss the change you wish to make before making a change.

## To do

- [x] Basic function boilerplate
- [x] Test scripts
- [x] Notion Api
- [x] Handle Event Create ticket
- [x] Handle Event Update ticket
- [x] Handle Event New Comment 
- [x] Handle Event Closed 
- [x] Handle Event reOpen  
- [x] Handle Event Admin Commented
- [x] TicketEvent logger
- [ ] Standard http response object
- [ ] Error codes and msgs constants
- [ ] Data analytics for TicketEvent logs
- [ ] Data analytics dashboard
- [x] Handle comments for old topics

