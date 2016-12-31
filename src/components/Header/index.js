import React from 'react';
import { IndexLink, Link } from 'react-router';
import './Header.scss';

const Header = () => (
  <div>
    <h1>React Redux Starter Kit</h1>
    <IndexLink to='/' activeClassName='route--active'>
      Home
    </IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='route--active'>
      Counter
    </Link>
    <Link to='/signUp' activeClassName='route--active'>
      Sign Up
    </Link>
    <Link to='/logIn' activeClassName='route--active'>
      Log In
    </Link>
  </div>
);

export default Header;
