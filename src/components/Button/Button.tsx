import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames, Mods } from '../../utils/lib/classNames';
import cls from './Button.module.scss';

export enum ButtonColor {
  DARK = 'dark',
  LIGHT = 'light',
  ERROR = 'error',
}

export enum ButtonVariant {
  CLEAR = 'clear',
  OUTLINE = 'outline',
}

export enum ButtonSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
  square?: boolean;
  fullWidth?: boolean;
  color?: ButtonColor;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = memo((props: IButtonProps) => {
  const {
    type,
    className,
    children,
    variant = 'clear',
    square,
    disabled,
    fullWidth,
    size = 'm',
    color = 'dark',
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
    [cls.fullWidth]: fullWidth,
  };

  return (
    <button
      type={type || 'button'}
      className={classNames(cls.Button, mods, [
        className,
        cls[variant],
        cls[size],
        cls[color],
      ])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
});
