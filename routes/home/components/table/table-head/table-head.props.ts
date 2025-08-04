import { PropsWithChildren } from 'react';

type TableHeadBaseProps = PropsWithChildren<object>;

type HTMLTableHeadElementAttributes = React.ComponentPropsWithoutRef<'th'>;
export type TableHeadProps = TableHeadBaseProps &
    HTMLTableHeadElementAttributes;
