import Link from 'next/link'
import Image from 'next/image'
import SignInForm from './signInForm/SignInForm'
import logo from '@/assets/imgs/logo-no-background.svg'
import s from './AuthPage.module.scss'

export default function AuthPage() {
    return (
        <div className={s.auth + ' container'}>
            <div className={s.auth_content}>
                <div className={s.left_block}>
                    <div className={s.first_inner}>
                        <h4>Recently logged</h4>
                        <p>Press a name or photo to sign in</p>
                    </div>
                    <div className={s.second_inner}>
                        <span>Social for Mobile Devices</span>
                        <img src="" alt="Mobile app screenshot" />
                    </div>
                </div>
                <div className={s.right_block}>
                    <div className={s.first_inner}>
                        <div className={s.first_inner_item}>
                            <Image
                                src={logo}
                                width={100}
                                height={62.5}
                                alt="Logo"
                            />
                            <h3>Sign in to Social</h3>
                        </div>
                        <SignInForm />
                        <div className={s.qr_code}>QR</div>
                    </div>
                    <div className={s.second_inner}>
                        <Link href="auth/registration">
                            <button>Sign up</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={s.auth_footer}>
                <span>Social 2024</span> {/* //TODO - AboutUs page */}
                <span>by Ilias Kadyrkulov</span>
            </div>
        </div>
    )
}
