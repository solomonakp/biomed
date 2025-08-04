import { TableRowProps as Props } from './table-row.props';

export const TableRow = ({ children, ...rest }: Props) => {
    return (
        <tr
            className="border-b-(--color-accent) cursor-pointer hover:bg-gray-100 transition duration-150 ease-in-out focus:outline-black"
            {...rest}
            tabIndex={0}
        >
            {children}
        </tr>
    );
};
