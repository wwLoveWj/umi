import { useState, useEffect } from "react";
import { Login } from "@/utils/request/api/user";
const DocsPage = () => {
  useEffect(() => {
    Login().then((res) => {
      localStorage.setItem("token", res.token);
    });
  });
  return (
    <div>
      <p>This is umi docs.</p>
    </div>
  );
};

export default DocsPage;
