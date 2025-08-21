import {model , Schema} from 'mongoose';

const courseSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please provide a course title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters'],
        minlength: [5, 'Title must be at least 5 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide a course description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please provide a course price'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Please provide a course category'],
        enum: ['Programming', 'Design', 'Marketing', 'Business', 'Other']
    },
    lecture:[
        {
            title: String,
            description: String,
            lecture: {
                public_id:{
                    type: String,
                    required: [true, 'Please provide a public ID for the lecture video']
                },
                secure_url: {
                    type: String,
                    required: [true, 'Please provide a secure URL for the lecture video']
                }
            }
        }
    ],
    thumbnail: {
        public_id: {
            type: String,
            required: [true, 'Please provide a public ID for the course thumbnail']
        },
        secure_url: {
            type: String,
            required: [true, 'Please provide a secure URL for the course thumbnail']
        }
    },
    numbersOfLectures: {
        type: Number,
        default: 0
    },
    createdBy:{
        type: String,
    }
},{timestamps: true});

const courseModel = model('course', courseSchema);

export default  courseModel;