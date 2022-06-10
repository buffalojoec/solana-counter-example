use anchor_lang::prelude::*;

declare_id!("4UUnHXMudMNTMvzK2F7CHoL6kZJjm71gEweduDtyAzvg");

#[program]
mod counter_example {
    use super::*;

    pub fn create(ctx: Context<Create>, authority: Pubkey) -> Result<()> {
        msg!("Initializing counter account...");
        msg!("This account will store a numerical value as a counter.");
        let counter = &mut ctx.accounts.counter;
        counter.authority = authority;
        counter.count = 0;
        msg!("Success.");
        Ok(())
    }

    pub fn increment(ctx: Context<ChangeCounter>, amount: u64) -> Result<()> {
        msg!("Increment method called.");
        let counter = &mut ctx.accounts.counter;
        msg!("Current value for counter is: {}", &counter.count);
        counter.count += amount;
        msg!("Value for counter is now: {}", &counter.count);
        msg!("Done.");
        Ok(())
    }

    pub fn decrement(ctx: Context<ChangeCounter>, amount: u64) -> Result<()> {
        msg!("Increment method called.");
        let counter = &mut ctx.accounts.counter;
        msg!("Current value for counter is: {}", &counter.count);
        counter.count -= amount;
        msg!("Value for counter is now: {}", &counter.count);
        msg!("Done.");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = user, space = 8 + 40)]
    pub counter: Account<'info, Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct ChangeCounter<'info> {
    #[account(mut, has_one = authority)]
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
}

#[account]
pub struct Counter {
    pub authority: Pubkey,
    pub count: u64,
}