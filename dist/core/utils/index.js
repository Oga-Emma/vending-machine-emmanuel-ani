"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeChangeArray = void 0;
const computeChangeArray = (amount) => {
    const coinArray = [5, 10, 20, 50, 100];
    const changeArray = [0, 0, 0, 0, 0];
    for (let coinIndex = coinArray.length - 1; coinIndex >= 0; coinIndex--) {
        const coin = coinArray[coinIndex];
        if (amount >= coin) {
            changeArray[coinIndex] = Math.floor(amount / coin);
            amount = amount % coin;
        }
    }
    return changeArray;
};
exports.computeChangeArray = computeChangeArray;
//# sourceMappingURL=index.js.map