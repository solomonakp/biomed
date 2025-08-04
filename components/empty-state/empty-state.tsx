import { Button } from '@components/button';
import { DEFAULT_ALT_IMAGE, DEFAULT_IMAGE } from './empty-state.const';
import { EmptyStateProps as Props } from './empty-state.props';
import Image from 'next/image';

export const EmptyState = (props: Props) => {
    const {
        src = DEFAULT_IMAGE,
        alt = DEFAULT_ALT_IMAGE,
        title,
        description,
        action,
        ...rest
    } = props;

    return (
        <div
            className="w-full flex flex-col items-center text-center pt-2"
            {...rest}
        >
            {<Image src={src} alt={alt} className="mb-4" />}

            <h1 className="text-(--color-font-black) text-[1.125rem] font-bold mb-2">
                {title}
            </h1>

            {description && (
                <p className=" text-(--color-font-black) font-normal py-2 max-w-lg mb-5">
                    {description}
                </p>
            )}

            {action?.text && (
                <Button onClick={(e) => action.onClick(e)}>
                    {action.text}
                </Button>
            )}
        </div>
    );
};
