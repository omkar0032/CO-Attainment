import React from "react";
import { useEffect } from "react";
const UnauthorizedAlert = () => {
    useEffect(() => {
      alert("You are not an authorized person!");
    }, []);

    return null;
  };

  export default UnauthorizedAlert;