type TableBaseProps = {
    /**
     * True to show the loading state
     * @default false
     */
    loading?: boolean;
};

type HTMLTableElementAttributes = React.ComponentPropsWithoutRef<'table'>;
export type TableProps = TableBaseProps & HTMLTableElementAttributes;
