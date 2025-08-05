import type { Page, Locator } from '@playwright/test';
import { HOME_PAGE_PATH } from './home.const';
import { E2E_BASE_URL } from 'playwright.config';
import testData from '../../test.db.json';
import { Drug } from '@utils/types';

export class HomePageFixture {
    // Private: Internal implementation details
    private readonly loadingIndicator: Locator;
    private readonly pageHeading: Locator;
    private readonly drugTable: Locator;
    private readonly drugTableHeaders: {
        name: Locator;
        status: Locator;
        description: Locator;
    };

    public readonly pageUrl: string;
    public readonly searchBar: Locator;
    public readonly testDrug: Drug;

    private readonly pagination: {
        container: Locator;
        nextButton: Locator;
        prevButton: Locator;
    };

    constructor(public readonly page: Page) {
        this.pageHeading = this.page.getByRole('heading', {
            name: /Drug Candidates/,
        });
        this.pageUrl = `${E2E_BASE_URL}${HOME_PAGE_PATH}`;
        this.loadingIndicator = this.page.getByLabel(
            /loading screen indicator/,
        );
        this.testDrug = testData.drugs[0] as Drug;
        this.searchBar = this.page.getByPlaceholder(/Search by drug name/);
        this.drugTable = this.page.getByRole('table');
        this.drugTableHeaders = {
            name: this.page.getByText(/Name/),
            status: this.page.getByText(/Status/),
            description: this.page.getByText(/Description/),
        };
        this.pagination = {
            container: this.page.getByTestId('pagination'),
            nextButton: this.page.getByTestId('next'),
            prevButton: this.page.getByTestId('previous'),
        };
    }

    async goto(options: Parameters<Page['goto']>['1'] = {}) {
        await this.page.goto(HOME_PAGE_PATH, options);
    }

    async screenShot() {
        const screenshot = this.page.screenshot({ animations: 'disabled' });
        return screenshot;
    }

    getPageHeading() {
        return this.pageHeading;
    }
    getLoadingIndicator() {
        return this.loadingIndicator;
    }
    async searchForDrug(name: string) {
        await this.searchBar.pressSequentially(name, {
            timeout: 10000,
            delay: 100,
        });
    }

    getDrugTable() {
        return this.drugTable;
    }

    getDrugTableHeaders() {
        return this.drugTableHeaders;
    }

    async getDrugTableBodyRows() {
        return this.page.getByTestId('body-row').all();
    }

    async getDrugByName(name: string) {
        return this.page.getByRole('row', { name });
    }
    getCell(name: string) {
        return this.page.getByRole('cell', { name: name });
    }

    getFirstCell(name: string) {
        return this.page.getByRole('cell', { name: name }).first();
    }

    getNextButton() {
        return this.pagination.nextButton;
    }

    async clickNextPage() {
        await this.pagination.nextButton.click();
        await this.waitForLoading();
    }

    async clickPrevPage() {
        await this.pagination.prevButton.click();
        await this.waitForLoading();
    }

    private async waitForLoading() {
        await expect(this.getLoadingIndicator()).toBeVisible();
        await expect(this.getLoadingIndicator()).not.toBeVisible();
    }

    getPagination() {
        return this.pagination.container;
    }
}
