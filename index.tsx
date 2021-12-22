import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Root = styled.div`
  width: 100%;
  height: 100vh;
  background-color: gray;
`;

const Content = styled.div`
  width: fit-content;
  margin: auto;
  background-color: #fff;
  color: red;
  font-weight: 600;
  font-size: 26px;
`;

const App: FunctionComponent = () => {
  return (
    <Root>
      <Content>Hello, world!</Content>
    </Root>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
