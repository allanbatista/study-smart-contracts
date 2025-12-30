const AllowlistGateContract = artifacts.require("AllowlistGateContract");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("AllowlistGateContract", function (accounts) {
  it("should assert true", async function () {
    await AllowlistGateContract.deployed();
    return assert.isTrue(true);
  });

  it('should add address to whitelist is owner', async () => {
    const instance = await AllowlistGateContract.new();

    // sanity check that not exists already into whitelisted
    assert.equal(await instance.whitelisted(accounts[1]), false);

    // insert into
    await instance.addToList(accounts[1]);

    // check if account address if on whitelist
    assert.equal(await instance.whitelisted(accounts[1]), true);
  })

  it('should not add to whitelist if not owner', async () => {
    const instance = await AllowlistGateContract.new();

    // sanity check that not exists already into whitelisted
    assert.equal(await instance.whitelisted(accounts[2]), false);

    // insert into
    try {
      await instance.addToList(accounts[2], {
        from: accounts[1],
      });
    } catch (e) {
      assert.equal(e.reason, 'owner is required')
    }

    // sanity check that not exists into whitelisted
    assert.equal(await instance.whitelisted(accounts[2]), false);
  })

  it('should remove from whitelist if owner', async () => {
    const instance = await AllowlistGateContract.new();

    const account = accounts[1]

    // sanity check that not exists already into whitelisted
    assert.equal(await instance.whitelisted(account), false);

    // insert into
    await instance.addToList(account);

    // check if account address if on whitelist
    assert.equal(await instance.whitelisted(account), true);

    await instance.removeFromList(account);

    // check if account address if on whitelist
    assert.equal(await instance.whitelisted(account), false);
  })

  it('should not remove from whitelist if not owner', async () => {
    const instance = await AllowlistGateContract.new();

    const account = accounts[1]

    // sanity check that not exists already into whitelisted
    assert.equal(await instance.whitelisted(account), false);

    // insert into
    await instance.addToList(account);

    // check if account address if on whitelist
    assert.equal(await instance.whitelisted(account), true);

    try {
      await instance.removeFromList(account, { from: accounts[2] });
    } catch (e) {
      assert.equal(e.reason, 'owner is required')
    }

    // check if account address if on whitelist
    assert.equal(await instance.whitelisted(account), true);
  })

  it('should not change the whitelist when accounts not exists when try to remove', async () => {
    const instance = await AllowlistGateContract.new();

    const account = accounts[1];

    assert.equal(await instance.whitelisted(account), false)

    await instance.removeFromList(account);

    // sanity check
    assert.equal(await instance.whitelisted(account), false)
  })

  it('should test if event is been call when add', async () => {
    const instance = await AllowlistGateContract.new();

    const account = accounts[1];

    await instance.whitelisted(account);

    // insert into
    const result = await instance.addToList(account);

    // check if event was delivered
    assert.equal(result.logs[0].event, 'WhitelistedEvent');
    assert.equal(result.logs[0].args.account, account);
    assert.equal(result.logs[0].args.allowed, true);
  })

  it('should test if event is been call when remove', async () => {
    const instance = await AllowlistGateContract.new();

    const account = accounts[1];

    await instance.whitelisted(account);

    // insert into
    await instance.addToList(account);

    // remove
    const result = await instance.removeFromList(account);

    // check if event was delivered
    assert.equal(result.logs[0].event, 'WhitelistedEvent');
    assert.equal(result.logs[0].args.account, account);
    assert.equal(result.logs[0].args.allowed, false);
  })
});
