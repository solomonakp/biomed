import { TableProps as Props } from './table.props';

export const Table = ({ children, ...rest }: Props) => {
    return (
        <div className="shadow-sm border border-(--color-accent) rounded-lg overflow-x-auto relative">
            <table className="w-full table-auto text-sm text-left" {...rest}>
                {children}
            </table>
        </div>
    );
};
