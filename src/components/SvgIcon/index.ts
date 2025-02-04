import { ComponentPropsWithRef, ReactNode } from 'react';

export type SvgIconComponent = (props: SvgIconProps) => ReactNode;
export type SvgIconProps = ComponentPropsWithRef<'svg'>;

export * from './channel';
