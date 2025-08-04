import { END_POINTS, DRUGS_TAG } from '@utils/constants';

import 'server-only';

import { Drug } from '@utils/types';
import { REVALIDATION_TIME as revalidate } from './drug-details.const';

/**
 * Creates  get drug endpoint url
 *
 * @returns {string}
 */

const createGetPostUrl = (id: string) => `${END_POINTS.DRUGS}/${id}`;

export const getDrug = async (id: string) => {
    const res = await fetch(createGetPostUrl(id), {
        method: 'GET',
        next: {
            tags: [DRUGS_TAG],
            revalidate,
        },
    });

    const data = (await res.json()) as Drug;

    return data;
};
