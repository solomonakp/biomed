import type { RefObject } from 'react';

export type Ref = HTMLElement | null;
export type Config<T extends Ref = HTMLElement> = {
    /**
     * reference to DOM Node
     */
    ref: RefObject<T>;
    /**
     * toggles busy state for loading aria attributes
     * @default false
     */
    isBusy?: boolean;
};
