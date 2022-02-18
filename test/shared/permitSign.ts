import { Wallet } from "ethers";
import { BigNumber, BytesLike } from "ethers";

export async function getPermit(
  wallet: Wallet,
  verifyingContract: string,
  from: BigNumber,
  to: BigNumber,
  attrId: BigNumber,
  amount: BigNumber,
  deadline: BigNumber,
  nonce: BigNumber
): Promise<BytesLike> {
  const name = "WEB3DAO@CN";
  const version = "1.0";
  const chainId = await wallet.getChainId();

  let signature = await wallet._signTypedData(
    { name, version, chainId, verifyingContract },
    {
      permit: [
        { name: "from", type: "uint256" },
        { name: "to", type: "uint256" },
        { name: "attrId", type: "uint256" },
        { name: "amount", type: "uint256" },
        { name: "deadline", type: "uint256" },
        { name: "nonce", type: "uint256" },
      ],
    },
    {
      from: from,
      to: to,
      attrId: attrId,
      amount: amount,
      deadline: deadline,
      nonce: nonce,
    }
  );

  return signature;
}
