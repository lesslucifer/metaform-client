import { TYPE_FORM, ROLE, CUSTOMER_GROUP } from "../constants/object.constants"
import * as _ from 'lodash'
import * as moment from 'moment'

const valueFields = (...fields) => values => _.pick(values, ...fields)
const getTime = (values, field) => (_.get(values, field) || moment()).utc().format('YYYY-MM-DD HH:mm:ss')

const AreaForm = {
    label: "Tạo vùng",
    endpoint: 'objects',
    type: TYPE_FORM.AREA,
    fields: [
        {
            field: 'name',
            type: "input",
            label: "Tên vùng",
            rules: {
                required: true,
                message: "Vui lòng nhập tên vùng!",
            }
        }, {
            field: 'code',
            type: "input",
            label: "Mã vùng",
            rules: {
                required: true,
                message: "Vui lòng nhập mã vùng!",
            }
        }
    ],
    submit: {
        endpoint: 'objects',
        body: valueFields('name', 'code')
    }
};

const RegionForm = {
    label: "Tạo khu vực",
    endpoint: 'objects',
    type: TYPE_FORM.REGION,
    fields: [
        {
            field: 'name',
            type: "input",
            label: "Tên khu vực",
            rules: {
                required: true,
                message: "Vui lòng nhập tên khu vực!",
            }
        },
        {
            field: 'code',
            type: "input",
            label: "Mã khu vực",
            rules: {
                required: true,
                message: "Vui lòng chọn mã khu vực!",
            }
        },
        {
            field: 'tpar1',
            type: "select",
            label: "Mã vùng",
            selIdField: 'code',
            rules: {
                required: true,
                message: "Vui lòng chọn mã vùng!",
            },
            fetch: {
                endpoint: 'objects',
                on: '$useEffect',
                params: {
                    type: TYPE_FORM.AREA,
                    $fields: "*"
                }
            },
        },
    ],
    submit: {
        endpoint: 'objects',
        body: valueFields('name', 'code', 'tpar1')
    }
}

const BranchForm = {
    label: "Tạo chi nhánh",
    endpoint: 'objects',
    type: TYPE_FORM.BRANCH,
    fields: [
        {
            field: 'name',
            type: "input",
            label: "Tên chi nhánh",
            rules: {
                required: true,
                message: "Vui lòng nhập tên chi nhánh!",
            }
        },
        {
            field: 'code',
            type: "input",
            label: "Mã chi nhánh",
            rules: {
                required: true,
                message: "Vui lòng nhập mã chi nhánh!",
            }
        },
        {
            field: 'tpar2',
            type: "select",
            label: "Mã khu vực",
            selIdField: 'code',
            rules: {
                required: true,
                message: "Vui lòng chọn mã khu vực!",
            },
            fetch: {
                endpoint: 'objects',
                on: '$useEffect',
                params: {
                    type: TYPE_FORM.REGION,
                    $fields: "*",
                }
            },
        },
    ],
    submit: {
        endpoint: 'objects',
        body: (values, meta) => ({
            ..._.pick(values, 'name', 'code', 'tpar2'),
            tpar1: meta.selects?.tpar2?.find?.(opt => opt.id === values.tpar2)?.tpar1
        })
    }
}

const BankerForm = {
    label: "Tạo banker",
    endpoint: 'objects',
    type: TYPE_FORM.BANKER,
    fields: [
        {
            field: 'name',
            type: "input",
            label: "Tên banker",
            rules: {
                required: true,
                message: "Vui lòng nhập tên banker!",
            }
        },
        {
            field: 'tpar3',
            type: "select",
            label: "Mã CN",
            selIdField: 'code',
            rules: {
                required: true,
                message: "Vui lòng chọn mã CN!",
            },
            fetch: {
                endpoint: 'objects',
                on: '$useEffect',
                params: {
                    type: TYPE_FORM.BRANCH,
                    $fields: "*",
                }
            },
        },
        {
            field: 'ipar1',
            type: "select",
            label: "Phân khúc",
            rules: {
                required: true,
                message: "Vui lòng chọn mã phân khúc!",
            },
            data: [
                { id: 1, name: 'PB - Chuyên viên tín dụng' },
                { id: 2, name: 'CS - Dịch vụ khách hàng' },
                { id: 3, name: 'RM - Chuyên viên KH ưu tiên' },
            ]
        },
    ],
    submit: {
        endpoint: 'objects',
        body: (values, meta) => ({
            ..._.pick(values, 'name', 'tpar3', 'ipar1'),
            tpar1: meta.selects?.tpar3?.find?.(opt => opt.id === values.tpar3)?.tpar1,
            tpar2: meta.selects?.tpar3?.find?.(opt => opt.id === values.tpar3)?.tpar2
        })
    }
}

