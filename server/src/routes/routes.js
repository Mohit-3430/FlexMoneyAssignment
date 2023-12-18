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
        console.log(exp)
        res.status(401).json({ status: false, msg: "In process" });
    }

})

router.post('/check-user', async (req, res) => {
    const { email } = req.body;
    const user = await db.user.findUnique({
        where: {
            email: email,
        },
    });
    if (user) {
        return res.status(200).json({ status: true, msg: "User Exists" })
    }
    return res.status(400).json({ status: false, msg: "User Does not exists" })
})

export default router;