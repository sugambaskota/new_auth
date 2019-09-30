import express from 'express';
import moment from 'moment';
const router = express.Router();
const User = require('../models/user_model');
const auth = require('../middleware/auth');
const UserLoginInfo = require('../models/user_login_info_model');

router.post('/users', async (req: any, res: any) => {
    try {
        let user: any = await User.create(req.body);
        let token: any = await user.generateAuthToken();
        res.status(201).json({
            "User": user,
            "Token": token
        });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req: any, res: any) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.json({
            "User": user,
            "Token": token
        });
    } catch (e) {
        res.status(404).send(e);
    }
});

router.post('/users/logout', auth, async (req: any, res: any) => {
    try {
        await UserLoginInfo.destroy({
            where: {
                uuid: req.token
            }
        });
        res.status(202).send();
    } catch (e) {
        res.status(404).send();
    }
});

router.get('/users/profile', auth, async (req: any, res: any) => {
    try {
        await UserLoginInfo.update({
            expiresAt: moment().add('2', 'hours')
        }, {
            where: {
                uuid: req.token
            }
        });
        res.status(200).json(req.user);
    } catch (e) {
        res.status(408).send();
    }
});

module.exports = router;