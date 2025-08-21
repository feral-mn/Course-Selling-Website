import { Router } from 'express'
import user_controller from '../controller/user_controller.js'
import format from '../middleware/format.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/multer.js'


const router = Router()

router.post('/register',upload.single('avatar'), format, user_controller.register)
router.post('/login', format, user_controller.login)
router.get('/logout', user_controller.logout)
router.get('/me', auth, user_controller.me)

export default router