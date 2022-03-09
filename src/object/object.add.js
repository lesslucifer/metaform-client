import { Card, Form, Button } from "antd";
import * as moment from "moment";
import { useLocation, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { getFormVariables } from "./form.define";
import { TYPE_OBJECT } from "../constants/object.constants";
import getFormItem from "../component/getFormItem";
import { getObject, updateObject } from "../services/object.service";
import "./style.css";

const AddObject = () => {
    const [selectVal, setSelectVal] = useState({});
    const [form] = Form.useForm();

    let location = useLocation();
    const searchLocation = queryString.parse(location.search);
    const currentType = searchLocation?.type;

    const formVariables = getFormVariables(currentType);

    const onFinish = async (values) => {
        let currentTp;
        switch (currentType) {
            case TYPE_OBJECT.BRANCH:
                currentTp = selectVal["tpar2"]?.find(
                    (val) => val.code === values["tpar2"]
                );
                values = { ...values, tpar1: currentTp.tpar1 };
                break;
            case TYPE_OBJECT.BANKER:
                currentTp = selectVal["tpar1"]?.find(
                    (val) => val.code === values["tpar1"]
                );
                values = {
                    ...values,
                    tpar2: currentTp.tpar2,
                    tpar3: currentTp.tpar1,
                };
                break;
            default:
                break;
        }

        await updateObject({ ...values, type: currentType });
        form.resetFields();
    };

    const fetchDataSelect = async (values) => {
        const response = await Promise.all(
            Object.keys(values).map((val) => getObject(values[val]))
        );
        let data = {};
        Object.keys(values).forEach((val, index) => {
            data = { ...data, [val]: response[index] };
        });

        setSelectVal({ ...selectVal, ...data });
    };

    useEffect(() => {
        form.resetFields();
        if (formVariables.fetch && Object.keys(formVariables.fetch) !== 0) {
            fetchDataSelect(formVariables.fetch);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formVariables.fetch]);

    const initialValues = {
        type: TYPE_OBJECT.AREA,
        name: "",
        code: "",
        tspar1: moment(),
        tpar1: "",
        tpar2: "",
        ipar1: 0,
        ipar2: 0,
        ipar3: 0,
    };

    if (!Object.values(TYPE_OBJECT).includes(currentType)) {
        return <Redirect to="/object?type=aiss.1.area" />;
    }
    return (
        <div className="container">
            <Card title={formVariables && formVariables.label}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    autoComplete="off"
                    initialValues={initialValues}
                    onFinish={onFinish}
                >
                    {formVariables &&
                        Object.keys(formVariables).map((value, index) => {
                            if (!formVariables[value].type) return null;
                            const { label, type, rules, defaultData } =
                                formVariables[value];

                            const props = {
                                label,
                                name: value,
                                type,
                                rules,
                                key: index,
                                data: defaultData
                                    ? defaultData
                                    : selectVal[value],
                            };
                            return getFormItem(props);
                        })}
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AddObject;
