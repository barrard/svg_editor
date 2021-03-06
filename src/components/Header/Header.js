import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/drawings'>Drawings</Link></li>
          <li><Link to='/editor'>Editor</Link></li>
          <li><Link to='/test'>Test</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
