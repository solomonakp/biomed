import { PropsWithChildren } from 'react';

type TableBodyBaseProps = PropsWithChildren<object>;

type HTMLTableBodyElementAttributes = React.ComponentPropsWithoutRef<'tbody'>;
export type TableBodyProps = TableBodyBaseProps &
    HTMLTableBodyElementAttributes;
