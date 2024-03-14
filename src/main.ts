import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const PORT = process.env.PORT || 5000

    const app = await NestFactory.create(AppModule)
    app.enableCors({
        origin: ['http://localhost:3000'],
        credentials: true,
        exposedHeaders: 'set-cookie'
    })
    app.use(cookieParser())
    app.setGlobalPrefix('api')

    await app.listen(PORT, () =>
        console.log('Server is running on port ' + PORT)
    )
}
bootstrap()
