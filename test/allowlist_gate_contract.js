const AllowlistGateContract = artifacts.require("AllowlistGateContract");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("AllowlistGateContract", function (accounts) {
  const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

  it('should set deployer as owner', async () => {
    const instance = await AllowlistGateContract.new({ from: accounts[3] });

    assert.equal(await instance.owner(), accounts[3]);
  })

  it('should add address to allowed_list when owner', async () => {
    const instance = await AllowlistGateContract.new();

    // sanity check that not exists already into allowed_list
    assert.equal(await instance.allowed_list(accounts[1]), false);

    // insert into
    await instance.addToList(accounts[1]);

    // check if account address is on allowed_list
    assert.equal(await instance.allowed_list(accounts[1]), true);
  })

  it('should reject address(0) when adding to allowed_list', async () => {
    const instance = await AllowlistGateContract.new();

    // sanity check that not exists already into allowed_list
    assert.equal(await instance.allowed_list(ADDRESS_ZERO), false);

    // insert into
    try {
      await instance.addToList(ADDRESS_ZERO);
      throw new Error('Not able to add address');
    } catch (e) {
      assert.equal(e.reason, 'Invalid address');
    }

    // check if account address is on allowed_list
    assert.equal(await instance.allowed_list(ADDRESS_ZERO), false);
  })

  it('should reject duplicate address when adding to allowed_list', async () => {
    const instance = await AllowlistGateContract.new();

    // sanity check that not exists already into allowed_list
    assert.equal(await instance.allowed_list(accounts[1]), false);

    // insert into
    await instance.addToList(accounts[1]);

    // check if account address is on allowed_list
    assert.equal(await instance.allowed_list(accounts[1]), true);

    try {
      await instance.addToList(accounts[1]);
      throw new Error("this error must not happen")
    } catch (e) {
      assert.equal(e.reason, "account already exists");
    }
  })

  it('should reject adding to allowed_list when not owner', async () => {
    const instance = await AllowlistGateContract.new();

    // sanity check that not exists already into allowed_list
    assert.equal(await instance.allowed_list(accounts[2]), false);

    // insert into
    try {
      await instance.addToList(accounts[2], {
        from: accounts[1],
      });
    } catch (e) {
      assert.equal(e.reason, 'owner is required')
    }

    // sanity check that not exists into allowed_list
    assert.equal(await instance.allowed_list(accounts[2]), false);
  })

  it('should remove address from allowed_list when owner', async () => {
    const instance = await AllowlistGateContract.new();

    const account = accounts[1]

    // sanity check that not exists already into allowed_list
    assert.equal(await instance.allowed_list(account), false);

    // insert into
    await instance.addToList(account);

    // check if account address is on allowed_list
    assert.equal(await instance.allowed_list(account), true);

    await instance.removeFromList(account);

    // check if account address is on allowed_list
    assert.equal(await instance.allowed_list(account), false);
  })

  it('should reject removing from allowed_list when not owner', async () => {
    const instance = await AllowlistGateContract.new();

    const account = accounts[1]

    // sanity check that not exists already into allowed_list
    assert.equal(await instance.allowed_list(account), false);

    // insert into
    await instance.addToList(account);

    // check if account address is on allowed_list
    assert.equal(await instance.allowed_list(account), true);

    try {
      await instance.removeFromList(account, { from: accounts[2] });
    } catch (e) {
      assert.equal(e.reason, 'owner is required')
    }

    // check if account address is on allowed_list
    assert.equal(await instance.allowed_list(account), true);
  })

  it('should not change allowed_list when removing non-existent account', async () => {
    const instance = await AllowlistGateContract.new();

    const account = accounts[1];

    assert.equal(await instance.allowed_list(account), false)

    await instance.removeFromList(account);

    // sanity check
    assert.equal(await instance.allowed_list(account), false)
  })

  it('should emit WhitelistedEvent when adding address', async () => {
    const instance = await AllowlistGateContract.new();

    const account = accounts[1];

    await instance.allowed_list(account);

    // insert into
    const result = await instance.addToList(account);

    // check if event was delivered
    assert.equal(result.logs[0].event, 'WhitelistedEvent');
    assert.equal(result.logs[0].args.account, account);
    assert.equal(result.logs[0].args.allowed, true);
  })

  it('should emit WhitelistedEvent when removing address', async () => {
    const instance = await AllowlistGateContract.new();

    const account = accounts[1];

    // insert into
    await instance.addToList(account);

    // remove
    const result = await instance.removeFromList(account);

    // check if event was delivered
    assert.equal(result.logs[0].event, 'WhitelistedEvent');
    assert.equal(result.logs[0].args.account, account);
    assert.equal(result.logs[0].args.allowed, false);
  })

  it('should allow owner to increment counter', async () => {
    const instance = await AllowlistGateContract.new();

    const account = accounts[1];

    await instance.addToList(account);

    assert.equal((await instance.counter()).toNumber(), 0);

    await instance.increment();

    assert.equal((await instance.counter()).toNumber(), 1);
  })

  it('should allow allowed_list account to increment counter', async () => {
    const instance = await AllowlistGateContract.new();

    const account = accounts[1];

    await instance.addToList(account);

    assert.equal((await instance.counter()).toNumber(), 0);

    await instance.increment({from: account});

    assert.equal((await instance.counter()).toNumber(), 1);
  })

  it('should reject increment from non-allowed_list account', async () => {
    const instance = await AllowlistGateContract.new();

    const account = accounts[1];

    await instance.addToList(account);

    assert.equal((await instance.counter()).toNumber(), 0);

    const not_allowed_account = accounts[2];

    try {
      await instance.increment({from: not_allowed_account});
    } catch (e) {
      assert.equal(e.reason, 'account is not authorized')
    }

    assert.equal((await instance.counter()).toNumber(), 0);
  })

  it('should reject increment after account is removed from allowed_list', async () => {
    const instance = await AllowlistGateContract.new();

    const account = accounts[1];

    await instance.addToList(account);

    assert.equal((await instance.counter()).toNumber(), 0);

    await instance.increment({ from: account });

    assert.equal((await instance.counter()).toNumber(), 1);

    await instance.removeFromList(account);

    try {
      await instance.increment({from: account});
    } catch (e) {
      assert.equal(e.reason, 'account is not authorized')
    }

    assert.equal((await instance.counter()).toNumber(), 1);
  })
});
