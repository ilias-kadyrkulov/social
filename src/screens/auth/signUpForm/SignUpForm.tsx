'use client'

import { useId, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { FormType } from '../auth.types'
import s from './SignUpForm.module.scss'

type ErrorsType = {
  email: string
  password: string
}

export const SignUpForm = () => {
  const [errors, setErrors] = useState<ErrorsType | null>(null)

  const id = useId()

  const handleSignUp = async ({ email, password, rememberMe }: FormType) => {
    setErrors(null)

    try {
      const res = await fetch('http://localhost:5000/auth/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      console.log(res)

      if (res.ok) {
        const data = await res.json()
        console.log(data)
        if (rememberMe) {
          window.localStorage.setItem('token', data.token)
        }
      } else {
        const errorData = await res.json()
        console.log(errorData)

        setErrors(errorData)
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <Formik onSubmit={handleSignUp} initialValues={{ email: '', password: '', rememberMe: true }}>
      <Form className={s.sign_up_form}>
        <Field type="text" name="email" placeholder="Email..." />
        {errors?.email && <div className={s.error}>{errors.email}</div>}
        <Field type="text" name="password" placeholder="Password..." autoComplete="off" />
        {errors?.password && <div className={s.error}>{errors.password}</div>}
        <div>
          <Field type="checkbox" name="rememberMe" id={`${id}-rememberMe`} />
          <label htmlFor={`${id}-rememberMe`}>Save user</label>
        </div>

        <button type="submit">Sign up</button>
      </Form>
    </Formik>
  )
}