const SaleForm = {
    label: "Tạo SM - IOIS",
    endpoint: 'objects',
    type: TYPE_FORM.SALE,
    fields: [
        {
            field: 'name',
            type: "input",
            label: "Họ tên",
            rules: {
                required: true,
                message: "Vui lòng nhập họ tên!",
            }
        },
        {
            field: 'code',
            type: "input",
            label: "Email",
            rules: {
                required: true,
                message: "Xin vui lòng một email hợp lệ",
                type: "email",
            }
        },
        {
            field: 'tpar1',
            type: "select",
            label: "Role",
            data: ROLE,
            rules: {
                required: true,
                message: "Vui lòng chọn Role!",
            }
        },
        {
            field: 'tpar2',
            type: "select",
            label: "SM",
            rules: {
                required: false,
                message: "Vui lòng chọn SM!",
            },
            fetch: {
                endpoint: 'objects',
                on: '$useEffect',
                params: {
                    $fields: "*",
                    type: TYPE_FORM.SALE,
                    tpar1: "SM"
                }
            }
        }
    ],
    validate: (values) => {
        if (values.tpar1 == 1 && !values.tpar2) throw new Error('Phải chọn SM cho IOIS')
        if (values.tpar1 == 2 && values.tpar2) throw new Error('Không thể chọn SM cho SM')
    },
    submit: {
        endpoint: 'objects',
        body: valueFields('name', 'code', 'tpar1', 'tpar2')
    }
}

const ReferForm = {
    label: "Refer",
    endpoint: 'data',
    type: TYPE_FORM.REFER,
    fields: [
        {
            field: 'tspar1',
            type: "date",
            label: "Ngày báo cáo",
            rules: {
                required: true,
                message: "Chọn ngày báo cáo!",
            }
        },
        {
            field: 'tpar1',
            type: "select",
            label: "IOIS",
            rules: {
                required: true,
                message: "Chọn tài khoản!",
            },
            fetch: {
                on: '$useEffect',
                endpoint: 'objects',
                params: {
                    $fields: "*",
                    type: TYPE_FORM.SALE,
                },
                postProcess: (data) => data.forEach(d => d.name = `${d.name} (${d.code})`)
            }
        },
        {
            field: 'tpar6',
            type: "select",
            label: "Chi nhánh",
            rules: {
                required: true,
                message: "Vui lòng chọn chi nhánh!",
            },
            fetch: {
                on: '$useEffect',
                endpoint: 'objects',
                params: {
                    $fields: "*",
                    type: TYPE_FORM.BRANCH,
                }
            }
        },
        {
            field: 'tpar3',
            type: "select",
            label: "Banker",
            rules: {
                required: true,
                message: "Vui lòng chọn Banker!",
            },
            fetch: {
                on: 'tpar6',
                endpoint: 'objects',
                params: {
                    $fields: "*",
                    type: TYPE_FORM.BANKER,
                },
                valueMapping: {
                    tpar3: 'tpar6'
                }
            }
        },
        {
            field: 'name',
            type: "input",
            label: "Tên khách hàng",
            rules: {
                required: true,
                message: "Vui lòng chọn khách hàng",
            }
        },
        {
            field: 'tpar8',
            type: "input",
            label: "SĐT khách hàng",
            rules: {
                required: false
            }
        },
        {
            field: 'tpar9',
            type: "input",
            label: "Email khách hàng",
            rules: {
                required: false,
                type: "email"
            }
        },
        {
            field: 'tpar7',
            type: "textArea",
            label: "Tình trạng KH",
            rules: {
                required: false,
            }
        },
        {
            field: 'ipar1',
            type: "select",
            label: "Nhóm",
            data: CUSTOMER_GROUP,
            rules: {
                required: true,
                message: "Vui lòng chọn nhóm refer",
            },
        },
        {
            field: 'ipar3',
            type: "inputNumber",
            label: "FYP Dự kiến",
            rules: {
                required: true,
            }
        },
    ],
    submits: [
        {
            endpoint: 'objects',
            body: (values, meta) => ({
                name: values.name,
                tpar1: values.tpar3,
                tpar2: values.tpar1,
                tpar3: values.tpar7,
                ipar1: values.ipar1,
                ipar2: values.ipar1 >= 3 ? 1 : 0,
                ipar3: values.ipar2,
                type: 'aiss.1.customer',
            })
        },
        {
            endpoint: 'data',
            body: (values, meta) => ({
                ..._.pick(values, 'name', 'tpar1', 'tpar3', 'tpar7', 'tpar8', 'tpar9', 'ipar1', 'ipar2'),
                tpar2: meta.selects?.tpar1?.find?.(opt => opt.id === values.tpar1)?.tpar2,
                tpar4: meta.selects?.tpar3?.find?.(opt => opt.id === values.tpar3)?.tpar1,
                tpar5: meta.selects?.tpar3?.find?.(opt => opt.id === values.tpar3)?.tpar2,
                tpar6: meta.selects?.tpar3?.find?.(opt => opt.id === values.tpar3)?.tpar3,
                ipar3: meta.selects?.tpar3?.find?.(opt => opt.id === values.tpar3)?.ipar1,
                tspar1: getTime(values, 'tspar1')
            })
        }
    ]
}

