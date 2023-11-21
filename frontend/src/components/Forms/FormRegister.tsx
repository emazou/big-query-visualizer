import { UserRegister } from "@/types";
import { Button, Form, Input, Row, message } from "antd";
import { FC, useEffect } from "react";
import styles from "@/styles/FormAuth.module.css";
import { useLoginMutation, useRegisterMutation } from "@/features/user/userAPI";
import { ArrowRightOutlined, SendOutlined } from "@ant-design/icons";
import { setToken, setUser } from "@/features/user/userSlice";
import { useAppDispatch } from "@/app/hooks/hooks";
import { forEach } from "lodash";
import Link from "next/link";
const { Item } = Form;

const FormRegister: FC = () => {
    const dispatch = useAppDispatch();
    const [register, { isLoading }] = useRegisterMutation();
    const [login, { data }] = useLoginMutation();
    const onFinish = (values: UserRegister) => {
        register(values)
            .unwrap()
            .then((res) => {
                message.success(res?.message);
                login({ username: values.username, password: values.password });
            })
            .catch((err) => {
                forEach(err?.data?.message, (value, key) => {
                    message.error(`${key}: ${value}`);
                });
            });
    };
    useEffect(() => {
        if(data){
            dispatch(setToken(data.data.access));
            dispatch(setUser(data.data.user));
            message.success('Login success');
        }
    },[data]);

    return (
        <Form<UserRegister>
            className={styles.form}
            layout="vertical"
            onFinish={onFinish}
        >
            <Item<UserRegister>
                className={styles.formItem}
                label="First Name"
                name="first_name"
                rules={[{ 
                    required: true, 
                    message: 'Please input your fisrt name!' 
                }]}
            >
                <Input placeholder="Firs name" />
            </Item>
            <Item<UserRegister>
                className={styles.formItem}
                label="Last Name"
                name="last_name"
                rules={[{ 
                    required: true, 
                    message: 'Please input your last name!' 
                }]}
            >
                <Input placeholder="Last name" />
            </Item>
            <Item<UserRegister>
                className={styles.formItem}
                label="Username"
                name="username"
                rules={[{ 
                    required: true, 
                    message: 'Please input your username!' 
                }]}
            >
                <Input placeholder="Your username" />
            </Item>
            <Item<UserRegister>
                className={styles.formItem}
                label="Email"
                name="email"
                rules={[{ 
                    required: true,
                    message: 'Please input your email!' 
                }]}
            >
                <Input type='mail' placeholder="youremail@email.com" />
            </Item>
            <Item<UserRegister>
                className={styles.formItem}
                label="Password"
                name="password"
                rules={[{ 
                    required: true,
                    message: 'Please input your password!' 
                }]}
            >
                <Input.Password placeholder="Password" minLength={8} />
            </Item>
            <Item<UserRegister>
                className={styles.formItem}
                label="Confirm Password"
                name="password2"
                rules={[{ 
                    required: true,
                    min: 8,
                    message: 'Your password must be at least 8 characters long' 
                }]}
            >
                <Input.Password placeholder="Password" />
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
                    <Link 
                        href={'/login'}
                    >Do you have an account? Login <ArrowRightOutlined />
                    </Link>
                </Row>
            </Item>
        </Form>
    );
};

export default FormRegister;