import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { Loader } from './loader';
import type { Variant } from './loader.props';
import { VARIANT_STYLES } from './loader.const';
import { axe } from 'jest-axe';

export const variantOptions: Variant[] = ['fixed', 'absolute'];

describe('Loader', () => {
    it('should export Loader component correctly', () => {
        expect(Loader).toBeDefined();
    });

    it('should mounted Loader component correctly', () => {
        render(<Loader />);

        const loaderElement = screen.getByRole('alert');
        expect(loaderElement).toBeInTheDocument();

        const [firstLoaderElement] = screen.getAllByRole('alert');
        expect(firstLoaderElement).toBeInTheDocument();
    });

    it.each(variantOptions)(
        'should the Loader component render the %s variant',
        (option) => {
            render(<Loader variant={option} />);

            const loaderElement = screen.getByRole('alert');
            expect(loaderElement).toBeInTheDocument();
            expect(loaderElement.getAttribute('class')).toContain(
                VARIANT_STYLES[option],
            );
        },
    );
    test('should not fail any accessibility test', async () => {
        const { container } = render(<Loader />);

        const result = await axe(container);

        expect(result).toHaveNoViolations();
    });
});
