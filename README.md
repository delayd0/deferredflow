# deflow
Deferred execution flow, used mainly to wait for a predefined number of callbacks to complete.

Flow is dictated by promises, hence it plays nice with async/await feature.

Default number of calls to wait before the flow is executed is 1.

## Usage

```javascript
const DeferredFlow = require('deferredflow');

// Create new flow, that should wait for 2 calls before execution
const flow = new DeferredFlow(2);

// Async calls
setTimeout(() => flow.next(true), 50);
setTimeout(() => flow.next(), 50);

// Flow execution point
// Result contains an array with results of the 'next' calls -> [true, undefined]
const flowResult = await flow.dispense();
```