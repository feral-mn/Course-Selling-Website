import { Router } from 'express';
import course_controller from '../controller/course_controller.js';
import auth from '../middleware/auth.js';

const router = Router();
router.get('/', course_controller.getAllCourses);
router.route('/:id')
    .get(auth, course_controller.getCourseById);

export default router;