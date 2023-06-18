'use strict';
// mK10yOvqbRX+fCUPIysUWbowJD9YR4jqRdSr7qDjXEkEnoUfhlzhYMUdHeBPfvRXZdGPPvwUaGvNtSC3QHxuSrVW7+9y5gNPU0zIooWqLus8avJUP9tqaiaU8KhE8SJ/iuGenBvG4XxWpvmiF3g+EB9+Eo9jZoJfnDoCgP7TpRE=
Object.defineProperty(exports, '__esModule', { value: true });
function getConfig(key) {
    const config = {
        port: 3200,
        mysql_config: {
            dialect: 'mysql',
            host: '43.156.76.15',
            port: 3306,
            username: 'chatgpt',
            password: 'dPs4zKtDxhijt87P',
            database: 'chatgpt',
            timezone: '+08:00',
            dialectOptions: {
                dateStrings: true,
                typeCast: true
            }
        },
        redis_config: {
            type: 'redis',
            host: '43.156.76.15',
            port: 6379,
            password: 'redis'
        },
        email: '1191500820@qq.com',
        email_config: {
            host: 'smtp.qq.com',
            port: 465,
            ignoreTLS: true,
            secure: false,
            auth: {
                user: '1191500820@qq.com',
                pass: 'ktqqegpigqpligdd'
            }
        }
    };
    if (key) {
        return config[key];
    }
    return config;
}
exports.default = {
    getConfig
};
//# sourceMappingURL=index.js.map