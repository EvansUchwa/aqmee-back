var jwt = require("jsonwebtoken");
function middleware(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ error: true, message: "Not Authentified" });

  try {
    console.log(process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userConnected = decoded;

    // if (req.userConnected.grade == "superAdmin") {
    //   next();
    // } else {
    //   res.status(403).send({ error: true, message: "Not authorized" });
    // }
    next();
  } catch (ex) {
    console.log(ex);

    res.status(400).send({ error: true, message: "Invalid token" });
  }
}

module.exports = {
  middleware,
};
