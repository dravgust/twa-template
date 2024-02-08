import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { Counter } from "./components/Counter";
import { Jetton } from "./components/Jetton";
import { TransferTon } from "./components/TransferTon";
import styled from "styled-components";
import { FlexBoxCol, FlexBoxRow } from "./components/styled/styled";
import { useTonConnect } from "./hooks/useTonConnect";
import { CHAIN } from "@tonconnect/protocol";
import WebApp from "@twa-dev/sdk";
import { MainButton, BackButton } from '@twa-dev/sdk/react';

const StyledApp = styled.div`
`;

const AppContainer = styled.div`
`;

const NetworkBage = styled.div`
  padding: 10px 20px;
  font-weight: 700;
`;

function App() {
  const { network } = useTonConnect();
  const initData  =  WebApp.initData;
  
  return (
    <StyledApp>
      <BackButton onClick={() => window.history.back()} />
      <MainButton text="Submit" onClick={() => alert('submitted')} />
      <AppContainer>
        <FlexBoxCol>
          <FlexBoxRow>
            <label>init:</label>{initData}
          </FlexBoxRow>
          <FlexBoxRow>
            <TonConnectButton />
            <NetworkBage onClick={() => WebApp.showAlert(`Hi!`)}>
              {network
                ? network === CHAIN.MAINNET
                  ? "mainnet"
                  : "testnet"
                : "N/A"}
            </NetworkBage>
          </FlexBoxRow>
          <Counter />
          <TransferTon />
          <Jetton />
        </FlexBoxCol>
      </AppContainer>
    </StyledApp>
  );
}

export default App;
