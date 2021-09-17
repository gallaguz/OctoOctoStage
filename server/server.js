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

const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const serverParams = require('./config/server');
const router = require('./routers');
const { initDb } = require('./models/db.js');
const errorMiddleware = require('./middlewares/error-middleware');

const app = express();
app.use(cookieParser());
const allowList = [serverParams.CLIENT_URL];
app.use(
    cors({
        credentials: true,
        origin: allowList,
    })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(router);
app.use(errorMiddleware);

initDb();

app.listen(serverParams.PORT, () => {
    console.log('OctoOctoRequest successfully starts!');
    console.log(`Visit http://localhost:${serverParams.PORT}/`);
});
