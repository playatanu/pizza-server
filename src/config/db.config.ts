import mongoose from 'mongoose';

const db = {
    connect: (uri: string, cb: VoidFunction) => {
        mongoose
            .connect(uri)
            .then(() => {
                cb();
            })
            .catch((error) => console.log(error.message));
    }
};

export default db;
