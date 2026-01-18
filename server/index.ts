import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Mailchimp API endpoint
  app.post("/api/subscribe", async (req, res) => {
    const { email } = req.body;

    // Validate email
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

      // Mailchimp API endpoint
      const mailchimpUrl = `https://${mailchimpServerPrefix}.api.mailchimp.com/3.0/lists/${mailchimpListId}/members`;

      // Subscribe email to Mailchimp
      const response = await axios.post(
        mailchimpUrl,
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            // Optional: add merge fields here if needed
          },
        },
        {
          auth: {
            username: "anystring",
            password: mailchimpApiKey,
          },
        }
      );

      // Return success response
      return res.status(200).json({
        success: true,
        message: "Successfully subscribed to the mailing list",
        data: response.data,
      });
    } catch (error: any) {
      console.error("Mailchimp subscription error:", error.response?.data || error.message);

      // Handle specific Mailchimp errors
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

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
