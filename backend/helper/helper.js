// const { expressjwt: expressjwt } = require("express-jwt");
import { expressjwt } from "express-jwt";

function jwt() {
  return expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
  }).unless({
    path: [
      "/api/login",
      "/api/register",
      {
        url: /\/api\/(.*)/,
        methods: ["GET", "OPTIONS"],
      },
    ],
  });
}

export default jwt;
