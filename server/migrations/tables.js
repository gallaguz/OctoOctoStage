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

exports.up = function (knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.bigIncrements('id').primary();
            table.string('name').notNullable();
            table.string('email').notNullable();
            table.string('password');
            table.boolean('enabled').defaultTo(true);
            table.timestamps(true, true);
        })
        .createTable('tokens', function (table) {
            table.bigIncrements('id').primary();
            table.bigInteger('user_id').unsigned();
            table.string('refreshToken');
            table.timestamps(true, true);
        })
        .createTable('groups', function (table) {
            table.bigIncrements('id').primary();
            table.string('name');
            table.timestamps(true, true);
        })
        .createTable('projects', function (table) {
            table.bigIncrements('id').primary();
            table.string('name');
            table.bigInteger('group_id').unsigned();
            table.timestamps(true, true);
        })
        .createTable('requests', function (table) {
            table.bigIncrements('id').primary();
            table.text('subject');
            table.text('description');
            table.bigInteger('user_id').unsigned();
            table.bigInteger('project_id').unsigned().nullable();
            table.bigInteger('group_id').unsigned();
            table.bigInteger('priority_id').unsigned().nullable();
            table.bigInteger('status_id').unsigned().nullable();
            table.timestamps(true, true);
        })
        .createTable('replies', function (table) {
            table.bigIncrements('id').primary();
            table.text('content');
            table.bigInteger('request_id').unsigned();
            table.bigInteger('user_id').unsigned();
            table.timestamps(true, true);
        })
        .createTable('priorities', function (table) {
            table.bigIncrements('id').primary();
            table.string('name');
        })
        .createTable('statuses', function (table) {
            table.bigIncrements('id').primary();
            table.string('name');
        })
        .createTable('tags', function (table) {
            table.bigIncrements('id').primary();
            table.string('name');
            table.timestamps(true, true);
        })
        .alterTable('replies', function (table) {
            table.foreign('user_id').references('id').inTable('users');
            table.foreign('request_id').references('id').inTable('requests');
        })
        .alterTable('requests', function (table) {
            table.foreign('user_id').references('id').inTable('users');
            table.foreign('project_id').references('id').inTable('projects');
            table.foreign('group_id').references('id').inTable('groups');
            table.foreign('priority_id').references('id').inTable('priorities');
            table.foreign('status_id').references('id').inTable('statuses');
        })
        .alterTable('projects', function (table) {
            table.foreign('group_id').references('id').inTable('groups');
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('users')
        .dropTable('groups')
        .dropTable('projects')
        .dropTable('requests')
        .dropTable('replies')
        .dropTable('priorities')
        .dropTable('statuses');
};
