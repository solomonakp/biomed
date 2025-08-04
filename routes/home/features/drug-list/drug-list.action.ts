'use server';

import { END_POINTS, DRUGS_TAG } from '@utils/constants';

import { Drugs } from '@utils/types';

import { PER_PAGE_COUNT, REVALIDATION_TIME } from './drugs-list.const';

/**
 * Creates paginated drugs endpoint
 *
 * @returns {string}
 */

const createGetDrugsByNameEndPoint = (currentPage: number, name: string) =>
    `${END_POINTS.DRUGS}?name_like=^${name}&_page=${currentPage}&_l=${PER_PAGE_COUNT}`;

/**
 * gets drugs data
 */

export const getDrugsByName = async (name: string) => {
    console.log(name, 'name');
    const res = await fetch(createGetDrugsByNameEndPoint(1, name), {
        // next: {
        //     tags: [DRUGS_TAG],
        //     revalidate: REVALIDATION_TIME,
        // },
    });
    const data = (await res.json()) as Drugs;

    return data;
};

export const getDrugsByPaginationUrl = async (url: string) => {
    const res = await fetch(url, {
        // next: {
        //     tags: [DRUGS_TAG],
        //     revalidate: REVALIDATION_TIME,
        // },
    });
    const data = (await res.json()) as Drugs;

    return data;
};
