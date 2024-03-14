import type { Metadata } from 'next'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { SignUpForm } from "@/screens/auth/signUpForm/SignUpForm";

export const metadata: Metadata = {
  title: 'Register',
  ...NO_INDEX_PAGE
}

export default function Page() {
  return <SignUpForm />
}
