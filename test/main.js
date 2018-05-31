'use strict';

// Load dependencies
const TestCase = require('ava');
const DeferredFlow = require('..');

TestCase('stops when default calls count is met', async (t) => {
    const dflow = new DeferredFlow();

    setTimeout(() => dflow.next(true), 100);

    const flowResult = await dflow.dispense();
    t.true(flowResult);
});

TestCase('stops when calls count is reached', async (t) => {
    const dflow = new DeferredFlow(2);

    setTimeout(() => dflow.next(true), 100);
    setTimeout(() => dflow.next(false), 100);

    const flowResult = await dflow.dispense();
    t.deepEqual([true, false], flowResult);
});

TestCase('stops with error, on first encountered call', async (t) => {
    const dflow = new DeferredFlow(2);

    setTimeout(() => dflow.next(new Error('failed :{')), 100);
    setTimeout(() => dflow.next(false), 100);

    await t.throws(dflow.dispense(), { instanceOf: Error, message: 'failed :{' });
});