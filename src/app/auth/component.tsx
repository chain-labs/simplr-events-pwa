'use client';

import { useWeb3Auth } from '@web3auth/no-modal-react-hooks';
import React from 'react';

const AuthComponent = () => {
  const { userInfo, isConnected } = useWeb3Auth();
  if (isConnected) {
    return <div>Connected</div>;
  }
  return <div>Not Connected</div>;
};

export default AuthComponent;
