import React from "react";
import ReactDOM from "react-dom";
import styled, { ThemeProvider } from "styled-components";
import { App } from "./src/App";
import { GlobalStyles } from "./GlobalStyles";
import theme from "./theme";

const Root = styled.div`
  width: 100%;
  height: 100vh;
  background-color: gray;
`;

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Root>
      <App />
    </Root>
  </ThemeProvider>,
  document.getElementById("root")
);
