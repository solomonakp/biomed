/**
 * Controls Number of drugs per page
 */
export const PER_PAGE_COUNT = 10 as const;
export const REVALIDATION_TIME = 0 as const;

/**
 * selects classname based on drug status
 */
export const TD_STATUS_CLASSNAME = {
    Pending: 'text-(--color-pending)',
    Approved: 'text-(--color-approved)',
} as const;
