import { PropsWithChildren } from 'react';

type AppContainerBaseProps = PropsWithChildren<object>;

type HTMLMainElementAttributes = React.ComponentPropsWithoutRef<'main'>;

export type AppContainerProps = AppContainerBaseProps &
    HTMLMainElementAttributes;
