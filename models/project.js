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

const Group = require("./group.js");
const {Model} = require('objection');

module.exports = class Project extends Model {
    static tableName = 'projects';

    static relationMappings = {
        group: {
            relation: Model.BelongsToOneRelation,
            modelClass: Group,
            join: {
                from: 'projects.group_id',
                to: 'groups.id'
            }
        }
    }
}
