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

const { Model } = require('objection');
const Group = require("./group.js");
const Project = require("./project.js");
const Status = require("./status.js");
const Priority = require("./priority.js");
const User = require("./user.js");

module.exports = class Request extends Model {
    static get tableName() {
        return 'requests';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['id', 'subject', 'description', 'user_id', 'project_id', 'group_id', 'priority_id', 'status_id'],
            properties: {
                id: { type: 'integer' },
                subject: { type: 'string' },
                description: { type: 'string' },
                userId: { type: 'integer' },
                projectId: { type: 'integer' },
                groupId: { type: 'integer' },
                priorityId: { type: 'integer' },
                statusId: { type: 'integer' }
            }
        }
    }

    static get relationMappings() {
        return {
            group: {
                relation: Model.BelongsToOneRelation,
                modelClass: Group,
                join: {
                    from: 'requests.group_id',
                    to: 'groups.id'
                }
            },
            project: {
                relation: Model.BelongsToOneRelation,
                modelClass: Project,
                join: {
                    from: 'requests.project_id',
                    to: 'projects.id'
                }
            },
            status: {
                relation: Model.BelongsToOneRelation,
                modelClass: Status,
                join: {
                    from: 'requests.status_id',
                    to: 'statuses.id'
                }
            },
            priority: {
                relation: Model.BelongsToOneRelation,
                modelClass: Priority,
                join: {
                    from: 'requests.priority_id',
                    to: 'priorities.id'
                }
            },
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'requests.user_id',
                    to: 'users.id'
                }
            }
        }
    }

    static async getAllRequestsForDashboard() {
        return Request
            .query().withGraphJoined('status').withGraphJoined('priority').withGraphJoined('user');
    }

    static async getAllRequestsForProject(id) {
        return Request
            .query().withGraphJoined('group').withGraphJoined('project').where('project_id', id);
    }
}
