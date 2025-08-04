type ButtonBaseProps = {
    /**
     * True to show the loading state
     * @default false
     */
    loading?: boolean;
};

type HTMLButtonElementAttributes = React.ComponentPropsWithoutRef<'button'>;
export type ButtonProps = ButtonBaseProps & HTMLButtonElementAttributes;
