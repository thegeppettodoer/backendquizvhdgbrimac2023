// tests/calculator.spec.tx
const { describe, it } = require('mocha');
const assert = require('chai').assert;

const { addition } = require("../src/utils/calculator");

describe("Calculator Tests", () => {
    it("should return 5 when 2 is added to 3", () => {
        const result = addition(2, 3);
        assert.equal(result, 5);
    });
});
