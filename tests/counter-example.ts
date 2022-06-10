const assert = require("assert");
import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { CounterExample } from "../target/types/counter_example";

describe("counter-example", () => {


  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const counter = anchor.web3.Keypair.generate();
  const program = anchor.workspace.CounterExample as Program<CounterExample>;


  it("Let's create a counter", async () => {
    console.log("Creating account for our counter...");

    await program.methods.create(
      provider.wallet.publicKey
    )
    .accounts({
      counter: counter.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([counter])
    .rpc();

    let counterAccount = await program.account.counter.fetch(counter.publicKey);
    assert.ok(counterAccount.authority.equals(provider.wallet.publicKey));
    assert.ok(counterAccount.count.toNumber() === 0);
    console.log(`Success! Our public key is ${counter.publicKey}`);
  });


  it("Let's increment by 1", async () => {
    console.log("Incrementing our counter by 1...");

    await program.methods.increment(
      new anchor.BN(1)
    )
    .accounts({
      counter: counter.publicKey,
      authority: provider.wallet.publicKey,
    })
    .rpc();

    const counterAccount = await program.account.counter.fetch(
      counter.publicKey
    );
    assert.ok(counterAccount.authority.equals(provider.wallet.publicKey));
    assert.ok(counterAccount.count.toNumber() == 1);
    console.log("Successfully incremented by 1!");
  });

  it("Let's increment by 3", async () => {
    console.log("Incrementing our counter by 3...");

    await program.methods.increment(
      new anchor.BN(3)
    )
    .accounts({
      counter: counter.publicKey,
      authority: provider.wallet.publicKey,
    })
    .rpc();

    const counterAccount = await program.account.counter.fetch(
      counter.publicKey
    );
    assert.ok(counterAccount.authority.equals(provider.wallet.publicKey));
    assert.ok(counterAccount.count.toNumber() == 4);
    console.log("Successfully incremented by 3!");
  });

  it("Let's decrement by 1", async () => {
    console.log("Decrementing our counter by 1...");

    await program.methods.decrement(
      new anchor.BN(1)
    )
    .accounts({
      counter: counter.publicKey,
      authority: provider.wallet.publicKey,
    })
    .rpc();

    const counterAccount = await program.account.counter.fetch(
      counter.publicKey
    );
    assert.ok(counterAccount.authority.equals(provider.wallet.publicKey));
    assert.ok(counterAccount.count.toNumber() == 3);
    console.log("Successfully decremented by 1!");
  });
});
