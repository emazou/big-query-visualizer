import { FC } from 'react';
import { Comment } from '@/types';
import { Avatar, Button, Popconfirm } from 'antd';
import styles from '@/styles/Comment.module.css';
import { first } from 'lodash';
import { DeleteFilled } from '@ant-design/icons';
import { useAppSelector } from '@/app/hooks/hooks';

type Props = {
    comment: Comment;
    deleteComment: (id: number) => void;
}
/**
 * @description Component to display a comment of a saved query,
 * if the user is the owner of the comment, it will be able to delete it
 * @param comment comment to be displayed
 * @returns comment
 */
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
                                danger
                                icon={<DeleteFilled />} 
                                size="small"
                            />
                        </Popconfirm>
                    )
                }
            </div>
        </div>
    );
};

export default CommentComponent;