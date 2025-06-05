"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCatchProbability = calculateCatchProbability;
function calculateCatchProbability(fishLevel, catchRate) {
    const diff = catchRate - fishLevel;
    const probability = Math.min(Math.max(0.1 + diff / 100, 0.05), 0.95); // entre 5% et 95%
    return probability;
}
