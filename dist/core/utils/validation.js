"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeSearchParam = exports.validateEmail = void 0;
const validateEmail = (email) => {
    return email
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
exports.validateEmail = validateEmail;
const normalizeSearchParam = (value, defaultValue, min, max) => {
    console.log(value, defaultValue, typeof value, typeof defaultValue);
    if (typeof defaultValue === "number") {
        if (isNaN(value)) {
            return defaultValue;
        }
        else if (value == null || value == undefined) {
            return defaultValue;
        }
    }
    if (typeof value !== typeof defaultValue) {
        return defaultValue;
    }
    console.log(min, max);
    if (min != undefined && value < min) {
        return defaultValue;
    }
    if (max != undefined && value > max) {
        return defaultValue;
    }
    return value;
};
exports.normalizeSearchParam = normalizeSearchParam;
//# sourceMappingURL=validation.js.map