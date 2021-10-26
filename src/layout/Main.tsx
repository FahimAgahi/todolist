import React from 'react';
import propTypes, { InferProps } from 'prop-types';

const Main: React.FC = ({ children }: InferProps<typeof Main.prototype>) => {
  return (
    <>
      <header />
      <main>{children}</main>
      <footer />
    </>
  );
};

Main.propTypes = {
  children: propTypes.any.isRequired,
};

export default Main;
