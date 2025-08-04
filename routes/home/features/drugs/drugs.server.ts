import { END_POINTS, DRUGS_TAG } from '@utils/constants';

import { Drugs } from '@utils/types';

import { PER_PAGE_COUNT, REVALIDATION_TIME } from './drugs.const';

/**
 * Creates paginated drugs endpoint
 *
 * @returns {string}
 */

const createDrugsEndPoint = (currentPage: number) =>
    `${END_POINTS.DRUGS}?_page=${currentPage}&_per_page=${PER_PAGE_COUNT}`;

/**
 * gets drugs data
 */

export const getDrugs = async () => {
    const res = await fetch(createDrugsEndPoint(1), {
        next: {
            tags: [DRUGS_TAG],
            revalidate: REVALIDATION_TIME,
        },
    });
    const data = (await res.json()) as Drugs;

    return data;
};
