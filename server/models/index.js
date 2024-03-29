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

const group = require('./group.js');
const project = require('./project.js');
const user = require('./user.js');
const request = require('./request.js');
const reply = require('./reply.js');
const priority = require('./priority.js');
const status = require('./status.js');
const tag = require('./tag.js');
const token = require('./token.js');

module.exports = {
    group,
    project,
    request,
    user,
    reply,
    priority,
    status,
    tag,
    token,
};
