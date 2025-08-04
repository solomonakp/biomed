import { PropsWithChildren } from 'react';

type TableHeaderBaseProps = PropsWithChildren<object>;

type HTMLTableHeaderElementAttributes = React.ComponentPropsWithoutRef<'thead'>;
export type TableHeadProps = TableHeaderBaseProps &
    HTMLTableHeaderElementAttributes;
