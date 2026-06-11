import { randomBytes } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { createServer } from "node:http";

const DEFAULT_REDIRECT_URI = "http://127.0.0.1:8000/callback";
const SCOPE = "user-read-currently-playing user-read-recently-played";

function loadDotEnv() {
  if (!existsSync(".env")) return {};

  return Object.fromEntries(
    readFileSync(".env", "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const index = line.indexOf("=");
        const key = line.slice(0, index);
        let value = line.slice(index + 1);

        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        return [key, value];
      })
  );
}

function getArgValue(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

function sendHtml(res, statusCode, body) {
  res.writeHead(statusCode, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Spotify Token</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        background: #021137;
        color: #f2f7ff;
        font-family: system-ui, sans-serif;
      }
      main {
        max-width: 34rem;
        padding: 2rem;
        border-left: 6px solid #35e0ff;
        background: linear-gradient(135deg, #0d2fa0, #04102e);
      }
      code {
        color: #35e0ff;
      }
    </style>
  </head>
  <body>
    <main>${body}</main>
  </body>
</html>`);
}

const env = loadDotEnv();
const clientId = process.env.SPOTIFY_CLIENT_ID ?? env.SPOTIFY_CLIENT_ID;
const clientSecret =
  process.env.SPOTIFY_CLIENT_SECRET ?? env.SPOTIFY_CLIENT_SECRET;
const redirectUri =
  getArgValue("--redirect-uri") ??
  process.env.SPOTIFY_REDIRECT_URI ??
  env.SPOTIFY_REDIRECT_URI ??
  DEFAULT_REDIRECT_URI;

if (!clientId || !clientSecret) {
  console.error(
    "Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env."
  );
  process.exit(1);
}

const redirect = new URL(redirectUri);

if (redirect.protocol !== "http:") {
  console.error("This local helper expects an http:// redirect URI.");
  console.error(`Current redirect URI: ${redirectUri}`);
  process.exit(1);
}

const state = randomBytes(16).toString("hex");
const authorizeUrl = new URL("https://accounts.spotify.com/authorize");
authorizeUrl.search = new URLSearchParams({
  response_type: "code",
  client_id: clientId,
  scope: SCOPE,
  redirect_uri: redirectUri,
  state,
  show_dialog: "true",
}).toString();

const server = createServer(async (req, res) => {
  const callbackUrl = new URL(req.url ?? "/", redirectUri);

  if (callbackUrl.pathname !== redirect.pathname) {
    sendHtml(
      res,
      404,
      "<h1>Not Found</h1><p>Use the Spotify authorization URL from the terminal.</p>"
    );
    return;
  }

  const returnedState = callbackUrl.searchParams.get("state");
  const code = callbackUrl.searchParams.get("code");
  const error = callbackUrl.searchParams.get("error");

  if (error) {
    sendHtml(res, 400, `<h1>Spotify denied access</h1><p><code>${error}</code></p>`);
    server.close();
    return;
  }

  if (!code || returnedState !== state) {
    sendHtml(res, 400, "<h1>Invalid Spotify callback</h1>");
    server.close();
    return;
  }

  try {
    const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    const token = await tokenResponse.json();

    if (!tokenResponse.ok || !token.refresh_token) {
      console.error("Spotify token response:", token);
      sendHtml(
        res,
        500,
        "<h1>No refresh token returned</h1><p>Check the terminal for Spotify's response.</p>"
      );
      server.close();
      return;
    }

    console.log("\nAdd this to .env:\n");
    console.log(`SPOTIFY_REFRESH_TOKEN=${token.refresh_token}\n`);

    sendHtml(
      res,
      200,
      "<h1>Refresh token generated</h1><p>Copy the <code>SPOTIFY_REFRESH_TOKEN</code> value from your terminal into <code>.env</code>, then restart Next.</p>"
    );
  } catch (err) {
    console.error(err);
    sendHtml(res, 500, "<h1>Token exchange failed</h1>");
  } finally {
    server.close();
  }
});

server.listen(Number(redirect.port || 80), redirect.hostname, () => {
  console.log(`Listening on ${redirectUri}`);
  console.log("\nOpen this URL in your browser:\n");
  console.log(authorizeUrl.toString());
});
