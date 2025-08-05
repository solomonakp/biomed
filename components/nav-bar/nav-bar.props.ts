import { PropsWithChildren } from 'react';

type NavbarBaseProps = PropsWithChildren<object>;

type HTMLNavElementAttributes = React.ComponentPropsWithoutRef<'nav'>;

export type NavBarProps = NavbarBaseProps & HTMLNavElementAttributes;
