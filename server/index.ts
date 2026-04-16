import express from "express";
import fs from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import axios from "axios";
import { LEGACY_ROUTE_REDIRECTS, SITE_URL, escapeHtml, getSeoEntry } from "../shared/seo";
import { getStructuredData } from "../shared/structuredData";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function buildAnalyticsScript() {
  const endpoint = process.env.VITE_ANALYTICS_ENDPOINT;
  const websiteId = process.env.VITE_ANALYTICS_WEBSITE_ID;

  if (!endpoint || !websiteId) {
    return "";
  }

  return `<script defer src="${escapeHtml(endpoint)}/umami" data-website-id="${escapeHtml(websiteId)}"></script>`;
}

function injectSeoTemplate(template: string, pathname: string) {
  const seo = getSeoEntry(pathname);
  const structuredData = JSON.stringify(getStructuredData(pathname));

  const replacements: Record<string, string> = {
    "__SEO_TITLE__": escapeHtml(seo.title),
    "__SEO_DESCRIPTION__": escapeHtml(seo.description),
    "__SEO_CANONICAL__": escapeHtml(seo.canonicalUrl),
    "__SEO_OG_TITLE__": escapeHtml(seo.title),
    "__SEO_OG_DESCRIPTION__": escapeHtml(seo.description),
    "__SEO_OG_URL__": escapeHtml(seo.openGraphUrl),
    "__SEO_OG_IMAGE__": escapeHtml(seo.openGraphImage),
    "__SEO_OG_TYPE__": escapeHtml(seo.type ?? "website"),
    "__SEO_TWITTER_TITLE__": escapeHtml(seo.title),
    "__SEO_TWITTER_DESCRIPTION__": escapeHtml(seo.description),
    "__SEO_TWITTER_URL__": escapeHtml(seo.twitterUrl),
    "__SEO_TWITTER_IMAGE__": escapeHtml(seo.twitterImage),
    "__SEO_STRUCTURED_DATA__": structuredData,
    "__ANALYTICS_SCRIPT__": buildAnalyticsScript(),
  };

  return Object.entries(replacements).reduce(
    (html, [placeholder, value]) => html.replaceAll(placeholder, value),
    template
  );
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.set("trust proxy", true);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    const host = (req.get("host") || "").toLowerCase();

    if (host === "www.iambecomingbooks.com") {
      return res.redirect(301, `${SITE_URL}${req.originalUrl}`);
    }

    next();
  });

  app.post("/api/subscribe", async (req, res) => {
    const { email } = req.body;

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    try {
      const mailchimpApiKey = process.env.MAILCHIMP_API_KEY;
      const mailchimpListId = process.env.MAILCHIMP_LIST_ID;
      const mailchimpServerPrefix = process.env.MAILCHIMP_SERVER_PREFIX || "us1";

      if (!mailchimpApiKey || !mailchimpListId) {
        console.error("Mailchimp credentials not configured");
        return res.status(500).json({
          error: "Email service not configured. Please contact support.",
        });
      }

      const mailchimpUrl = `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`;

      const response = await axios.post(
        mailchimpUrl,
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {},
        },
        {
          auth: {
            username: "anystring",
            password: mailchimpApiKey,
          },
        }
      );

      return res.status(200).json({
        success: true,
        message: "Successfully subscribed to the mailing list",
        data: response.data,
      });
    } catch (error: any) {
      console.error("Mailchimp subscription error:", error.response?.data || error.message);

      if (error.response?.status === 400) {
        const mailchimpError = error.response.data;
        if (mailchimpError.title === "Member Exists") {
          return res.status(200).json({
            success: true,
            message: "You are already subscribed to our mailing list",
          });
        }
      }

      return res.status(500).json({
        error: "Failed to subscribe. Please try again later.",
      });
    }
  });

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  const indexTemplatePath = path.join(staticPath, "index.html");
  const indexTemplate = fs.readFileSync(indexTemplatePath, "utf8");

  app.use(
    express.static(staticPath, {
      index: false,
      extensions: false,
    })
  );

  app.get("*", (req, res) => {
    const requestedPath = req.path === "/" ? "/" : req.path.replace(/\/+$/, "");
    const redirectTarget = LEGACY_ROUTE_REDIRECTS[requestedPath as keyof typeof LEGACY_ROUTE_REDIRECTS];

    if (redirectTarget) {
      return res.redirect(301, redirectTarget);
    }

    const html = injectSeoTemplate(indexTemplate, requestedPath);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(200).send(html);
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
