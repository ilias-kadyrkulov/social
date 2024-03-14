import Image from 'next/image'
import logo from '@/assets/imgs/logo.png'
import s from './Header.module.scss'

export default function Header() {
    return (
        <header className={s.header}>
            <div className="container">
                <Image
                    src={logo}
                    width={70}
                    alt="Logo"
                />
            </div>
        </header>
    )
}
