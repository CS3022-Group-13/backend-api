import {Router} from "express";

import registerMaterial from "./register";
import deleteMaterial from "./delete";
import viewMaterial from "./view";
import updateMaterial from "./update"



import registerStock from "./registerstock";
import deleteStock from "./deletestock";
import viewStock from "./viewstock";
import updateStock from "./updatestock";


const rMaterial = Router();

rMaterial.get('/')
rMaterial.post('/register',registerMaterial)
rMaterial.delete('/delete/:materialId',deleteMaterial)
rMaterial.get('/view/:materialId',viewMaterial)
rMaterial.put('/update/:materialId',updateMaterial)

rMaterial.post('/registerstock',registerStock)
rMaterial.post('/deletestock/:stockId',deleteStock)
rMaterial.post('/viewstock/:stockId',viewStock)
rMaterial.post('/updatestock/:stockId',updateStock)


export default rMaterial
