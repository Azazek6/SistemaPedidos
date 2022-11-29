import {Router} from 'express'
import clientes from './clientes.routes.js'
import productos from './producto.routes.js'
import pedidos from './pedido.routes.js'
import detalle from './detalle.routes.js'
import categoria from './categoria.routes.js'
import marca from './marca.routes.js'
import home from './home.routes.js'
import login from './login.routes.js'
import trabajadores from './trabajadores.routes.js'
import cerrar from './cerrar.routes.js'
import configuracion from './configuracion.routes.js'
const router = Router()
router.use('/clientes',clientes)
router.use('/producto',productos)
router.use('/pedidos',pedidos)
router.use('/detalle',detalle)
router.use('/categoria',categoria)
router.use('/marca',marca)
router.use('/',home)
router.use('/login',login)
router.use('/trabajadores',trabajadores)
router.use('/cerrar',cerrar)
router.use('/configuracion',configuracion)







export default router 

