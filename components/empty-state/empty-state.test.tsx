import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { EmptyState } from './empty-state';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

const props = {
    action: {
        onClick: jest.fn(),
        text: 'Click me',
    },
    title: 'Action',
};

describe('EmptyState', () => {
    it('should export EmptyState component correctly', () => {
        expect(EmptyState).toBeDefined();
    });

    it('should mounted EmptyState component correctly', () => {
        render(<EmptyState {...props} />);

        const emptyStateElement = screen.getByTestId('empty-state');
        const emptyStateIcon = screen.getByRole('img', { hidden: true });
        const emptyStateTitle = screen.getByText(props.title);

        expect(emptyStateElement).toBeInTheDocument();
        expect(emptyStateIcon).toBeInTheDocument();
        expect(emptyStateTitle).toBeInTheDocument();
    });

    it('should mounted EmptyState description when it is given', () => {
        const descriptionText = 'I am a test';

        render(<EmptyState {...props} description={descriptionText} />);

        const emptyStateDescription = screen.getByText(descriptionText);

        expect(emptyStateDescription).toBeInTheDocument();
    });

    it('should not mount EmptyState description when missing', () => {
        render(<EmptyState {...props} />);

        const emptyStateDescription = screen.queryByTestId('empty-state-text');

        expect(emptyStateDescription).toBeNull();
    });

    it('should mounted EmptyState CTA button when it is given', () => {
        render(<EmptyState {...props} />);

        const emptyStateButton = screen.getByRole('button');

        expect(emptyStateButton).toBeInTheDocument();
    });

    it('should not mount EmptyState button when missing', () => {
        render(<EmptyState title={props.title} />);

        const emptyStateButton = screen.queryByRole('button');

        expect(emptyStateButton).not.toBeInTheDocument();
    });

    it('should mounted EmptyState CTA button action be called when it is given', async () => {
        render(<EmptyState {...props} />);

        const emptyStateButton = screen.getByRole('button');

        await userEvent.click(emptyStateButton);

        expect(props.action.onClick).toHaveBeenCalled();
    });
    test('should not fail any accessibility test', async () => {
        const { container } = render(<EmptyState {...props} />);

        const result = await axe(container);

        expect(result).toHaveNoViolations();
    });
});
