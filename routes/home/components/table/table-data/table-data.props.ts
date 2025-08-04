import { PropsWithChildren } from 'react';

type TableDataBaseProps = PropsWithChildren<object>;

type HTMLTableDataElementAttributes = React.ComponentPropsWithoutRef<'td'>;
export type TableDataProps = TableDataBaseProps &
    HTMLTableDataElementAttributes;
