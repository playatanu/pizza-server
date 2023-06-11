import { Server } from 'socket.io';

const userToSocket = new Map<string, string>();
const socketToUser = new Map<string, string>();

export enum ESocketEvent {
    ORDER_STATUS_CHANGED = 'order status changed'
}

let io = new Server();

const socketConnection = (server: any) => {
    io = new Server(server);

    io.on('connection', (socket) => {
        socket.on('init', (user) => {
            //console.log(`${user.id} connected`);

            userToSocket.set(user.id, socket.id);
            socketToUser.set(socket.id, user.id);
        });

        socket.on('disconnect', () => {
            const userId = socketToUser.get(socket.id);

            if (userId) {
                userToSocket.delete(userId);
                socketToUser.delete(socket.id);

                //console.log(`${userId} disconnected`);
            }
        });
    });
};

export const sendMessage = (userId: string, message: object) => {
    const socketId = userToSocket.get(userId);

    if (socketId) {
        io.to(socketId).emit('message', message);

        return true;
    }

    return false;
};

export default socketConnection;
