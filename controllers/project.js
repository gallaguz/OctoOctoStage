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
    const allProjects = await models.project.query();

    response.render('project/list', {
        groupsWithProjects: getAllGroupsWithProjects,
        projects: allProjects
    });
}

exports.item = async (request, response) => {
    const getAllGroupsWithProjects = await models.group.query().withGraphJoined('project');
    const projectId = await models.project.query().findById(request.params.id);

    response.render('project/item', {
        groupsWithProjects: getAllGroupsWithProjects,
        projectId: projectId
    })
}
