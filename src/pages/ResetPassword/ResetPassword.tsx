import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import styles from '../ResetPassword/ResetPassword.module.css';
import AuthorizeApi from '../../api/authorizeApi';
import { checkEmail } from '../SignUp/verification';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import jwt from 'jwt-decode';
let authService = new AuthorizeApi();

export default function () {
    const [form] = Form.useForm();
    const history = useHistory();

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    let query = useQuery();

    const validationSchema = {
        Email: [
            { required: true, message: "Поле електронна пошта є обов'язковим" },
            { validator: checkEmail },
        ],
        Password: [
            { required: true, message: "Поле пароль є обов'язковим" },
            { min: 6, message: 'Мінімальна допустима довжина - 6 символів' },
        ],
        ConfirmPassword: [
            { required: true, message: "Дане поле є обов'язковим" },
            { min: 6, message: 'Мінімальна допустима довжина - 6 символів' },
        ]
    };

    const handleSubmit = async (values: any) => {
        const newPassword = {
            email: values.Email,
            password: values.Password,
            confirmPassword: values.ConfirmPassword,
            code: query.get("token"),
        }
        await authService.resetPassword(newPassword);
        history.push("/signin");
    };

    const initialValues = {
        Email: '',
        Password: '',
        ConfirmPassword: '',
        Code: ''
    };

    return (
        <div className={styles.mainContainerReset}>
            <Form
                name="ResetPasswordForm"
                initialValues={initialValues}
                form={form}
                onFinish={handleSubmit}>

                <div className={styles.resetPasswordContainer}>
                    <p>Скидування пароля. Введіть електронну пошту</p>
                </div>
                <Form.Item name="Email" rules={validationSchema.Email}>
                    <Input
                        className={styles.ResetPasswordInput}
                        placeholder="Електронна пошта"
                    />
                </Form.Item>

                <Form.Item name="Password" rules={validationSchema.Password}>
                    <Input.Password visibilityToggle={false} className={styles.ResetPasswordInput} placeholder="Пароль" />
                </Form.Item>

                <Form.Item
                    name="ConfirmPassword"
                    dependencies={['Password']}
                    rules={[
                        {
                            required: true,
                            message: 'Підтвердіть пароль',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue('Password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Паролі не співпадають'));
                            },
                        }),
                    ]}
                >
                    <Input.Password visibilityToggle={false} className={styles.ResetPasswordInput} placeholder="Повторіть пароль" />
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" id={styles.confirmButton}>
                        Скинути пароль
                </Button>
                </Form.Item>
            </Form>
        </div>
    );
}