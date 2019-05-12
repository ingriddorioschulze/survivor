const express = require("express");
const compression = require("compression");
const db = require("./db");
const s3 = require("./s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const password = require("./password");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

const cookieSessionMiddleware = cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 24,
    secret: `Iamasurvivor!Iamgonnamakeit`
});

const app = express();
const server = require("http").Server(app);

app.use(cookieSessionMiddleware);

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

////////////////////CSURF////////////////////

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(express.static("./public"));
app.use(express.json());

////////////////////WELCOME ROUTE////////////////////

app.get(["/welcome", "/register", "/login"], (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

////////////////////REGISTER ROUTE////////////////////

app.post("/api/register", (req, res, next) => {
    password
        .hashPassword(req.body.password)
        .then(hashedPassword => {
            return db.registerUser(
                req.body.firstname,
                req.body.lastname,
                req.body.city,
                req.body.country,
                req.body.email,
                hashedPassword,
                new Date()
            );
        })
        .then(userId => {
            req.session.userId = userId;
            res.redirect("/");
        })
        .catch(next);
});
////////////////////LOGIN ROUTE////////////////////

app.post("/api/login", (req, res) => {
    db.getUser(req.body.email).then(user => {
        if (user == null) {
            return res.status(400).json({ error: "user not found" });
        }

        password
            .checkPassword(req.body.password, user.password)
            .then(doesMatch => {
                if (doesMatch == true) {
                    req.session.userId = user.id;

                    res.redirect("/");
                } else {
                    res.status(400).json({ error: "wrong password" });
                }
            });
    });
});

////////////////////LOGOUT ROUTE////////////////////

app.post("/api/logout", (req, res) => {
    req.session = null;
    res.redirect("/register");
});

function loggedIn(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// ////////////////////UPLOAD PICTURE ROUTE////////////////////

// app.post(
//     "/uploadProfilePicture",
//     loggedIn,
//     uploader.single("picture"),
//     (req, res) => {
//         s3.uploadImage(req.file.path, req.file.filename)
//             .then(url => {
//                 return db
//                     .updateProfilePicture(url, req.session.userId)
//                     .then(() => {
//                         res.json({
//                             url: url
//                         });
//                     });
//             })
//             .catch(error => {
//                 console.error(error);
//                 res.status(500).json({
//                     message: "Upload failed."
//                 });
//             });
//     }
// );

// ////////////////////SEARCH ROUTE////////////////////

// app.get("/api/search", loggedIn, (req, res) => {
//     db.search(req.query.text).then(results => res.json(results));
// });

// ////////////////////GET GARDENS ROUTE////////////////////

app.get("/api/gardens", loggedIn, (req, res) => {
    db.getGardens(req.session.userId).then(gardens => res.json(gardens));
});

// ////////////////////CREATE GARDEN ROUTE////////////////////

app.post("/api/garden", loggedIn, (req, res, next) => {
    return db
        .createGarden(req.body.name, req.session.userId, new Date())
        .then(id => {
            res.json({ id: id });
        })
        .catch(next);
});

// ////////////////////ADD PLANTS ROUTE////////////////////

app.post(
    "/api/plants",
    loggedIn,
    uploader.single("plantPicture"),
    (req, res, next) => {
        s3.uploadImage(req.file.path, req.file.filename).then(url => {
            return db
                .addPlant(
                    req.session.userId,
                    req.body.gardenId,
                    req.body.plantName,
                    req.body.plantScientificName,
                    req.body.date,
                    url,
                    req.body.water,
                    req.body.soil,
                    req.body.pot,
                    req.body.fertilizer,
                    req.body.light,
                    new Date()
                )
                .then(() => {
                    res.sendStatus(200);
                })
                .catch(next);
        });
    }
);

// ////////////////////SHOW GARDEN ROUTE////////////////////
// ////////////////////SHOW PLANTS ROUTE////////////////////

////////////////////EVERYTHING ROUTE////////////////////

app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

server.listen(8080, () => {
    console.log("I am a survivor!");
});
