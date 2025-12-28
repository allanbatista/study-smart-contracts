
const CounterContract = artifacts.require("CounterContract");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("CounterContract", function (/* accounts */) {
  it("should assert true", async function () {
    await CounterContract.deployed();
    return assert.isTrue(true);
  });

  it('should count counter', async function () {
      const counterInstance = await CounterContract.deployed();

      const count = await counterInstance.counter();

      return assert.equal(count, 1);
  })

    it('should increate counter', async function () {
        const counterInstance = await CounterContract.deployed();

        let count = await counterInstance.counter();
        assert.equal(count, 1);

        await counterInstance.increment();
        count = await counterInstance.counter();
        assert.equal(count, 2);
    })
});
