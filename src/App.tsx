import styled from "styled-components";
import { Calculator } from "./components";

function App() {
  return (
    <ContainerCalculatorApp>
      <Calculator />
    </ContainerCalculatorApp>
  );
}

export default App;

const ContainerCalculatorApp = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
