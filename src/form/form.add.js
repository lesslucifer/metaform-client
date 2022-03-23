import { Card, Form, Button } from "antd";
import * as moment from "moment";
import { useLocation, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import queryString from "query-string";
import { getFormVariables } from "./form.define";
import { TYPE_FORM } from "../constants/object.constants";
import getFormItem from "../component/getFormItem";
import { getData, updateData } from "../services/data.service";
import "./style.css";

const AddObject = () => {
    const [selectVal, setSelectVal] = useState({});
    const [form] = Form.useForm();

    let location = useLocation();
    const searchLocation = queryString.parse(location.search);
    const currentType = searchLocation?.type;

    const formConfig = getFormVariables(currentType);

    const onFinish = async (values) => {
        const submits = [...(formConfig.submits ?? [])]
        if (formConfig.submit) {
            submits.push(formConfig.submit)
        }

        await Promise.all(submits.map(async submit => {
            console.log(values)
            const body = submit.body(values, {
                config: formConfig,
                type: currentType,
                selects: selectVal
            })
            await updateData(submit.endpoint, { type: currentType, ...body });
        }))

        form.resetFields();
    };

    const reloadSelectData = async (field, config, params) => {
        if (!config) return
        const data = await getData(config.endpoint, {
            ...config.params,
            ...(config.valueMapping && Object.keys(config.valueMapping).reduce((m, k) => {
                m[k] = params[config.valueMapping[k]]
                return m
            }, {}))
        })
        setSelectVal(prev => ({ ...prev, [field]: data }))
        if (!data.hasOwnProperty(form.getFieldValue(field))) {
            clearSelectField(field)
        }
        return data
    }

    const onFieldChanged = (field) => async (value) => {
        formConfig.fields.forEach(fd => {
            if (fd.fetch?.on === field) {
                reloadSelectData(fd.field, fd.fetch, {
                    [field]: value
                })
            }
        })
    }

    const clearSelectField = (field) => {
        form.setFieldsValue({
            [field]: null
        })
        formConfig.fields.forEach(fd => {
            if (fd.fetch?.on === field) {
                setSelectVal(prev => ({ ...prev, [fd.field]: [] }))
                clearSelectField(fd.field)
            }
        })
    }

    useEffect(() => {
        form.resetFields();
        formConfig.fields.forEach(field => {
            if (field.data) {
                setSelectVal(prev => ({ ...prev, [field.field]: field.data }))
            }
            if (field.fetch?.on === '$useEffect') {
                reloadSelectData(field.field, field.fetch, null)
            }
        })
    }, [formConfig]);

    const initialValues = {
        type: TYPE_FORM.AREA,
        name: "",
        code: "",
        tspar: moment(),
        tspar1: moment(),
        tspar2: moment(),
        tspar3: moment(),
        tpar1: "",
        tpar2: "",
        tpar3: "",
        tpar4: "",
        tpar5: "",
        tpar6: "",
        tpar7: "",
        tpar8: "",
        tpar9: "",
        ltpar1: "",
        ltpar2: "",
        ltpar3: "",
        ipar1: 0,
        ipar2: 0,
        ipar3: 0,
        ipar4: 0,
        ipar5: 0,
        bipar: 0,
        bipar1: 0,
        bipar2: 0,
    };

    if (!formConfig) {
        return <Redirect to="/form?type=aiss.1.area" />;
    }

    return (
        <div className="container">
            <Card title={formConfig && formConfig.label}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    autoComplete="off"
                    initialValues={initialValues}
                    onFinish={onFinish}
                >
                    {formConfig &&
                        formConfig.fields.map((field, index) => {
                            if (!field.type) return null;
                            const { label, type, rules } = field;

                            const props = {
                                label,
                                name: field.field,
                                type,
                                rules,
                                key: index,
                                onChange: onFieldChanged(field.field),
                                data: selectVal[field.field],
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
