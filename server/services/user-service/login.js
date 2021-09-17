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

const bcrypt = require('bcrypt');
const ApiError = require('../../exceptions/api-error');
const tokenService = require('../token-service');
const UserModel = require('../../models').user;
const UserDto = require('../../dtos/user-dto');

const login = async (email, password) => {
    const user = await UserModel.query().findOne({ email });

    if (!user) {
        throw ApiError.BadRequest('Пользователь с таким email не найден');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
        throw ApiError.BadRequest('Неверный пароль');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
};

module.exports = login;
