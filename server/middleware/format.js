import z from 'zod';
import AppError from '../util/error.js'; // Assuming you have this AppError class

const formatSchema = z.object({
    email: z.string().email().max(40).toLowerCase(),
    password: z.string()
        .min(8, { message: "Password must be 8 or more characters long" })
        .max(20, { message: "Password must be 20 or fewer characters long" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/, {
            message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        }),// This is your single "universal" validator factory function
    name: z.string()
        .min(3, { message: "Name must be 3 or more characters long" })
        .max(20, { message: "Name must be 20 or fewer characters long" })
        .optional(),
});

/**
 * Middleware for validating request body using Zod schema.
 * If validation fails, it passes an AppError to the next error handling middleware.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The next middleware function in the stack.
 */
function format(req, res, next){
    console.log('Entering format middleware');
    const parsedBody = formatSchema.safeParse(req.body);

    if (!parsedBody.success) {
        // FIX: Corrected typo from 'parsed_body' to 'parsedBody'
        const errorMessages = parsedBody.error.issues.map(issue => issue.message);

        // Instead of directly sending a 400 response, pass an AppError to the global error handler.
        // This ensures consistent error formatting and logging.
        return next(new AppError(`Validation failed: ${errorMessages.join(', ')}`, 400));
    }

    console.log("Exited format middleware successfully");
    next(); // Proceed to the next middleware or route handler
}

export default format;

// import z from 'zod'

// const formatSchema = z.object({
//     email: z.string().email().max(40).toLowerCase(),
//     password: z.string().min(8, { message: "Password ust be 8 or more characters long" }).max(20, { message: "Password must be 20 or fewer characters long" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/, {message: "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"}),
//     name: z.string().min(3, { message: "Name must be 3 or more characters long" }).max(20, { message: "Name must be 20 or fewer characters long" }).optional(),
// })

// function format(req, res, next){
//     console.log('format')
//     const parsedBody = formatSchema.safeParse(req.body)
//     try{
//         if(!parsedBody.success){
//             const errorMessages = parsed_body.error.issues.map(issue => issue.message);
//             return res.status(400).json({
//                 success: false,
//                 message: "Validation failed",
//                 errors: errorMessages
//             });
//         }
//         console.log("Exited format middleware")
//         next()
//     }catch(e){
//         console.error('Validation middleware error:', e);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error during validation"
//         });
//     }
// }

// export default format

