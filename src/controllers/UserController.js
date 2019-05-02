const Users = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires_in });
};

class UserController {
    async index(req, res) {
        try {
            const users = await Users.find();
            console.log(res.locals.auth_data);
            return res.json(users);
        } catch (error) {
            res.status(500).send({ error: "Error ao consultar usuários!" });
        }
    }

    async create(req, res) {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).send({ message: "Dados Insuficientes" });
        try {
            if (await Users.findOne({ email })) return res.status(400).send({ error: "Usuário já registrado!" });
            const user = await Users.create({ email: req.body.email, password: req.body.password });
            user.password = undefined;

            return res.status(201).json({ user, token: createUserToken(user.id) });
        } catch (error) {
            return res.status(500).send({error: "Erro ao criar usuário!"});
        }

    }

    async auth(req, res) {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send({ message: "Dados Insuficientes" });

        try {
            const user = await Users.findOne({email}).select('+password');

            if(!user) return res.status(400).send({error: "Usuário não registrado!"});

            const pass_ok = await bcrypt.compare(password, user.password);

            if(!pass_ok) return res.status(401).send({error: "Erro ao autenticar o usuário!"});
            user.password = undefined;
            return res.json({ user, token: createUserToken(user.id) });
        } catch (error) {
            return res.status(500).send({error: "Erro ao buscar usuário!"});
        }
    }
}

module.exports = new UserController();

/*
200 - OK
201 - Created
202 - Accepted
400 - Bad Request
401 - Unauthorized -- autenticação, sem token.
403 - Forbidden -- autorização
404 - Not Found
500 - Internal Server Error
501 - Not Implemented -- a api não suporta essa funcionalidade.
503 - Service Unavailable -- Está indisponível.
*/