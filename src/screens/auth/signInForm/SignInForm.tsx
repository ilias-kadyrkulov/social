'use client'

import { useId } from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { FormType } from '../auth.types'
import s from './SignInForm.module.scss'

export default function SignInForm() {
    const id = useId()

    // const initialState = {
    //   message: null,
    //   errors: {}
    // }
    // const [state, dispatch] = useFormState(handleSubmit, initialState)

    const FormSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email.').required('Required.'),
        password: Yup.string()
            // .min(6, 'Password should be more than 6 symbols.')
            .max(20, 'Password should be less than 20 symbols.')
            .required('Required.'),
        rememberMe: Yup.boolean()
    })

    const handleSubmit = async ({ email, password, rememberMe }: FormType) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        rememberMe: rememberMe
                    })
                }
            )

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
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={{ email: '', password: '', rememberMe: true }}
            validationSchema={FormSchema}
        >
            {({ errors, touched }) => (
                <Form className={s.sign_in_form}>
                    <Field type="text" name="email" placeholder="Email..." />
                    {errors.email && touched.email ? (
                        <div>{errors.email}</div>
                    ) : null}
                    <Field
                        type="text"
                        name="password"
                        placeholder="Password..."
                        autoComplete="off"
                    />
                    {errors.password && touched.password ? (
                        <div>{errors.password}</div>
                    ) : null}
                    <div>
                        <Field
                            type="checkbox"
                            name="rememberMe"
                            id={`${id}-rememberMe`}
                        />
                        <label htmlFor={`${id}-rememberMe`}>Save user</label>
                    </div>

                    <button type="submit">Sign in</button>
                </Form>
            )}
        </Formik>
    )
}
