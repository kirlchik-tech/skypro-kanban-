import React from "react";
import {
  LoaderContainer,
  LoaderDots,
  LoaderInner,
  LoaderSpinner,
  LoaderText,
} from "./Loader.styled";

const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderInner>
        <LoaderSpinner />

        <LoaderText>
          Загрузка
          <LoaderDots>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </LoaderDots>
        </LoaderText>
      </LoaderInner>
    </LoaderContainer>
  );
};

export default Loader;
