import { useState } from "react";
import { Address, toNano, fromNano } from "ton";
import { useTonConnect } from "../hooks/useTonConnect";
import { Card, FlexBoxCol, FlexBoxRow, Button, Input, Ellipsis } from "./styled/styled";
import { useTonClient } from "../hooks/useTonClient";
import { useAsyncInitialize } from "../hooks/useAsyncInitialize";

export function TransferTon() {
  const { client } = useTonClient();
  const { wallet, sender, connected } = useTonConnect();

  const [tonAmount, setTonAmount] = useState("0.01");
  const [tonRecipient, setTonRecipient] = useState(
    "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c"
  );

  const balance = useAsyncInitialize(async () => {

    if(!client || !wallet) return;
    return client.getBalance(Address.parse(wallet))

  }, [client, wallet])

  return (
    <Card>
      <FlexBoxCol>
        <h3>Transfer TON</h3>
        <FlexBoxRow>
          <label style={{width: 80}}>Balance </label>
          <Ellipsis>{ balance ? fromNano(balance) + ' TON' : "Loading..." }</Ellipsis>
        </FlexBoxRow>
        <FlexBoxRow>
          <label style={{width: 80}}>Amount </label>
          <Input
            style={{ marginRight: 8 }}
            type="number"
            value={tonAmount}
            onChange={(e) => setTonAmount(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <FlexBoxRow>
          <label style={{width: 80}}>To </label>
          <Input
            style={{ marginRight: 8 }}
            value={tonRecipient}
            onChange={(e) => setTonRecipient(e.target.value)}
          ></Input>
        </FlexBoxRow>
        <Button
          disabled={!connected}
          style={{ marginTop: 18 }}
          onClick={async () => {
            sender.send({
              to: Address.parse(tonRecipient),
              value: toNano(tonAmount),
            });
          }}
        >
          Transfer
        </Button>
      </FlexBoxCol>
    </Card>
  );
}
