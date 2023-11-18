import { useAppDispatch } from "@/app/hooks/hooks";
import { useGetSavedQueriesQuery } from "@/features/savedQuery/savedQueryAPI";
import { setCurrentQuery } from "@/features/dataQuery/dataQuerySlice";
import { Button, Card, Col, Row, Spin } from "antd";
import { FC } from "react";
import { EyeOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "@/styles/ListSavedQueries.module.css";
import { map } from "lodash";
import moment from "moment";
import ListComments from "./ListComments";

const ListSavedQueries: FC = () => {
    const {data, isLoading, refetch} = useGetSavedQueriesQuery(null, { refetchOnMountOrArgChange: true})
    const dispatch = useAppDispatch();
    const { push } = useRouter();
    return (
        <Row className={styles.list}>
            {
                !isLoading ? map(data?.data, (item) => (
                    <div className={styles.card}>
                        <Card 
                            title={<Card.Meta
                                avatar={<UserOutlined />} 
                                title={item.username}
                            />}
                            bodyStyle={{height: '90px', overflowY: 'scroll'}}
                            //extra={moment(item.created_at).format('DD/MM/YYYY')}
                            extra={<Button
                                icon={<EyeOutlined />}
                                size="small"
                                onClick={() => {
                                    dispatch(setCurrentQuery(item));
                                    push("/visual-query-builder");
                                } }
                                type="primary"
                            >See query</Button>}
                            size="small"
                            style={{ marginTop: '20px'}}
                        ><Row>
                            <Col span={21}>
                                <b>{item.name}</b>
                                <p>{item.comment}</p>
                            </Col>
                            <Col>
                            {moment(item.created_at).format('DD/MM/YYYY')}
                            </Col>
                        </Row>

                        </Card>
                        <ListComments refetch={() => refetch()} savedQuery={item} />
                    </div>
                )): (
                    <Spin />
                )
            }
        </Row>
    )
};

export default ListSavedQueries;