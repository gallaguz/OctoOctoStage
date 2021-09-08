//     Copyright (C) 2021 Okulov Rostislav
//
//     This program is free software: you can redistribute it and/or modify
//     it under the terms of the GNU Affero General Public License as published
//     by the Free Software Foundation, either version 3 of the License, or
//     (at your option) any later version.
//
//     This program is distributed in the hope that it will be useful,
//     but WITHOUT ANY WARRANTY; without even the implied warranty of
//     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//     GNU Affero General Public License for more details.
//
//     You should have received a copy of the GNU Affero General Public License
//     along with this program.  If not, see <https://www.gnu.org/licenses/>.
//

'use strict';

const yaml = require('js-yaml');
const fs   = require('fs');
const configPath = './config.yml';
let config;

if (fs.existsSync(configPath)) {
    const doc = yaml.load(fs.readFileSync(configPath, 'utf8'));
    config = {
        client: 'mysql2',
        connection: {...doc.dbParams},
    };
} else {
    config = {
        client: 'mysql2',
        connection: {
            host: process.env.OCTO_DB_HOST,
            user: process.env.OCTO_DB_USER,
            password: process.env.OCTO_DB_PASSWORD,
            database: process.env.OCTO_DB_NAME,
        };
    };
}

module.exports = config
