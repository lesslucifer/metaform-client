import { Form, Input, Select, InputNumber } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const getFormItem = (props) => {
    const selectItem = ({ data }) => {
        if (props.type === "inputNumber") {
            return <InputNumber defaultValue={0} style={{ width: '100%' }}/>;
        }
        
        if (props.type === "textArea") {
            return  <TextArea showCount maxLength={100}/>
        }

        return (
            <Select
                filterOption={(input, option) =>
                    option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                }
                showSearch
            >
                {data &&
                    data.map((val, index) => (
                        <Option value={val.code || val.id} key={index}>
                            {val.name}
                        </Option>
                    ))}
            </Select>
        );
    };

    return (
        <Form.Item
            label={props.label}
            name={props.name}
            rules={[
                props.rules
                    ? props.rules
                    : {
                          required: true,
                          message: `Không được để trống!`,
                      },
            ]}
            key={props.key}
        >
            {props.type === "input" ? <Input /> : selectItem(props)}
        </Form.Item>
    );
};

export default getFormItem;
