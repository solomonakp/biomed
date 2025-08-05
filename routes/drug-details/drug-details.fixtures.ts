import type { Page, Locator } from '@playwright/test';
import testData from '../../test.db.json';
import { Drug } from '@utils/types';

export class DrugDetailsFixture {
    // Private: Internal implementation details
    private readonly loadingIndicator: Locator;
    private readonly pageHeading: Locator;
    private readonly drugDetails: {
        name: Locator;
        status: Locator;
        mechanismOfAction: Locator;
        clinicalTrials: Locator;
        manufacturer: Locator;
        sideEffects: Locator;
    };

    public readonly pageUrl: string;
    public readonly testDrug: Drug;
    public readonly backButton: Locator;

    constructor(public readonly page: Page) {
        this.testDrug = testData.drugs[0] as Drug;
        this.pageUrl = `/drugs/${this.testDrug.id}`;

        this.pageHeading = this.page.getByRole('heading', {
            name: /Drug Candidate Details/,
        });

        this.loadingIndicator = this.page.getByLabel(
            /loading screen indicator/,
        );
        this.backButton = this.page.getByText(/Back to homepage/);

        this.drugDetails = {
            name: this.page.getByTestId('drug-name'),
            status: this.page.getByTestId('drug-status'),
            mechanismOfAction: this.page.getByTestId('drug-mechanism'),
            clinicalTrials: this.page.getByTestId('drug-trials'),
            manufacturer: this.page.getByTestId('drug-manufacturer'),
            sideEffects: this.page.getByTestId('drug-side-effects'),
        };
    }

    async goto(
        drugId = this.testDrug.id,
        options: Parameters<Page['goto']>['1'] = {},
    ) {
        await this.page.goto(`/drugs/${drugId}`, options);
    }

    getPageHeading() {
        return this.pageHeading;
    }

    getLoadingIndicator() {
        return this.loadingIndicator;
    }

    getDrugDetails() {
        return this.drugDetails;
    }
}
