import { Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

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
                    <Menu.Item key="setting:area">
                        <Link to="/form?type=aiss.1.area">Tạo Vùng</Link>
                    </Menu.Item>
                    <Menu.Item key="setting:region">
                        <Link to="/form?type=aiss.1.region">Tạo Khu vực</Link>
                    </Menu.Item>
                    <Menu.Item key="setting:branch">
                        <Link to="/form?type=aiss.1.branch">Tạo Chi nhánh</Link>
                    </Menu.Item>
                    <Menu.Item key="setting:banker">
                        <Link to="/form?type=aiss.1.banker">Tạo Banker</Link>
                    </Menu.Item>
                    <Menu.Item key="setting:sale">
                        <Link to="/form?type=aiss.1.sale">Tạo Sale</Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    key="FormSale"
                    icon={<SettingOutlined />}
                    title="Form Sale"
                >
                    <Menu.Item key="setting:refer">
                        <Link to="/form?type=aiss.1.refer">Tạo Refer</Link>
                    </Menu.Item>
                    <Menu.Item key="setting:sub">
                        <Link to="/form?type=aiss.1.sub">Tạo Sub</Link>
                    </Menu.Item>
                    <Menu.Item key="setting:issue">
                        <Link to="/form?type=aiss.1.iss">Phát hành</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
            {children}
        </>
    );
};

export default Header;
