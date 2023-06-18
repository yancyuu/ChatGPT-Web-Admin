"use strict";
// mK10yOvqbRX+fCUPIysUWbowJD9YR4jqRdSr7qDjXEkEnoUfhlzhYMUdHeBPfvRXZdGPPvwUaGvNtSC3QHxuSrVW7+9y5gNPU0zIooWqLus8avJUP9tqaiaU8KhE8SJ/iuGenBvG4XxWpvmiF3g+EB9+Eo9jZoJfnDoCgP7TpRE=
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../../models");
const queue_1 = require("../queue");
async function scheduleToken() {
    const tokens = await models_1.tokenModel.getTokens({ page: 0, page_size: 100 }, {
        status: 1
    });
    const list = tokens.rows;
    list.forEach((item) => {
        queue_1.checkTokenQueue.addTask({
            ...item.toJSON()
        });
    });
}
exports.default = scheduleToken;
//# sourceMappingURL=scheduleToken.js.map