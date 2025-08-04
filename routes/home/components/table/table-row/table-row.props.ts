import { PropsWithChildren } from 'react';

type TableBodyBaseProps = PropsWithChildren<object>;

type HTMLTableRowElementAttributes = React.ComponentPropsWithoutRef<'tr'>;
export type TableRowProps = TableBodyBaseProps & HTMLTableRowElementAttributes;
