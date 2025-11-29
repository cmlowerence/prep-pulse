import puppeteer from 'puppeteer';

// Note: In Vercel serverless, you might need 'puppeteer-core' and 'chrome-aws-lambda'
// For standard deployment or container, this works.

export async function generatePDFBuffer(htmlContent: string): Promise<Buffer> {
  let browser = null;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    
    // Set content with Tailwind CDN for styling in PDF
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css">
        <style>
          body { font-family: sans-serif; padding: 40px; }
          .katex { font-size: 1.1em; }
        </style>
      </head>
      <body class="prose max-w-none">
        ${htmlContent}
      </body>
      </html>
    `;

    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
    
    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error("PDF Gen Error", error);
    throw new Error("PDF Generation Failed");
  } finally {
    if (browser) await browser.close();
  }
}
