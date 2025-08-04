import { TableHeadProps as Props } from './table-head.props';

export const TableHead = ({ children, className, ...props }: Props) => {
    return (
        <th className={`py-3 px-6 ${className ?? ''}`} {...props}>
            {children}
        </th>
    );
};
