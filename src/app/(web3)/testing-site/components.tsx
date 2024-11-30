"use client";

import { useWeb3Auth } from "@web3auth/modal-react-hooks";
import React from "react";

const TestingComponent = () => {
  const { isConnected, connect, provider,  } = useWeb3Auth();
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 bg-gradient-to-b from-purple-900 to-black rounded-lg shadow-xl">
      {isConnected ? (
        <div>Connected</div>
      ) : (
        <div
          className="flex flex-row rounded-full px-6 py-3 text-white justify-center align-center cursor-pointer"
          style={{ backgroundColor: "#0364ff" }}
          onClick={connect}
        >
          Login
        </div>
      )}
    </div>
  );
};

export default TestingComponent;