const SubForm = {
    label: "Sub",
    endpoint: 'data',
    type: TYPE_FORM.SUB,
    fields: [
        {
            field: 'tspar1',
            type: "date",
            label: "Ngày báo cáo",
            rules: {
                required: true,
                message: "Chọn ngày báo cáo!",
            }
        },
        {
            field: 'tpar1',
            type: "select",
            label: "IOIS",
            rules: {
                required: true,
                message: "Chọn tài khoản!",
            },
            fetch: {
                on: '$useEffect',
                endpoint: 'objects',
                params: {
                    $fields: "*",
                    type: TYPE_FORM.SALE,
                },
                postProcess: (data) => data.forEach(d => d.name = `${d.name} (${d.code})`)
            }
        },
        {
            field: 'tpar6',
            type: "select",
            label: "Chi nhánh",
            rules: {
                required: true,
                message: "Vui lòng chọn chi nhánh!",
            },
            fetch: {
                on: '$useEffect',
                endpoint: 'objects',
                params: {
                    $fields: "*",
                    type: TYPE_FORM.BRANCH,
                }
            }
        },
        {
            field: 'tpar3',
            type: "select",
            label: "Banker",
            rules: {
                required: true,
                message: "Vui lòng chọn Banker!",
            },
            fetch: {
                on: 'tpar6',
                endpoint: 'objects',
                params: {
                    $fields: "*",
                    type: TYPE_FORM.BANKER,
                },
                valueMapping: {
                    tpar3: 'tpar6'
                }
            }
        },
        {
            field: 'code',
            type: "select",
            label: "Khách hàng",
            rules: {
                required: true,
                message: "Vui lòng chọn Khách hàng!",
            },
            fetch: {
                on: 'tpar3',
                endpoint: 'objects',
                params: {
                    $fields: "*",
                    type: TYPE_FORM.CUSTOMER,
                    ipar2: 1
                },
                valueMapping: {
                    tpar1: 'tpar3'
                }
            }
        },
        {
            field: 'tpar7',
            type: "textArea",
            label: "Tình trạng KH",
            rules: {
                required: false,
            }
        },
        {
            field: 'ipar1',
            type: "select",
            data: [{ id: 0, name: 'Pending' }, { id: -1, name: 'Phát hành' }],
            label: "Tình trạng",
            rules: {
                required: true,
            }
        },
        {
            field: 'ipar2',
            type: "inputNumber",
            label: "FYP",
            rules: {
                required: true,
            }
        },
    ],
    submits: [
        {
            endpoint: 'objects',
            body: (values, meta) => ({
                id: values.code,
                tpar3: values.tpar3,
                ipar1: values.ipar1,
                ipar2: 0,
                ipar3: values.ipar3,
                type: 'aiss.1.customer'
            })
        },
        {
            endpoint: 'data',
            body: (values, meta) => ({
                ..._.pick(values, 'name', 'code', 'tpar1', 'tpar3', 'tpar7', 'ipar1', 'ipar2'),
                tpar2: meta.selects?.tpar1?.find?.(opt => opt.id === values.tpar1)?.tpar2,
                tpar4: meta.selects?.tpar3?.find?.(opt => opt.id === values.tpar3)?.tpar1,
                tpar5: meta.selects?.tpar3?.find?.(opt => opt.id === values.tpar3)?.tpar2,
                tpar6: meta.selects?.tpar3?.find?.(opt => opt.id === values.tpar3)?.tpar3,
                ipar3: meta.selects?.tpar3?.find?.(opt => opt.id === values.tpar3)?.ipar1,
                tspar1: getTime(values, 'tspar1')
            })
        }
    ]
}

