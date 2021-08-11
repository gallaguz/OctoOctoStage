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

const models = require('../models');

exports.list = async (request, response) => {
    const getAllGroupsWithProjects = await models.group.query().withGraphJoined('project');
    const allRequests = await models.request.query();
    const allGroups = await models.group.query();
    const allProjects = await models.project.query();

    response.render('request/list', {
        groupsWithProjects: getAllGroupsWithProjects,
        groups: allGroups,
        projects: allProjects,
        requests: allRequests
    });
}

exports.add = async (request, response) => {
    const getAllGroupsWithProjects = await models.group.query().withGraphJoined('project');
    const allGroups = await models.group.query();
    const allProjects = await models.project.query();
    const allPriorities = await  models.priority.query();
    const allStatuses = await  models.status.query();

    response.render('request/add', {
        groupsWithProjects: getAllGroupsWithProjects,
        groups: allGroups,
        projects: allProjects,
        priorities: allPriorities,
        statuses: allStatuses
    });
};

exports.item = async (request, response) => {
    const getId = request.params.id;
    const getAllGroupsWithProjects = await models.group.query().withGraphJoined('project');
    const requestId = await models.request.query().findById(getId);
    const getRepliesById = await models.reply.getById(getId);

    response.render('request/item', {
        groupsWithProjects: getAllGroupsWithProjects,
        requestId: requestId,
        replies: getRepliesById
    });
}
