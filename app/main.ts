import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { CounterExample } from "../target/types/counter_example";

async function main() {

    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);
    const program = anchor.workspace.CounterExample as Program<CounterExample>;


    const counter = anchor.web3.Keypair.generate();


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
    console.log(`Success! Our public key is ${counter.publicKey}`);

    
    console.log("Incrementing our counter by 1...");
    await program.methods.increment(
      new anchor.BN(1)
    )
    .accounts({
      counter: counter.publicKey,
      authority: provider.wallet.publicKey,
    })
    .rpc();
    console.log("Successfully incremented by 1!");


    console.log("Incrementing our counter by 3...");
    await program.methods.increment(
      new anchor.BN(3)
    )
    .accounts({
      counter: counter.publicKey,
      authority: provider.wallet.publicKey,
    })
    .rpc();
    console.log("Successfully incremented by 3!");


    console.log("Decrementing our counter by 1...");
    await program.methods.decrement(
      new anchor.BN(1)
    )
    .accounts({
      counter: counter.publicKey,
      authority: provider.wallet.publicKey,
    })
    .rpc();
    console.log("Successfully decremented by 1!");
}

main().then(
    () => process.exit(),
    err => {
        console.error(err);
        process.exit(-1);
    },
);