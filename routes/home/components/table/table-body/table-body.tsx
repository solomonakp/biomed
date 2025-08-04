import { TableBodyProps as Props } from './table-body.props';

export const TableBody = ({ children, ...rest }: Props) => {
    return (
        <tbody className="text-gray-600 divide-y" {...rest}>
            {children}
        </tbody>
    );
};
