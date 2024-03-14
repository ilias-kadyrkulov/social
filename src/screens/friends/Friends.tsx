// Импорт в компоненте Next.js
import io from 'socket.io-client'

export default function Friends() {
    // Инициализация подключения (можно выполнить в useEffect, если используешь React Hooks)
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER_URL || 'http://localhost:5000')

    // Подписка на события
    socket.on('connect', () => {
        console.log('Connected to the server')
    })

    socket.on('receiveFriendRequest', (data) => {
        // Обработка получения запроса на добавление в друзья
    })

    socket.on('friendRequestResponse', (data) => {
        // Обработка ответа на запрос на добавление в друзья
    })

    return <div>Friends</div>
}
