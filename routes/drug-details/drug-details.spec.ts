import { test, expect } from 'next/experimental/testmode/playwright';
import { setUpBrowserContext } from '@playwright/setup';
import { DrugDetailsFixture as DrugDetails } from './drug-details.fixtures';

test.describe('Drug Details Page', () => {
    test.beforeEach(({}, testInfo) => {
        testInfo.snapshotSuffix = '';
    });

    test('should display drug details correctly', async ({ browser }) => {
        const { page } = await setUpBrowserContext(browser);
        const detailsPage = new DrugDetails(page);

        await detailsPage.goto(undefined, { waitUntil: 'domcontentloaded' });

        // Verify page heading
        await expect(detailsPage.getPageHeading()).toBeVisible();

        // Verify drug details
        const details = detailsPage.getDrugDetails();
        const testDrug = detailsPage.testDrug;

        await expect(details.name).toHaveText(testDrug.name);
        await expect(details.status).toHaveText(testDrug.status);

        await expect(details.mechanismOfAction).toHaveText(
            testDrug.mechanismOfAction,
        );
        await expect(details.clinicalTrials).toHaveText(
            testDrug.clinicalTrials,
        );
        await expect(details.manufacturer).toHaveText(testDrug.manufacturer);

        // // Verify side effects list
        for (const effect of testDrug.sideEffects) {
            await expect(details.sideEffects).toContainText(effect);
        }
    });

    test('should show loading indicator while fetching drug details', async ({
        browser,
    }) => {
        const { page } = await setUpBrowserContext(browser);
        const detailsPage = new DrugDetails(page);

        await detailsPage.goto(undefined, { waitUntil: 'commit' });

        await expect(detailsPage.getLoadingIndicator()).toBeVisible();
        await expect(detailsPage.getLoadingIndicator()).not.toBeVisible();
    });

    test('should navigate back to home page', async ({ browser }) => {
        const { page } = await setUpBrowserContext(browser);
        const detailsPage = new DrugDetails(page);

        await detailsPage.goto();

        await expect(detailsPage.backButton).toBeVisible();
        await detailsPage.backButton.click();

        await page.waitForURL('/', { waitUntil: 'domcontentloaded' });
    });

    test('should handle non-existent drug ID', async ({ browser }) => {
        const { page } = await setUpBrowserContext(browser);
        const detailsPage = new DrugDetails(page);

        await detailsPage.goto('non-existent-id', {
            waitUntil: 'domcontentloaded',
        });

        await expect(page.getByText(/Page not found/)).toBeVisible();
    });

    test('should match screenshot', async ({ browser }) => {
        const { page } = await setUpBrowserContext(browser);
        const detailsPage = new DrugDetails(page);

        await detailsPage.goto();
        await expect(detailsPage.getPageHeading()).toBeVisible();

        await expect(page).toHaveScreenshot({
            fullPage: true,
            threshold: 0.1,
            animations: 'disabled',
            caret: 'hide',
            scale: 'css',
            maxDiffPixelRatio: 0.2,
        });
    });
});
