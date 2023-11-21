import {  Menu, Layout, Space, Button } from "antd";
import { FC } from "react";
import styles from "@/styles/Layout.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { LineChartOutlined, LogoutOutlined, SaveOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/app/hooks/hooks";
import { removeUser } from "@/features/user/userSlice";

/**
 * @description Component to display the layout of the application, 
 * it contains a header with the navigation menu and the children of the component
 * @param children 
 * @returns children wrapped in a layout with a header
 */
const LayoutComponent: FC<{children: JSX.Element}> = ({ children }) => {
    const dispatch = useAppDispatch();
    const { pathname } = useRouter();
    const items = [{
        key: '/visual-query-builder',
        label: <Link href='/visual-query-builder'> Visual Query Builder</Link>,
        icon: <LineChartOutlined />
    },
    {
        key: '/saved-queries',
        label: <Link href='/saved-queries'>Saved Queries</Link>,
        icon: <SaveOutlined />
    },
    {
        label: (
            <Button 
                onClick={() => dispatch(removeUser())} 
                icon={<LogoutOutlined />} 
                type="dashed" 
            >
            Logout
            </Button>),
        key: '/logout',
    }];
    return (
        <Layout>
            <Menu
                defaultSelectedKeys={['/visual-query-builder']}
                selectedKeys={[pathname]}
                className={styles.header}
                theme="dark"
                mode="horizontal"
                items={items}
            />
            <Space wrap size={15} className={styles.container}>
                {children}
            </Space>
        </Layout>
    );
};
export default LayoutComponent;