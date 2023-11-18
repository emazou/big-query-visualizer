import { Affix, Col, Row } from "antd";
import { NextPage } from "next";
import Link from 'next/link';
import { useAppSelector } from "@/app/hooks/hooks";
import styles from '@/styles/auth.module.css';
import { useEffect } from "react";
import { useRouter } from "next/router";
import withValidatePageAuthentication 
    from "@/app/hooks/withValidatePageAuthentication";
import FormRegister from "@/components/Forms/FormRegister";

const RegisterPage: NextPage = () => {
    const user = useAppSelector((state) => state.user.value);
    const { push } = useRouter();
    useEffect(() => {
        if(user){
            push('/visual-query-builder');
        }
    });

    return (
        <>
        <Row className={styles.containerAll}>
            <Col
                xs={0}
                sm={0}
                md={0}
                lg={12}
                xl={12}
                xxl={12}
                className={styles.containerImage} />
            <Col
                xs={24}
                sm={24}
                md={24}
                lg={12}
                xl={12}
                xxl={12}
                className={styles.containerForm}>
                <h2>REGISTER</h2>
                <FormRegister />
            </Col>
        </Row>
        </>
    );
};

export default withValidatePageAuthentication(RegisterPage);