const BASE_URL = process.env.API_BASE_URL;

const DRUGS = '/drugs';

export const END_POINTS = {
    DRUGS: `${BASE_URL}${DRUGS}`,
} as const;
