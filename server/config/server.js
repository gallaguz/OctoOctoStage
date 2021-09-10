'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const configPath = './config.yml';

const yamlConfig = () => {
    const res = yaml.load(fs.readFileSync(configPath, 'utf8'));
    return fs.existsSync(configPath) ? res.serverParams : false;
};

const processConfig = () => {
    return {
        serverParams: {
            PORT: process.env.PORT || 3000,
            JWT_ACCESS_SECRET:
                process.env.JWT_ACCESS_SECRET || 'jwt-secret-key',
            JWT_REFRESH_SECRET:
                process.env.JWT_REFRESH_SECRET || 'jwt-secret-key',
            CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:8080',
        },
    };
};

module.exports = yamlConfig() || processConfig();
