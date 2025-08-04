import { useSafeLayoutEffect } from '../use-safe-layout-effect';

import type { Config, Ref } from './use-aria-loading-attr.props';

export const useAriaLoadingAttr = <T extends Ref = HTMLElement>(
    config: Config<T>,
) => {
    const { ref, isBusy } = config;

    const getParentNode = (eleRef: typeof ref) => eleRef.current?.parentElement;

    const ariaBusy = isBusy ?? true;

    useSafeLayoutEffect(() => {
        if (ref.current) {
            getParentNode(ref)?.setAttribute('aria-live', 'polite');
        }
        return () => getParentNode(ref)?.removeAttribute('aria-live');
    }, []);

    useSafeLayoutEffect(() => {
        if (ref.current) {
            getParentNode(ref)?.setAttribute('aria-busy', `${ariaBusy}`);
        }
        return () => getParentNode(ref)?.removeAttribute('aria-busy');
    }, [isBusy]);
};
