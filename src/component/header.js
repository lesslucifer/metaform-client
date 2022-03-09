import { Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const Header = ({ children }) => {
    return (
        <>
            <Menu mode="horizontal">
                <SubMenu
                    key="SubMenu"
                    icon={<SettingOutlined />}
                    title="Tạo mới Object"
                >
                    <Menu.Item key="setting:1">
                        <Link to="/object?type=aiss.1.area">Tạo Vùng</Link>
                    </Menu.Item>
                    <Menu.Item key="setting:2">
                        <Link to="/object?type=aiss.1.region">Tạo Khu vực</Link>
                    </Menu.Item>
                    <Menu.Item key="setting:3">
                        <Link to="/object?type=aiss.1.branch">
                            Tạo Chi nhánh
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="setting:4">
                        <Link to="/object?type=aiss.1.banker">Tạo Banker</Link>
                    </Menu.Item>
                    <Menu.Item key="setting:5">
                        <Link to="/object?type=aiss.1.customer">Tạo Customer</Link>
                    </Menu.Item>
                    <Menu.Item key="setting:5">
                        <Link to="/object?type=aiss.1.sale">Tạo Sale</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
            {children}
        </>
    );
};

export default Header;
