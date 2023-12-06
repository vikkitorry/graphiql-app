import React from 'react';
import { classNames } from '../utils/lib/classNames';
import {
  Button,
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '../components/Button/Button';

export const App = () => {
  const onClick = () => {
    console.log('Click');
  };

  return (
    <div className={classNames('app', {}, [])}>
      App
      <div className={classNames('REMOVE', {}, [])}>
        <Button size={ButtonSize.S} onClick={onClick}>
          Size S
        </Button>
        <Button size={ButtonSize.M}>Size M</Button>
        <Button size={ButtonSize.L}>Size L</Button>
        <Button size={ButtonSize.XL}>Size XL</Button>
      </div>
      <div className={classNames('REMOVE', {}, [])}>
        <Button color={ButtonColor.DARK}>Color DARK</Button>
        <Button color={ButtonColor.LIGHT}>Color LIGHT</Button>
        <Button color={ButtonColor.ERROR}>Color ERROR</Button>
        <Button disabled={true}>Disabled</Button>
      </div>
      <div className={classNames('REMOVE', {}, [])}>
        <Button variant={ButtonVariant.OUTLINE} color={ButtonColor.LIGHT}>
          Variant OUTLINE
        </Button>
        <Button variant={ButtonVariant.OUTLINE} color={ButtonColor.DARK}>
          Variant OUTLINE
        </Button>
        <Button variant={ButtonVariant.OUTLINE} color={ButtonColor.ERROR}>
          Variant OUTLINE
        </Button>
      </div>
      <div className={classNames('REMOVE', {}, [])}>
        <Button variant={ButtonVariant.CLEAR}>Variant CLEAR</Button>
      </div>
    </div>
  );
};
