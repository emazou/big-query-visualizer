import { render, screen } from '@testing-library/react';
import CommentComponent from '@/components/Comment';
import userEvent from '@testing-library/user-event';
import { useAppSelector } from '@/app/hooks/hooks';
import { Comment } from '@/types';

jest.mock('@/app/hooks/hooks', () => ({
    useAppSelector: jest.fn(),
}));

describe('CommentComponent', () => {
    const mockComment: Comment = {
        id: 1,
        username: 'testUser',
        text: 'test',
        created_at: new Date(),
        saved_query: 1,
    };

    const mockDeleteComment = jest.fn();
    test('renders a comment', () => {
        useAppSelector.mockReturnValue({ username: 'testUser' });
        render(<CommentComponent comment={mockComment} deleteComment={mockDeleteComment} />);
    
        expect(screen.getByText(mockComment.text)).toBeInTheDocument();
        expect(screen.getByText(mockComment.username)).toBeInTheDocument();
    });

    test('delete button is visible for the owner of the comment', () => {
        useAppSelector.mockReturnValue({ username: 'testUser' });
        render(<CommentComponent comment={mockComment} deleteComment={mockDeleteComment} />);
    
        const deleteButton = screen.getByRole('button');
        expect(deleteButton).toBeInTheDocument();
    });

    test('delete button is not visible for non-owners', () => {
        useAppSelector.mockReturnValue({ username: 'anotherUser' });
        render(<CommentComponent comment={mockComment} deleteComment={mockDeleteComment} />);
    
        const deleteButton = screen.queryByRole('button');
        expect(deleteButton).not.toBeInTheDocument();
    });

    test('delete comment function is called upon confirmation', async () => {
        useAppSelector.mockReturnValue({ username: 'testUser' });
        render(<CommentComponent comment={mockComment} deleteComment={mockDeleteComment} />);
    
        const deleteButton = screen.getByRole('button');
        await userEvent.click(deleteButton);
        
        const confirmButton = screen.getByText('Yes');
        await userEvent.click(confirmButton);
    
        expect(mockDeleteComment).toHaveBeenCalledWith(mockComment.id);
    });
});