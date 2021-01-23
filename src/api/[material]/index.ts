import {Router} from "express";
import auth from "../../utils/auth";

const rMaterial = Router();

/**
 * product end points
 */

import registerMaterial from "./register";
import deleteMaterial from "./delete";
import viewMaterial from "./view";
import updateMaterial from "./update";

rMaterial.post("/register", auth.iMan, registerMaterial);
rMaterial.delete("/delete/:materialId", auth.iMan, deleteMaterial);
rMaterial.get("/view", auth.iMan, viewMaterial);
rMaterial.put("/update/:materialId", auth.iMan, updateMaterial);


/**
 * stock end points
 */

import registerStock from "./stock/register";
import deleteStock from "./stock/delete";
import viewStock from "./stock/view";
import updateStock from "./stock/update";


rMaterial.post("/stock/register", auth.iMan, registerStock);
rMaterial.delete("/stock/delete/:stockId", auth.iMan, deleteStock);
rMaterial.get("/stock/view", auth.iMan, viewStock);
rMaterial.put("/stock/update/:stockId", auth.iMan, updateStock);


export default rMaterial;