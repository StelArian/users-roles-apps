import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";

export default () => {
  const error = useSelector((state: RootState) => state.props.error);

  return <h1>{error}</h1>;
};
