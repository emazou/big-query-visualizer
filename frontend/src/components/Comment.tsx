import { FC } from 'react';
import { Comment } from '@/types';
import { Avatar, Button, Col, Popconfirm, Row } from 'antd';
import styles from '@/styles/Comment.module.css';
import { first } from 'lodash';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/app/hooks/hooks';
import moment from 'moment';

type Props = {
    comment: Comment;
    deleteComment: (id: number) => void;
}

const CommentComponent: FC<Props> = ({ comment, deleteComment }) => {
    const user = useAppSelector((state) => state.user.value);
    return (
        <div className={styles.commentContainer}>
            <div className={styles.infoContainer}>
            <Avatar size="small">{first(comment.username)}</Avatar>
            <div>
                <b>{comment.username}</b>
                <p>{comment.text}</p>
            </div>
            </div>
            <div>
            {
                user && user.username === comment.username && (
                    <Popconfirm 
                        title="Are you sure to delete this comment?" 
                        onConfirm={() => deleteComment(comment.id)} 
                        okText="Yes" 
                        cancelText="No"
                    >
                        <Button 
                            icon={<DeleteOutlined />} 
                            size="small" 
                            type="text"
                        />
                    </Popconfirm>
                )
            }
            </div>
        </div>
    )
}

export default CommentComponent;