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

const userService = require('../../services/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../../exceptions/api-error');

const registration = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return next(
                ApiError.BadRequest('Ошибка при валидации', errors.array())
            );
        }

        const { name, email, password, passwordConfirmation } = req.body;

        const userData = await userService.registration(
            name,
            email,
            password,
            passwordConfirmation
        );

        res.cookie('refreshToken', userData.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });

        return res.json(userData);
    } catch (e) {
        next(e);
    }
};

module.exports = registration;
