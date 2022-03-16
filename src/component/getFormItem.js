import { Form, Input, Select, InputNumber, DatePicker } from "antd";

const { Option } = Select;
const { TextArea } = Input;

const getFormItem = (props) => {
    const selectItem = ({ data }) => {
        if (props.type === "inputNumber") {
            return <InputNumber style={{ width: '100%' }}/>;
        }
        
        if (props.type === "textArea") {
            return  <TextArea showCount maxLength={100}/>
        }
        
        if (props.type === "date") {
            return  <DatePicker />
        }

        const propsField = props.selIdField || 'id'
        const propsDisplayField = props.selIdField || 'name'
        return (
            <Select
                filterOption={(input, option) =>
                    option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                }
                onChange={props.onChange}
                showSearch
                allowClear
            >
                {data &&
                    data.map((val, index) => (
                        <Option value={val[propsField]} key={index}>
                            {val[propsDisplayField]}
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
