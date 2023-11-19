import FormLogin from "@/components/Forms/FormLogin";
import { Col, Row } from "antd";
import { NextPage } from "next";
import Link from 'next/link';
import { useAppSelector } from "@/app/hooks/hooks";
import styles from '@/styles/auth.module.css';
import { useEffect } from "react";
import { useRouter } from "next/router";
import withValidatePageAuthentication 
    from "@/app/hooks/withValidatePageAuthentication";

/**
 * @description Component to display the login page
 * @returns form to login
 */
const LoginPage: NextPage = () => {
    const user = useAppSelector((state) => state.user.value);
    const { push } = useRouter();
    useEffect(() => {
        if(user){
            push('/visual-query-builder');
        }
    });

    return (
        <Row className={styles.containerAll}>
            <Col 
                xs={24}
                sm={24}
                md={24}
                lg={12}
                xl={12}
                xxl={12}
                className={styles.containerForm}>
                <h2>LOG IN</h2>
                <FormLogin />
            </Col>
            <Col 
                xs={0}
                sm={0}
                md={0}
                lg={12}
                xl={12}
                xxl={12}
                className={styles.containerImage} />
        </Row>
    );
};

export default withValidatePageAuthentication(LoginPage);