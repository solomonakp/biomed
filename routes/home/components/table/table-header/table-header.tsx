import { TableHeaderProps as Props } from './table-header.props';

export const TableHeader = ({ children, className, ...props }: Props) => {
    return (
        <thead
            className={`bg-transparent text-(--color-font-black) font-medium ${className ?? ''}`}
            {...props}
        >
            <tr className="border-b border-b-(--color-accent)">{children}</tr>
        </thead>
    );
};
