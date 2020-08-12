import React from 'react';
import { observer } from 'mobx-react';
import AppHeader from 'Components/Header';
import './styles.scss';

const Header = observer(() => {
  return <AppHeader title='Location' />;
});

Header.propTypes = {};

export default Header;