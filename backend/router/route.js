import { Router } from "express";
const router = Router();

/** import controllers */
import * as controller from "../controllers/controller.js";

/** Questions Routes API */

router.route("/english").post(controller.getenglish);
router.route("/hindi").post(controller.gethindi);
router.route("/cpp").post(controller.getcpp);

router.route("/javascript").post(controller.getQuestions); /** GET Request */
// .post(
//   controller.insertQuestions
// ) /** POST Request  other way to insert question with postman*/
// .delete(controller.dropQuestions); /** DELETE Request */

router
  .route("/result")
  .get(controller.getResult)
  .post(controller.storeResult)
  .delete(controller.dropResult);

router.route("/register").post(controller.registerUser);

router.route("/login").post(controller.loginUser);

export default router;
