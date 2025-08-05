import { render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';

import { useAriaLoadingAttr } from './use-aria-loading-attr';
import userEvent from '@testing-library/user-event';

const MockApp = () => {
    const [isBusy, setIsBusy] = React.useState<boolean>(false);
    const ref = React.useRef<HTMLDivElement>(null);
    const handler = () => setIsBusy(!isBusy);
    useAriaLoadingAttr<HTMLDivElement | null>({ isBusy, ref });

    return (
        <div data-testid="app">
            <div ref={ref} data-testid="app-display-message">
                loading
            </div>
            <button onClick={() => handler()}>get more</button>
        </div>
    );
};

describe('hooks/use-aria-loading-attr', () => {
    it('should the useAriaLoadingAttr hook exported correctly', () => {
        expect(useAriaLoadingAttr).toBeDefined();
    });

    it('should the useAriaLoadingAttr  set ARAIA live on parent node', async () => {
        render(<MockApp />);

        const parentElement = screen.getByTestId('app');

        await waitFor(() =>
            expect(parentElement.getAttribute('aria-live')).toBe('polite'),
        );
    });
    it('should the useAriaLoadingAttr  set ARAIA busy on parent node', async () => {
        render(<MockApp />);

        const parentElement = screen.getByTestId('app');

        await waitFor(() =>
            expect(parentElement.getAttribute('aria-busy')).toBe('false'),
        );
    });
    it('should the useAriaLoadingAttr  toggle ARAIA busy on parent node', async () => {
        render(<MockApp />);

        const parentElement = screen.getByTestId('app');
        const button = screen.getByRole('button');
        await waitFor(() =>
            expect(parentElement.getAttribute('aria-busy')).toBe('false'),
        );

        userEvent.click(button);
        await waitFor(() =>
            expect(parentElement.getAttribute('aria-busy')).toBe('true'),
        );
    });
});
