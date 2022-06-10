# Solana Counter Example

## Requirements:
```shell
nodejs
npm
rust
cargo
solana cli
anchor cli
```

## Installation (Ubuntu example):
This installation will work on Ubuntu standard or Ubuntu WSL2.
```shell
sudo apt update
sudo apt install nodejs npm curl
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env
sh -c "$(curl -sSfL https://release.solana.com/v1.10.24/install)"
export PATH="/root/.local/share/solana/install/active_release/bin:$PATH"
npm install -g @project-serum/anchor-cli
```

## Working with this repository:
```shell
anchor build
anchor deploy
anchor run app
```
