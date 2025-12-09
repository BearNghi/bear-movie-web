const jwt = require("jsonwebtoken");

function verify(req, res, next) {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET || "secretKey", (err, user) => {
            if (err) res.status(403).json("Token không hợp lệ!");
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("Bạn chưa xác thực!");
    }
}
module.exports = verify;