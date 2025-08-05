import { test, expect } from 'next/experimental/testmode/playwright';
import { setUpBrowserContext } from '@playwright/setup';

import { HomePageFixture as HomePage } from './home.fixures';

test.describe('Home Page', () => {
    test.beforeEach(({}, testInfo) => {
        //note: added this to ignore os prefixing on CI
        testInfo.snapshotSuffix = '';
    });
    test('should be displayed correctly', async ({ browser }) => {
        const { page } = await setUpBrowserContext(browser);

        const homePage = new HomePage(page);

        await homePage.goto({ waitUntil: 'domcontentloaded' });

        await expect(homePage.getPageHeading()).toBeVisible({
            timeout: 10000,
        });

        await expect(homePage.searchBar).toBeVisible();

        await expect(page).toHaveScreenshot({
            fullPage: true,
            threshold: 0.1,
            animations: 'disabled',
            caret: 'hide',
            scale: 'css',
            maxDiffPixelRatio: 0.2,
        });
    });
    test('should show loading indicator while retrieving drug candidates', async ({
        browser,
    }) => {
        const { page } = await setUpBrowserContext(browser);
        const homePage = new HomePage(page);

        await homePage.goto({ waitUntil: 'commit' });

        // Intercept API request and delay response
        await page.route('**/drugs**', async (route) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await route.continue();
        });

        await expect(homePage.getLoadingIndicator()).toBeVisible();

        await expect(homePage.getLoadingIndicator()).not.toBeVisible();
    });
    test('should display list of drug candidates', async ({ browser }) => {
        const { page } = await setUpBrowserContext(browser);
        const homePage = new HomePage(page);

        await homePage.goto({ waitUntil: 'domcontentloaded' });

        await expect(homePage.getDrugTable()).toBeVisible();

        const headers = homePage.getDrugTableHeaders();
        await expect(headers.name).toBeVisible();
        await expect(headers.status).toBeVisible();
        await expect(headers.description).toBeVisible();

        const drugRows = await homePage.getDrugTableBodyRows();
        expect(drugRows.length).toBeGreaterThan(0);

        const firstDrug = homePage.testDrug;
        await expect(homePage.getCell(firstDrug.name)).toBeVisible();
        await expect(homePage.getFirstCell(firstDrug.status)).toBeVisible;
        await expect(homePage.getCell(firstDrug.description)).toBeVisible();
    });
    test('should allow user to search for a drug', async ({ browser }) => {
        const { page } = await setUpBrowserContext(browser);
        const homePage = new HomePage(page);

        await homePage.goto({ waitUntil: 'domcontentloaded' });

        const drugToSearch = homePage.testDrug;

        const listWatcher = page.mainFrame().waitForFunction(
            () => {
                const rows = document.querySelectorAll('table tbody tr');

                return rows.length === 1;
            },
            { timeout: 10000 },
        );

        await homePage.searchForDrug(drugToSearch.name);

        await listWatcher;

        const drugRow = page.getByRole('row', {
            name: new RegExp(drugToSearch.name),
        });

        await expect(drugRow).toBeVisible();

        await expect(
            drugRow.getByRole('cell', { name: drugToSearch.name }),
        ).toBeVisible();
        await expect(
            drugRow.getByRole('cell', { name: drugToSearch.status }),
        ).toBeVisible();
        await expect(
            drugRow.getByRole('cell', { name: drugToSearch.description }),
        ).toBeVisible();

        const allRows = await homePage.getDrugTableBodyRows();
        expect(allRows.length).toBe(1);
    });
    test('should handle no results when searching', async ({ browser }) => {
        const { page } = await setUpBrowserContext(browser);
        const homePage = new HomePage(page);

        await homePage.goto({ waitUntil: 'domcontentloaded' });

        await homePage.searchForDrug('NonExistentDrug123');

        await expect(page.getByText(/No Drug Candidate found/)).toBeVisible();
    });
    test('should navigate to drug details page when clicking a table row', async ({
        browser,
    }) => {
        const { page } = await setUpBrowserContext(browser);
        const homePage = new HomePage(page);

        await homePage.goto({ waitUntil: 'domcontentloaded' });

        const testDrug = homePage.testDrug;

        await expect(homePage.getDrugTable()).toBeVisible();

        const drugRow = page.getByRole('row', {
            name: new RegExp(testDrug.name),
        });
        await drugRow.click();

        await page.waitForURL(`/drugs/${testDrug.id}`, {
            waitUntil: 'domcontentloaded',
        });

        await expect(page).toHaveURL(new RegExp(`/drugs/${testDrug.id}`));

        await expect(page.getByText(/Drug Candidate Details/)).toBeVisible();
    });
    test('should handle pagination correctly', async ({ browser }) => {
        const { page } = await setUpBrowserContext(browser);
        const homePage = new HomePage(page);

        await homePage.goto({ waitUntil: 'domcontentloaded' });

        // Get initial data
        await expect(homePage.getDrugTable()).toBeVisible();
        const initialDrugs = await homePage.getDrugTableBodyRows();
        const initialDrug = initialDrugs[1];

        // Check next button is visible when there's more data
        const nextButton = homePage.getNextButton();
        await expect(nextButton).toBeVisible();

        // Click next and verify new data loads
        await nextButton.click();

        // Verify we have new data
        const newDrugs = await homePage.getDrugTableBodyRows();
        expect(newDrugs).not.toContainEqual(initialDrug);

        // Previous button should now be visible
        const prevButton = page.getByRole('button', { name: /previous/ });
        await expect(prevButton).toBeVisible();

        // Go back to first page
        await prevButton.click();

        // Verify we're back to initial data
        const finalDrugs = await homePage.getDrugTableBodyRows();
        expect(finalDrugs.length).toEqual(initialDrugs.length);
    });
    test('should hide pagination when search results fit on one page', async ({
        browser,
    }) => {
        const { page } = await setUpBrowserContext(browser);
        const homePage = new HomePage(page);

        await homePage.goto({ waitUntil: 'domcontentloaded' });

        const listWatcher = page.mainFrame().waitForFunction(
            () => {
                const rows = document.querySelectorAll('table tbody tr');

                return rows.length === 1;
            },
            { timeout: 10000 },
        );

        await homePage.searchForDrug(homePage.testDrug.name);

        await listWatcher;

        await expect(homePage.getLoadingIndicator()).not.toBeVisible();

        await expect(homePage.getPagination()).not.toBeVisible();
    });
});
