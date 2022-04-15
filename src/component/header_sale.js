import { Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SaleForms } from '../routes/path'

const { SubMenu } = Menu;

const Header = ({ children }) => {
    return (
        <>
            <Menu mode="horizontal">
                <SubMenu
                    key="FormSale"
                    icon={<SettingOutlined />}
                    title="Biểu mẫu"
                >
                    {SaleForms.map(f => (
                        <Menu.Item key={f.path}>
                            <Link to={`/form/${f.path}`}>{f.desc}</Link>
                        </Menu.Item>
                    ))}
                </SubMenu>
            </Menu>
            {children}
        </>
    );
};

export default Header;
