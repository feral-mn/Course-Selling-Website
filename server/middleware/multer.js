import path from 'path';
import multer from 'multer';
console.log("Multer middleware loaded");
const upload = multer({
    
    dest: "uploads/",
    limits: {
        fileSize: 50*1024*1024  // 50MB
    },
    storage: multer.diskStorage({
        destination: 'uploads/',
        filename: (_req, file, cb) => {
            cb(null, file.originalname);
        },
    }),
    fileFilter: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.webp' && ext !== '.png') {
            cb(new Error('Only Image files are allowed!'), false);
            return;
        }
        cb(null, true);
    },
})
console.log("Multer middleware Exited");

export default upload;