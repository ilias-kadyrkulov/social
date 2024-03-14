import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'socket.io'

@WebSocketGateway({
    cors: {
        origin: '*'
    }
})

export class AppGateway {
    @WebSocketServer()
    server: Server

    @SubscribeMessage('sendFriendRequest')
    handleSendFriendRequest(@MessageBody() data: { receiveId: string; senderId: string }) {
        // Логика обработки отправки запроса на дружбу
    }
}
