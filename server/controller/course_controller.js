import courseModel from '../model/course_model.js';
async function getAllCourses(req, res, next){
    const course = await courseModel.find({}).select('-lectures');
    res.status(200).json({
        success: true,
        count: course.length,
        data: course
    })
}

async function getCourseById(req, res){
    const {id} = req.params;
    const course = await courseModel.findById(id)
    if(!course){
        return res.status(404).json({
            success: false,
            message: 'Course not found'
        });
    }
    res.status(200).json({
        success: true,
        data: course
    });
}

export default {getAllCourses, getCourseById}