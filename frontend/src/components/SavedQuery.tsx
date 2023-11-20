import { FC } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { setCurrentQuery } from "@/features/dataQuery/dataQuerySlice";
import { useDeleteSavedQueryMutation } from "@/features/savedQuery/savedQueryAPI";
import { SavedQuery as SavedQueryType } from "@/types";
import { DeleteFilled, EyeOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Col, Popconfirm, Row, Space, message } from "antd";
import moment from "moment";
import { useRouter } from "next/router";

type Props = {
    savedQuery: SavedQueryType;
    refetch: () => void;
}

const SavedQuery: FC<Props> = ({
    savedQuery,
    refetch,
}) => {
    const user = useAppSelector((state) => state.user.value);
    const dispatch = useAppDispatch();
    const {push} = useRouter();
    const [deleteSavedQuery] = useDeleteSavedQueryMutation();
    const deleteQuery = (id: number) => {
        deleteSavedQuery(id)
            .unwrap()
            .then(() => {
                refetch();
                message.success('Query deleted');
            })
            .catch(() => message.error('Error deleting query'));
    };
    return (
        <Card 
            title={<Card.Meta
                avatar={<UserOutlined />} 
                title={savedQuery.username}
            />}
            bodyStyle={{width: '100%' ,height: '150px'}}
            extra={(
                <Space>
                    <Button
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => {
                            dispatch(setCurrentQuery(savedQuery));
                            push("/visual-query-builder");
                        } }
                        type="primary"
                    >See query
                    </Button>
                    {
                        user && user.username === savedQuery.username && (
                            <Popconfirm 
                                title="Are you sure to delete this savedQuery?" 
                                onConfirm={() => deleteQuery(savedQuery.id)} 
                                okText="Yes" 
                                cancelText="No"
                            >
                                <Button
                                    size="small"
                                    danger 
                                    icon={<DeleteFilled />} 
                                />
                            </Popconfirm>
                        )
                    }

                </Space>
            )}
            size="small"
            style={{ marginTop: '20px'}}
        >
            <Row>
                <Col span={21}>
                    <b>{savedQuery.name}</b>
                    <p>{savedQuery.comment}</p>
                </Col>
                <Col>
                    {moment(savedQuery.created_at).format('DD/MM/YYYY')}
                </Col>
            </Row>
        </Card>
    );
};

export default SavedQuery;