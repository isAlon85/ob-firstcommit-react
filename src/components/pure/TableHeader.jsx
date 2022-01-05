import React from 'react';
import Logo from './Logo';
import User from './User';


function TableHeader() {
  return (
    <div className="header-frame-table">
        <div className="logo-frame">
            <Logo></Logo>
        </div>
        <User></User>
    </div>
  );
}

export default TableHeader;