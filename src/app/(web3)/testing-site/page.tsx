import React from "react";

import TestingComponent from "./components";
import AuthProvider from "../../../components/Auth";

const TestingPage = () => {
  return (
    <AuthProvider>
      <TestingComponent />
    </AuthProvider>
  );
};

export default TestingPage;
