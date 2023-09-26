'use server';
import { chromium } from 'playwright';

const getWebData = async (url: string) => {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(url);

  const result = await page.evaluate(() => {
    document
      .querySelectorAll('script, style, header, head, noscript, svg')
      .forEach((el) => el.remove());

    // Remove class and style attributes from all remaining elements
    document.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('class');
      el.removeAttribute('style');
      el.removeAttribute('aria-label');
      el.removeAttribute('aria-labelledby');
      el.removeAttribute('aria-hidden');
      el.removeAttribute('role');
      el.removeAttribute('tabindex');
    });

    const cleanedHtml = document.documentElement.outerHTML;
    const textContent = document.body.textContent || '';

    return { textContent, cleanedHtml };
  });

  await browser.close();

  return result;
};

export const getSummary = async (url: string) => {
  const webData = await getWebData(url);

  return {
    text: webData.textContent,
    html: webData.cleanedHtml,
  };
};
