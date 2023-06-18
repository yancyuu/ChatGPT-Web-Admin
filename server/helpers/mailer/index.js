"use strict";
// mK10yOvqbRX+fCUPIysUWbowJD9YR4jqRdSr7qDjXEkEnoUfhlzhYMUdHeBPfvRXZdGPPvwUaGvNtSC3QHxuSrVW7+9y5gNPU0zIooWqLus8avJUP9tqaiaU8KhE8SJ/iuGenBvG4XxWpvmiF3g+EB9+Eo9jZoJfnDoCgP7TpRE=
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const config_1 = tslib_1.__importDefault(require("../../config"));
const transporter = nodemailer_1.default.createTransport({
    ...config_1.default.getConfig('email_config')
});
const baseOptions = {
    from: `"ChatGpt" <${config_1.default.getConfig('email')}>`
};
// 用 Promise 包装发送邮件的操作
const sendMail = (opts) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(opts, (err, resp) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(resp);
            }
        });
    });
};
exports.default = {
    async send(to, body, title = '通知邮件', type = 'code') {
        const sendOptions = Object.assign(baseOptions, {
            to,
            subject: title,
            html: body
        });
        return sendMail(sendOptions);
    }
};
//# sourceMappingURL=index.js.map