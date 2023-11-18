import { NextPage} from "next";
import { Button, Col, Form, Row, Space } from "antd";
import styles from "@/styles/index.module.css";
import { useRouter } from "next/router";
import withValidatePageAuthentication 
    from "@/app/hooks/withValidatePageAuthentication";

const IndexPage: NextPage = () => {
    const { push } = useRouter();
    return (
        <Row>
            <Col
                span={24}
                className={styles.containerLeft} >
                <h1>Global Education Explorer</h1>
                <Row>
                    <Space>
                        <Button onClick={() => push('/login')}>
                            Login
                        </Button>
                        <Button onClick={() => push('/register')}>
                            Register
                        </Button>
                    </Space>
                </Row>
            </Col>
        </Row>
    );
};

export default withValidatePageAuthentication(IndexPage);