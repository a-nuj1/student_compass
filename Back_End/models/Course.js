import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter course title'],
        trim: true,
        minLength: [3, 'Course title cannot be less than 3 characters'],
        maxLength: [100, 'Course title cannot exceed 100 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter course price'],
        maxLength: [5, 'Course price cannot exceed 5 characters'],
        default: 0.0,
    },
    description: {
        type: String,
        required: [true, 'Please enter course description'],
        minLength: [5, 'Course description cannot be less than 5 characters'],
    },
    lectures: [
        {
            title: {
                type: String,
                required: [true, 'Please enter lecture title'],
                
            },
            description: {
                type: String,
                required: true,
            },
            video: {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                }
            },
        },
    ],
    
    views: {
        type: Number,
        default: 0,
    },
    numOfVideos: {
        type: Number,
        default: 0,
    },

    category: {
        type: String,
        required: [true, 'Please select category for this course'],
        // enum: {
        //     values: [
        //         'Web Development',
        //         'Mobile Development',
        //         'Data Structure',
        //         'Algorithms',
        //         'Machine Learning',
        //         'Artificial Intelligence',
        //         'python',
        //         'Java',
        //         'Game Development',
        //         'Business',
        //         'UI/UX',
        //         'Data Science',
        //         'Other',
        //     ],
        //     message: 'Please select correct category for course',
        // },
    },

    createdBy: { 
        type: String,
        required: [true, 'Please enter course creator name'],
    },
    createdAt: { 
        type: Date,
        default: Date.now,
    },


    poster: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },

});

export const Course = mongoose.model('Course', courseSchema);