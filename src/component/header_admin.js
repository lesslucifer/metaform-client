import { Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { AdminForms } from '../routes/path'

const { SubMenu } = Menu;

const Header = ({ children }) => {
    return (
        <>
            <Menu mode="horizontal">
                <SubMenu
                    key="Admin"
                    icon={<SettingOutlined />}
                    title="Admin"
                >
                    {AdminForms.map(f => (
                        <Menu.Item key={f.path}>
                            <Link to={`/admin/${f.path}`}>{f.desc}</Link>
                        </Menu.Item>
                    ))}
                </SubMenu>
            </Menu>
            {children}
        </>
    );
};

export default Header;
