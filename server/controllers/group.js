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
    const getAllGroupsWithProjects = await models.group
        .query()
        .withGraphJoined('project');
    const allGroups = await models.group.query();

    response.render('group/list', {
        groupsWithProjects: getAllGroupsWithProjects,
        groups: allGroups,
    });
};

exports.item = async (request, response) => {
    const getId = request.params.id;
    const getAllGroupsWithProjects = await models.group
        .query()
        .withGraphJoined('project');
    const groupId = await models.group.query().findById(getId);
    const getAllProjectsForGroup = await models.group
        .query()
        .findById(getId)
        .withGraphJoined('project');
    response.render('group/item', {
        groupsWithProjects: getAllGroupsWithProjects,
        groupId: groupId,
        projectsByGroup: getAllProjectsForGroup,
    });
};

exports.add = async (request, response) => {
    const getAllGroupsWithProjects = await models.group
        .query()
        .withGraphJoined('project');
    response.render('group/add', {
        groupsWithProjects: getAllGroupsWithProjects,
    });
};

exports.save = async (request, response) => {
    const body = request.body;
    await models.group.query().insert(body);
    response.sendStatus(200);
};
