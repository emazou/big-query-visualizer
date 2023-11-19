import { FC, useState } from "react";
import type { SavedQuery } from "@/types";
import { Badge, Button, Col, Input, Row, message } from "antd";
import { CommentOutlined, SendOutlined, UserOutlined } from "@ant-design/icons";
import { useCreateCommentMutation, useDeleteCommentMutation } from "@/features/comment/commentAPI";
import { isEmpty, map, size } from "lodash";
import { useAppSelector } from "@/app/hooks/hooks";
import CommentComponent from "./Comment";
import styles from "@/styles/ListComments.module.css";

type Props = {
    savedQuery: SavedQuery;
    refetch: () => void;
}
/**
 * @description Component to display the comments of a saved query, it also allows to add a comment
 * @param savedQuery 
 * @returns comments of a saved query
 */
const ListComments: FC<Props> = ({ savedQuery, refetch }) => {
    const [showComments, setShowComments] = useState<boolean>(false);
    const [commentValue, setCommentValue] = useState<string>('');
    const user = useAppSelector((state) => state.user.value);
    const [createComment, { isLoading }] = useCreateCommentMutation();
    const [deleteComment] = useDeleteCommentMutation();

    const handlerSubmit = (value: string ) => {
        if(user){
            createComment({ 
                text: value, 
                saved_query: savedQuery.id,
                username: user?.username 
            })
                .unwrap()
                .then((res) => { 
                    refetch();
                    
                    message.success(res.message);
                    setCommentValue('');
                })
                .catch((err) => message.error(err.message));
        }
    };
    const handlerDeleteComment = (id: number) => {
        deleteComment(id)
            .unwrap()
            .then(() => { 
                refetch();
                message.success('Comment deleted');
            })
            .catch(() => message.error('Error deleting comment'));
    };

    return (
        <div>
            <Input
                placeholder="Add a comment"
                prefix={<UserOutlined />}
                value={commentValue}
                onPressEnter={() => handlerSubmit(commentValue)}
                onChange={(e) => setCommentValue(e.target.value)}
                suffix={(
                    <Button 
                        disabled={isLoading || isEmpty(commentValue)}
                        onClick={() => handlerSubmit(commentValue)} 
                        icon={<SendOutlined />
                        } size="small" type="primary" />
                )}
            />
            <Row className={styles.listContainer}>
                <Col span={24}>
                    <Button
                        type="dashed"
                        icon={<CommentOutlined />}
                        size="small"
                        onClick={() => setShowComments(!showComments)}
                        className={styles.buttonComments}
                    >   
                        Comments
                        <Badge 
                            count={size(savedQuery.comments)} 
                            size="small" 
                            showZero 
                            color="green"
                            offset={[15, -5]} 
                        />
                    </Button>
                </Col>
                {
                    showComments && map(
                        savedQuery.comments,
                        (comment) => (
                            <CommentComponent 
                                deleteComment={handlerDeleteComment} 
                                comment={comment} 
                            />)
                    )
                }
            </Row>
        </div>
    );
};

export default ListComments;