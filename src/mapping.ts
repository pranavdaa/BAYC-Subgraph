import { BigInt } from "@graphprotocol/graph-ts"
import {
  Transfer as TransferEvent,
  Contract as Contract
} from "../generated/Contract/Contract"
import { Ape,User } from "../generated/schema"

export function handleTransfer(event: TransferEvent): void {
    let ape = Ape.load(event.params.tokenId.toString())
    if(!ape)
    {
      ape = new Ape(event.params.tokenId.toString());
      ape.creator = event.params.to.toHexString();
      ape.createdAtTimestamp = event.block.timestamp;

      let contract = Contract.bind(event.address);
      ape.contentURI = contract.tokenURI(event.params.tokenId);
    }
    ape.owner = event.params.to.toHexString();
    ape.save();

    let user = User.load(event.params.tokenId.toString());
    if(!user)
    {
      user = new User(event.params.to.toHexString());
      user.save();
    }
  }