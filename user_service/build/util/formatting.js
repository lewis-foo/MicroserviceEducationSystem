"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function connectionString(config) {
    return `mongodb+srv://${config.username}:${config.password}@${config.host}/${config.name}?retryWrites=true&w=majority`;
}
exports.connectionString = connectionString;
//# sourceMappingURL=formatting.js.map