require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('food'));

const nodemailer = require('nodemailer');

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'recipesystem',
    insecureAuth: true,
});

app.get('/food/:id/ingredients', (req, res) => {
    db.query('SELECT * FROM ingredients WHERE food_id = ?', req.params.id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/food/:id/steps', (req, res) => {
    db.query('SELECT * FROM steps WHERE food_id = ?', req.params.id, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/foods/all', (req, res) => {
    db.query('SELECT * FROM food', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/food_name', (req, res) => {
    db.query('SELECT food_name FROM food', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/create', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    db.query('SELECT name FROM user WHERE name = ?', name, (err, selectResult) => {
        if (err) {
            console.log(err);
        } else {
            if (selectResult.length === 0) {
                db.query(
                    'INSERT INTO user (name, email , password) VALUES (?,?,?)', [name, email, password],
                    (err, insertResult) => {
                        db.query('SELECT user_id, name FROM user WHERE name = ?', name, (err, selectResult2) => {
                            if (selectResult2.length !== 1) {
                                console.log(selectResult2);
                                res.send({ success: false });
                                return;
                            }
                            if (err) {
                                console.log(err);
                            } else {
                                const id = selectResult2[0]['user_id'];
                                const token = jwt.sign({ id }, 'SECRET');

                                res.send({ success: true, token });
                            }
                        });
                    }
                );
            } else {
                res.send({ success: false });
            }
        }
    });
});

app.post('/login', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    db.query('SELECT * FROM user WHERE name = ?', name, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }

        if (result.length === 1) {
            if (result[0].password !== password) {
                res.send({ success: false });
            } else {
                const id = result[0]['user_id'];
                const token = jwt.sign({ id }, 'SECRET');

                res.send({ success: true, token });
            }
        } else {
            res.send({ success: false });
        }
    });
});

app.post('/verify-token', (req, res) => {
    const token = req.body.token;

    if (!token) {
        res.send({ success: false });
        return;
    }

    jwt.verify(token, 'SECRET', (err, decoded) => {
        if (err) {
            res.send({ success: false });
            return;
        }

        const id = decoded.id;
        db.query('SELECT name FROM user WHERE user_id = ?', id, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            if (result.length === 1) {
                res.send({ success: true, name: result[0].name });
            } else {
                res.send({ success: false });
            }
        });
    });
});

app.post('/contact', (req, res) => {
    const token = req.body.token;
    if (!token) {
        res.send({ msgSent: false, error: 'token' });
        return;
    }
    jwt.verify(token, 'SECRET', (err, decoded) => {
        if (err) {
            res.send({ success: false });
            return;
        }

        const id = decoded.id;

        const message = req.body.message;

        db.query('INSERT INTO users_message VALUES (?,?)', [id, message], (err, result) => {
            if (err) {
                console.log(err);
                res.send({ msgSent: false, token: true });
            } else {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    },
                });
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: 'smobasheramini@gmail.com, sarafz9978@gmail.com',
                    subject: `from ${id}`,
                    text: message,
                };
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                        res.send({ msgSent: false, token: true });
                    } else {
                        console.log('Email sent: ' + info.response);
                        res.send({ msgSent: true });
                    }
                });
            }
        });
    });
});

app.get('/foods/iranian', (req, res) => {
    db.query('SELECT * FROM food WHERE tag = ?', 'ایرانی', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/foods/cake', (req, res) => {
    db.query('SELECT * FROM food WHERE tag = ?', 'کیک و شیرینی', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get('/foods/fastfood', (req, res) => {
    db.query('SELECT * FROM food WHERE tag = ?', 'فست فود', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.listen(3001, () => {
    console.log('Yey, your server is running on port 3001');
});