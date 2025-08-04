import { Loader } from '@components/loader';
import { ButtonProps as Props } from './button.props';

export const Button = (props: Props) => {
    const { children, className, loading = false, disabled, ...rest } = props;

    return (
        <button
            className={`${className} px-5 py-1.5 font-bold  text-(--color-font-black) duration-150 bg-(--bg-button) rounded-lg hover:bg-indigo-100 active:bg-indigo-200 relative overflow-hidden inline-block transition focus:outline-black ease-in-out disabled:bg-gray-200 `}
            disabled={disabled || loading}
            role="button"
            {...rest}
        >
            {children}
            {loading && <Loader size="sm" variant="absolute" />}
        </button>
    );
};
