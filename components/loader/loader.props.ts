type LoaderSize = 'lg' | 'md' | 'sm';

/**
 * The Variant property handles how loader is displayed
 */
export type Variant =
    /**
     * render the loader over existing context on the dom
     */
    | 'fixed'
    /**
     * render the loader in relation to its parents container
     */
    | 'absolute'
    /**
     * default behaviour of the loader
     */
    | 'static';

type LoaderBaseProps = {
    /**
     * modify the size of loading indicator
     */
    size?: LoaderSize;
    /**
     * modify the positioning the loading indicator
     */
    variant?: Variant;
};

type HTMLDivElementAttributes = React.ComponentPropsWithoutRef<'div'>;

export type LoaderProps = LoaderBaseProps & HTMLDivElementAttributes;
export type LoaderStyleProps = Pick<
    LoaderProps,
    'className' | keyof LoaderBaseProps
>;
