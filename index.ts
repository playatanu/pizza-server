import 'dotenv/config';

import app from './src/app';
import db from './src/config/db.config';

const DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/pizza';

db.connect(DB_URI, () => console.log('database connected'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running at port ${PORT}`));
