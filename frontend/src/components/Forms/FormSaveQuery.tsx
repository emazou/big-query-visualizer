import { useAppSelector } from "@/app/hooks/hooks";
import { useSaveQueryMutation } from "@/features/savedQuery/savedQueryAPI";
import { SavedQuery } from "@/types";
import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input, Row, message } from "antd";
import { FC } from "react";

const {Item} = Form;
const { TextArea } = Input;
type Props = {
    query: Pick<SavedQuery, 'country_code' | 'indicator_code' | 'end_year' | 'start_year'>;
    setOpen: () => void;
}

const FormSaveQuery: FC<Props> = ({ query, setOpen }) => {
    const user = useAppSelector((state) => state.user.value);
    const [saveQuery, {isLoading}] = useSaveQueryMutation();
    const onFinish = (values: SavedQuery) => {
        saveQuery({
            ...values,
            ...query,
            username: user?.username,
        })
            .unwrap()
            .then((res) => { 
                message.success(res.message);
                setOpen();
            })
            .catch((err) => message.error(err.message));
    };
    return (
        <Form
            onFinish={onFinish}
            layout="vertical"
        >
            <Item required name="name" label="Name">
                <Input
                    required
                    name="name"
                    title="Name"
                    placeholder="Enter a name for your query"
                />
            </Item>
            <Item required name="comment" label="Comment" >
                <TextArea
                    required
                    count={{
                        max: 120,
                    }}
                    name="comment"
                    placeholder="Enter a comment for your query"
                />
            </Item>
            <Row justify="end">
                <Button 
                    loading={isLoading}
                    type="primary"
                    icon={<SendOutlined />}
                    htmlType="submit">Send</Button>
            </Row>
        </Form>
    );
    
};
export default FormSaveQuery;