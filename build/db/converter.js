"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converter2 = exports.converter = void 0;
function converter() {
    return {
        toFirestore: (data) => data,
        fromFirestore: (snap) => {
            return snap.data();
        },
    };
}
exports.converter = converter;
const converter2 = () => {
    return {
        toFirestore: (data) => data,
        fromFirestore: (snap) => {
            return snap.data();
        },
    };
};
exports.converter2 = converter2;
//# sourceMappingURL=converter.js.map