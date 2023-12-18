## Assignment by FlexMoney

PS : to build an
admission form for the Yoga Classes which happen every month.

## Tech Stack 🛠️

Frontend:

[![My Skills](https://skills.thijs.gg/icons?i=react,nodejs,vite,css,html,js&theme=light)](https://skills.thijs.gg)

Backend:

[![My Skills](https://skills.thijs.gg/icons?i=express,nodejs,prisma,postgres,js&theme=light)](https://skills.thijs.gg)

### SQL queries used:

(Part of Migration)

```
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "batch" "Batch" NOT NULL,
    "last_paid" TIMESTAMP(3),

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

```

## Simple Documentation

<details>
<summary>Flow</summary>

1. Users registers for the first time with basic information. All the basic validation checks have been made as mentioned in the requirements.
2. Next steps is for verfication, which essentially verifies the registration status of user and heads them to payment.
3. All the information is presented here about the user and the subscription status.
4. Users can pay the amount and choose batch if required again (they can choose bacth in step 1 as well), the pay button here siulates the payment system.
5. At any point in time, to check the subscription status the `last_paid` field in db is used to verify in the verify stage.

</details>

<details>
<summary>APIS</summary>

### Registration:

Register User
Registers a new user with the provided information.

URL : /register
Method : POST
Request : Body

| Field | Type   | Description                 |
| ----- | ------ | --------------------------- |
| name  | string | User's name                 |
| email | string | User's email address        |
| age   | string | User's age                  |
| batch | string | User's batch (subscription) |

Status Code: 201 Created
Error Code: 401

### Check User

Register User
Checks if a user with the provided email exists.

URL : /check-user
Method : POST
Request : Body
| Field | Type | Description |
|--------|--------|------------------------------|
| email | string | User's email address |

Success Code : 200 OK
Error Code : 400 Bad Request

### Subscription Data

Retrieves subscription data based on the provided subscription ID.

URL : /sub-data
Method : POST
Request : Body
| Field | Type | Description |
|--------|--------|------------------------------|
| subId | string | Subscription ID |

Success Code: 200 OK
Error Code : 400 Bad Request

### Expiry

Updates the status of a subscription to mark it as expired based on the provided subscription ID.

URL : /sub-expiry
Method : POST
Request : Body

| Field | Type   | Description     |
| ----- | ------ | --------------- |
| subId | string | Subscription ID |

Success Code : 200 OK
Error Code : 400 Bad Request

</details>
