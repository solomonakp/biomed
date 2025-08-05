import type { Browser } from 'next/experimental/testmode/playwright';
import path from 'node:path';

export const setUpBrowserContext = async (browser: Browser) => {
    const context = await browser.newContext({});
    const page = await context.newPage();

    return { context, page };
};
