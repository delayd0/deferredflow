'use strict';

module.exports = exports = class DeferredFlow {

    constructor(callsCount) {
        // number of calls to wait before the flow stops
        this._callsCount = callsCount || 1;

        // callbacks result
        this._results = [];
    }

    dispense() {
        return new Promise((resolve, reject) => {
            this._resolve = resolve;
            this._reject = reject;
        });
    }

    next(result) {
        // stop at once
        if (result instanceof Error) {
            return this._reject(result);
        }

        // collect result
        this._results.push(result);

        // continue if limit is not reached 
        if (--this._callsCount) {
            return;
        }

        return this._resolve(this._results.length > 1 ? this._results : this._results[0]);
    }

};