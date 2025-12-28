const CounterWithOwnerContract = artifacts.require("CounterWithOwnerContract");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("CounterWithOwnerContract", function (accounts) {
    it("should assert true", async function () {
        await CounterWithOwnerContract.deployed();
        return assert.isTrue(true);
    });

    it('should start at counter 0', async function () {
        const instance = await CounterWithOwnerContract.new();

        const counter = await instance.counter();

        return assert.equal(counter.toString(), "0");
    })

    it('should increment when is owner', async () => {
        const instance = await CounterWithOwnerContract.new();

        let counter = await instance.counter();

        await instance.increment();

        let newCounter = await instance.counter();

        return assert.equal(counter.toNumber()+1, newCounter);
    });

    it('should increment when is not a owner', async () => {
        const instance = await CounterWithOwnerContract.new();

        const nonOwner = accounts[1];

        await instance.increment({ from: nonOwner });

        const counter = await instance.counter();

        return assert.equal(counter.toString(), "1");
    })

    it('should reset when is a owner', async () => {
        const instance = await CounterWithOwnerContract.new();

        const nonOwner = accounts[1];

        await instance.increment({ from: nonOwner });

        let counter = await instance.counter();

        assert.equal(counter.toString(), "1");

        await instance.reset({ from: accounts[0] });

        counter = await instance.counter();

        return assert.equal(counter.toString(), "0");
    })

    it('should not reset when is not a owner', async () => {
        const instance = await CounterWithOwnerContract.new();

        const nonOwner = accounts[1];

        await instance.increment({ from: nonOwner });

        let counter = await instance.counter();

        assert.equal(counter.toString(), "1");

        try {
            await instance.reset({ from: nonOwner });
        } catch(error) {
            assert.equal(error.reason, 'owner is required');
        }

        counter = await instance.counter();

        return assert.equal(counter.toString(), "1");
    })

    it('should not increment when is paused', async () => {
        const instance = await CounterWithOwnerContract.new();

        assert.equal(await instance.is_running(), true);

        await instance.toggle_pause();

        assert.equal(await instance.is_running(), false);

        try {
            await instance.increment();
        } catch(error) {
            assert.equal(error.reason, 'was paused by owner');
        }

        const counter = await instance.counter();

        return assert.equal(counter.toString(), "0");
    })

    it('should reset when is paused but still paused', async () => {
        const instance = await CounterWithOwnerContract.new();

        await instance.increment();

        assert.equal((await instance.counter()).toString(), "1");

        await instance.toggle_pause();

        await instance.reset();

        assert.equal((await instance.counter()).toString(), "0")

        return assert.equal(await instance.is_running(), false);
    })
});
