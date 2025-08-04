import { ComponentProps } from 'react';
import Image from 'next/image';

type Action = {
    /**
     * text to be the displayed on CTA
     */
    text: string;
    /**
     * Operation to be called once CTA is clicked
     */
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

type EmptyBaseProps = {
    /**
     * title of empty state
     */
    title: string;
    /**
     * description of empty state
     */
    description?: string;

    /**
     * CTA button for empty state
     */
    action?: Action;
    /**
     * Image source for next image component
     */
    src?: ComponentProps<typeof Image>['src'];
    /**
     * Image description
     */
    alt?: ComponentProps<typeof Image>['alt'];
};

type HTMLDivElementAttributes = React.ComponentPropsWithoutRef<'div'>;
export type EmptyStateProps = EmptyBaseProps & HTMLDivElementAttributes;
