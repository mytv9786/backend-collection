import express from "express";
import {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";
import { verifyToken, authorizeRoles } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post(
  "/",
  //verifyToken,
  //authorizeRoles('admin', 'superadmin'),
  addCustomer,
);
router.get("/", getCustomers);
router.put(
  "/:id",
  verifyToken,
  authorizeRoles("admin", "superadmin"),
  updateCustomer,
);
//router.delete('/:id', deleteCustomer);

export default router;
