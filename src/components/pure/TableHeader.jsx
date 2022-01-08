import React from 'react';
import Logo from './Logo';
import UserHeader from './UserHeader';


function TableHeader() {
  return (
    <div className="header-frame-table">
        <div className="logo-frame">
            <Logo></Logo>
        </div>
        <UserHeader></UserHeader>
    </div>
  );
}

export default TableHeader;