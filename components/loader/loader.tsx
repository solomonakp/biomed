import { SIZES, VARIANT_STYLES } from './loader.const';
import type { LoaderProps as Props } from './loader.props';

export const Loader = (props: Props) => {
    const { size = 'sm', variant = 'static', className, ...rest } = props;

    const { height, width } = SIZES[size];

    return (
        <div
            role="alert"
            className={`flex items-center justify-center bg-inherit z-(--z-index-loader) h-full ${className} ${VARIANT_STYLES[variant]}`}
            aria-live="assertive"
            {...rest}
        >
            <svg
                aria-hidden="true"
                focusable="false"
                className="animate-spin"
                width={width}
                height={height}
                viewBox="0 0 108 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M65.4115 97.0884C56.9884 99.3454 48.085 99.054 39.8275 96.2509C31.5699 93.4478 24.329 88.2591 19.0204 81.3408C13.7118 74.4225 10.5739 66.0854 10.0036 57.3837C9.43325 48.682 11.4561 40.0067 15.8162 32.4546C20.1764 24.9026 26.678 18.8131 34.4991 14.9562C42.3201 11.0992 51.1092 9.64814 59.7549 10.7864C68.4006 11.9246 76.5147 15.601 83.071 21.3507C89.6273 27.1004 94.3314 34.6651 96.5884 43.0883"
                    stroke="#DBE0E5"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeOpacity={0}
                />
                <path
                    d="M54 10.4092C62.7203 10.4092 71.2448 12.9951 78.4955 17.8398C85.7462 22.6846 91.3974 29.5706 94.7346 37.6271C98.0717 45.6837 98.9448 54.5488 97.2436 63.1016C95.5424 71.6544 91.3431 79.5106 85.1769 85.6768C79.0107 91.8431 71.1545 96.0423 62.6017 97.7436C54.049 99.4448 45.1838 98.5717 37.1272 95.2346C29.0707 91.8975 22.1847 86.2463 17.3399 78.9956C12.4951 71.7449 9.9092 63.2204 9.90918 54.5001"
                    stroke="#121417"
                    strokeWidth="9"
                    strokeLinecap="round"
                />
            </svg>
            <span className="sr-only">loading...</span>
        </div>
    );
};
