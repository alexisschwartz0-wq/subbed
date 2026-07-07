const FROM = "Subbed <notifications@getsubbed.co>";

function emailShell(heading: string, body: string, ctaHref: string, ctaLabel: string) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#CEDFDF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#CEDFDF;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="padding:32px 32px 8px;text-align:center;">
                <span style="font-size:20px;font-weight:800;letter-spacing:-0.02em;color:#0E0E0E;">Sub<span style="color:#8FB8CA;">bed</span></span>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px;">
                <h1 style="margin:0 0 12px;font-size:18px;font-weight:800;color:#0E0E0E;">${heading}</h1>
                <p style="margin:0 0 24px;font-size:14px;line-height:1.6;font-weight:300;color:rgba(14,14,14,0.7);">${body}</p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="border-radius:999px;background:#8FB8CA;">
                      <a href="${ctaHref}" style="display:inline-block;padding:10px 24px;font-size:14px;font-weight:500;color:#ffffff;text-decoration:none;">${ctaLabel}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 32px;">
                <p style="margin:0;font-size:12px;color:rgba(14,14,14,0.4);">© 2026 Subbed.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(`RESEND_API_KEY not set — skipping email "${subject}" to ${to}`);
    return;
  }

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to, subject, html }),
    });
  } catch (err) {
    console.error(`Failed to send email "${subject}" to ${to}:`, err);
  }
}

export async function sendJobApplicationNotification(
  to: string,
  instructorName: string,
  listingTitle: string,
) {
  const heading = "New interest in your listing";
  const body = `${instructorName} applied to "${listingTitle}" on Subbed. Sign in to view their profile and reply.`;
  await sendEmail(
    to,
    `${instructorName} applied to your listing on Subbed`,
    emailShell(heading, body, "https://app.getsubbed.co/dashboard/jobs", "View applicant"),
  );
}

export async function sendProfileViewedNotification(
  to: string,
  studioName: string,
  listingTitle: string,
) {
  const heading = "A studio viewed your profile";
  const body = `${studioName} viewed your profile after you applied to "${listingTitle}". Sign in to check for a reply.`;
  await sendEmail(
    to,
    `${studioName} viewed your profile on Subbed`,
    emailShell(heading, body, "https://app.getsubbed.co/dashboard/messages", "View conversation"),
  );
}
