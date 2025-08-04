import { SearchBarProps as Props } from './search-bar.props';

export const SearchBar = ({ placeholder, ...rest }: Props) => {
    return (
        <div className="relative">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
            <input
                type="search"
                className="w-full pl-12 pr-3 py-2 text-black bg-(--bg-search-box) border border-(--bg-search-box) outline-none focus:border-black rounded-lg transition-colors duration-200"
                aria-label={placeholder}
                placeholder={placeholder}
                {...rest}
            />
        </div>
    );
};