const IssueStatusForm = {
    label: "Phát hành",
    endpoint: 'data',
    type: TYPE_FORM.ISSUE,
    fields: [
        {
            field: 'tspar1',
            type: "date",
            label: "Ngày báo cáo",
            rules: {
                required: true,
                message: "Chọn ngày báo cáo!",
            }
        },
        {
            field: 'tpar1',
            type: "select",
            label: "IOIS",
            rules: {
                required: true,
                message: "Chọn tài khoản!",
            },
            fetch: {
                on: '$useEffect',
                endpoint: 'objects',
                params: {
                    $fields: "*",
                    type: TYPE_FORM.SALE,
                }
            },
            postProcess: (data) => data.forEach(d => d.name = `${d.name} (${d.code})`)
        },
        {
            field: 'tpar6',
            type: "select",
            label: "Chi nhánh",
            rules: {
                required: true,
                message: "Vui lòng chọn chi nhánh!",
            },
            fetch: {
                on: '$useEffect',
                endpoint: 'objects',
                params: {
                    $fields: "*",
                    type: TYPE_FORM.BRANCH,
                }
            }
        },
        {
            field: 'tpar3',
            type: "select",
            label: "Banker",
            rules: {
                required: true,
                message: "Vui lòng chọn Banker!",
            },
            fetch: {
                on: 'tpar6',
                endpoint: 'objects',
                params: {
                    $fields: "*",
                    type: TYPE_FORM.BANKER,
                },
                valueMapping: {
                    tpar3: 'tpar6'
                }
            }
        },
        {
            field: 'code',
            type: "select",
            label: "Khách hàng",
            rules: {
                required: true,
                message: "Vui lòng chọn Khách hàng!",
            },
            fetch: {
                on: 'tpar3',
                endpoint: 'objects',
                params: {
                    $fields: "*",
                    type: TYPE_FORM.CUSTOMER,
                    ipar1: 0
                },
                valueMapping: {
                    tpar1: 'tpar3'
                }
            }
        }
    ],
    submits: [
        {
            endpoint: 'objects',
            body: (values, meta) => ({
                id: values.code,
                ipar1: -1,
                type: 'aiss.1.customer'
            })
        },
        {
            endpoint: 'data',
            body: (values, meta) => ({
                ..._.pick(values, 'name', 'code', 'tpar1', 'tpar3', 'tpar3', 'ipar2'),
                tpar2: meta.selects?.tpar1?.find?.(opt => opt.id === values.tpar1)?.tpar2,
                tpar4: meta.selects?.tpar3?.find?.(opt => opt.id === values.tpar3)?.tpar1,
                tpar5: meta.selects?.tpar3?.find?.(opt => opt.id === values.tpar3)?.tpar2,
                tpar6: meta.selects?.tpar3?.find?.(opt => opt.id === values.tpar3)?.tpar3,
                ipar2: meta.selects?.code?.find?.(opt => opt.id === values.code)?.ipar3,
                ipar3: meta.selects?.tpar3?.find?.(opt => opt.id === values.tpar3)?.ipar1,
                tspar1: getTime(values, 'tspar1')
            })
        }
    ],
    submitButton: "Cập nhật"
}

const mapTypeToForm = {
    [TYPE_FORM.AREA]: AreaForm,
    [TYPE_FORM.REGION]: RegionForm,
    [TYPE_FORM.BRANCH]: BranchForm,
    [TYPE_FORM.BANKER]: BankerForm,
    [TYPE_FORM.SALE]: SaleForm,
    [TYPE_FORM.CUSTOMER]: SubForm,
    [TYPE_FORM.REFER]: ReferForm,
    [TYPE_FORM.SUB]: SubForm,
    [TYPE_FORM.ISSUE]: IssueStatusForm
};

export function getFormVariables(type) {
    return mapTypeToForm[type];
}
