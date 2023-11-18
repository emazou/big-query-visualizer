import { UserLogin } from "@/types";
import { Button, Form, Input, Row, message } from "antd";
import { FC } from "react";
import styles from "@/styles/FormAuth.module.css";
import { useLoginMutation } from "@/features/user/userAPI";
import { SendOutlined } from "@ant-design/icons";
import { setToken, setUser } from "@/features/user/userSlice";
import { useAppDispatch } from "@/app/hooks/hooks";
import Link from "next/link";
const { Item } = Form;

const FormLogin: FC = () => {
    const dispatch = useAppDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const onFinish = (values: UserLogin) => {
        login(values)
            .unwrap()
            .then((res) => {
                dispatch(setToken(res.data.access));
                dispatch(setUser(res.data.user));
                message.success('Login success');
            })
            .catch((err) => message.error(err.data.message));
    };

    return (
        <Form<UserLogin>
            className={styles.form}
            layout="vertical"
            onFinish={onFinish}
        >
            <Item<UserLogin>
                className={styles.formItem}
                label="Username"
                name="username"
                rules={[{ 
                    required: true, 
                    message: 'Please input your username!' 
                }]}
            >
                <Input />
            </Item>
            <Item<UserLogin>
                className={styles.formItem}
                label="Password"
                name="password"
                rules={[{ 
                    required: true,
                    message: 'Please input your password!' 
                }]}
            >
                <Input.Password />
            </Item>
            <Item>
                <Row justify="center" >
                    <Button
                        icon={<SendOutlined />}
                        type="primary"
                        loading={isLoading} 
                        htmlType="submit"
                        className={styles.buttonSubmit}
                    >
                        Send
                    </Button>
                    <Link href={'/register'} >Do you don't have an account? Register</Link>
                </Row>
            </Item>
        </Form>
    );
};

export default FormLogin;