import express from "express"
import { db } from "../../utils/db.js";
const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, age, batch } = req.body;
    const i_age = parseInt(age)
    const user = await db.user.findUnique({
        where: {
            email: email,
        },
    });
    if (user) {
        return res.status(200).json({ status: false, msg: "User Exists" })
    }

    try {
        const user = await db.user.create({
            data: {
                email: email,
                name: name,
                age: i_age,
                subscription: {
                    create: {
                        batch: batch
                    }
                },
            },
            include: {
                subscription: true
            }

        });
        res.status(201).json({ status: true, msg: "Registration successful", user: user });
    }
    catch (exp) {
        res.status(401).json({ status: false, msg: "In process" });
    }

})

router.post('/check-user', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await db.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user) {
            return res.status(200).json({ status: true, msg: "User Exists", user: user })
        }
        return res.status(400).json({ status: false, msg: "User Does not exists" })
    }
    catch (err) {
        return res.status(400).json({ status: false, msg: "User Does not exists" })
    }
})

router.post('/sub-data', async (req, res) => {
    const { subId } = req.body
    try {
        const sub = await db.subscription.findUnique({
            where: {
                id: subId
            }
        })
        if (sub) {
            return res.status(200).json({ status: true, msg: "Subscirption created", sub: sub })
        }
        return res.status(400).json({ status: true, msg: "Subscirption Problem" })
    }
    catch (err) {
        return res.status(400).json({ status: false, msg: "Subscription Does not exists" })
    }
})

router.patch('/sub-edit', async (req, res) => {
    const { subId, batch } = req.body;
    try {
        const sub = await db.subscription.update({
            where: {
                id: subId
            },
            data: {
                status: true,
                batch: batch,
                last_paid: new Date()
            }
        })
        return res.status(200).json({ status: true, msg: "Subscirption updated", sub: sub })
    } catch (err) {
        return res.status(400).json({ status: false, msg: "Update Failed" })
    }
})

router.patch('/sub-expiry', async (req, res) => {
    const { subId } = req.body;
    try {
        const sub = await db.subscription.update({
            where: {
                id: subId
            },
            data: {
                status: false,
            }
        })
        return res.status(200).json({ status: true, msg: "Subscirption updated", sub: sub })
    } catch (err) {
        return res.status(400).json({ status: false, msg: "Update Failed" })
    }
})

export default router;