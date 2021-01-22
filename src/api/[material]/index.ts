import {Router} from "express";

import registerMaterial from "./register";
import deleteMaterial from "./delete";
import viewMaterial from "./view";
import updateMaterial from "./update"

const rMaterial = Router();

rMaterial.get('/')
rMaterial.post('/register',registerMaterial)
rMaterial.delete('/delete/:materialId',deleteMaterial)
rMaterial.get('/view/:materialId',viewMaterial)
rMaterial.put('/update/:materialId',updateMaterial)

export default rMaterial
