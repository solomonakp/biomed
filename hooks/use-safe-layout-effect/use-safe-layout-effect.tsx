import { canUseDOM } from '@utils/functions';
import * as React from 'react';

/**
 * useSafeLayoutEffect enables us to safely call `useLayoutEffect` on the browser (for SSR reasons)
 */
export const useSafeLayoutEffect = canUseDOM()
    ? React.useLayoutEffect
    : React.useEffect;
