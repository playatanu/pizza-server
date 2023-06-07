import multer from 'multer';

const MAX_FILE_SIZE = 104857; // Max size 1 MB

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `uploads/${file.fieldname}-${Date.now()}.${ext}`);
    }
});

const upload = multer({
    storage: multerStorage,
    limits: { fileSize: MAX_FILE_SIZE }
});

export default upload;
