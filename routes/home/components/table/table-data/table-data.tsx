import { TableDataProps as Props } from './table-data.props';

export const TableData = ({ children, className, ...rest }: Props) => {
    return (
        <td
            className={`px-6 py-5 whitespace-nowrap ${className ?? ''}`}
            {...rest}
        >
            {children}
        </td>
    );
};
