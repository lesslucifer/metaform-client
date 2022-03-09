import { TYPE_OBJECT, ROLE } from "../constants/object.constants"

const AreaForm = {
    label: "Tạo vùng",
    type: TYPE_OBJECT.AREA,
    name: {
        type: "input",
        label: "Tên vùng",
        rules: {
            required: true,
            message: "Vui lòng nhập tên vùng!",
        }
    },
    code: {
        type: "input",
        label: "Mã vùng",
        rules: {
            required: true,
            message: "Vui lòng nhập mã vùng!",
        }
    },
};

const RegionForm = {
    label: "Tạo khu vực",
    type: TYPE_OBJECT.REGION,
    fetch: {
        tpar1: {
            type: TYPE_OBJECT.AREA,
            $fields: "*",
        },
    },
    name: {
        type: "input",
        label: "Tên khu vực",
        rules: {
            required: true,
            message: "Vui lòng nhập tên khu vực!",
        }
    },
    code: {
        type: "input",
        label: "Mã khu vực",
        rules: {
            required: true,
            message: "Vui lòng chọn mã khu vực!",
        }
    },
    tpar1: {
        type: "select",
        label: "Mã vùng",
        rules: {
            required: true,
            message: "Vui lòng chọn mã vùng!",
        }
    },
}

const BranchForm = {
    label: "Tạo chi nhánh",
    type: TYPE_OBJECT.BRANCH,
    fetch: {
        tpar2: {
            type: TYPE_OBJECT.REGION,
            $fields: "*",
        },
    },
    name: {
        type: "input",
        label: "Tên chi nhánh",
        rules: {
            required: true,
            message: "Vui lòng nhập tên chi nhánh!",
        }
    },
    code: {
        type: "input",
        label: "Mã chi nhánh",
        rules: {
            required: true,
            message: "Vui lòng nhập mã chi nhánh!",
        }
    },
    tpar2: {
        type: "select",
        label: "Mã khu vực",
        rules: {
            required: true,
            message: "Vui lòng chọn mã khu vực!",
        }
    },
}

const BankerForm = {
    label: "Tạo banker",
    type: TYPE_OBJECT.BANKER,
    fetch: {
        tpar1: {
            type: TYPE_OBJECT.BRANCH,
            $fields: "*",
        },
    },
    name: {
        type: "input",
        label: "Tên banker",
        rules: {
            required: true,
            message: "Vui lòng nhập tên banker!",
        }
    },
    tpar1: {
        type: "select",
        label: "Mã CN",
        rules: {
            required: true,
            message: "Vui lòng chọn mã CN!",
        }
    },
}

const SaleForm = {
    label: "Tạo sale",
    type: TYPE_OBJECT.SALE,
    fetch: {
        tpar2: {
            $fields: "*",
            type: TYPE_OBJECT.SALE,
            tpar1: "SM"
        },
    },
    name: {
        type: "input",
        label: "Tên sale",
        rules: {
            required: true,
            message: "Vui lòng nhập tên sale!",
        }
    },
    code: {
        type: "input",
        label: "Email",
        rules: {
            required: true,
            message: "Xin vui lòng một email hợp lệ",
            type: "email",
        }
    },
    tpar1: {
        type: "select",
        label: "Role",
        defaultData: ROLE,
        rules: {
            required: true,
            message: "Vui lòng chọn Role!",
        }
    },
    tpar2: {
        type: "select",
        label: "SM id",
        rules: {
            required: false,
            message: "Vui lòng chọn SM id!",
        }
    },
}

const CustomerForm = {
    label: "Tạo khách hàng",
    type: TYPE_OBJECT.CUSTOMER,
    fetch: {
        tpar1: {
            $fields: "*",
            type: TYPE_OBJECT.BANKER,
        },
    },
    name: {
        type: "input",
        label: "Tên KH",
        rules: {
            required: true,
            message: "Vui lòng nhập tên KH!",
        }
    },
    code: {
        type: "input",
        label: "Số HĐ",
        rules: {
            required: true,
            message: "Vui lòng nhập số HĐ",
        }
    },
    tpar1: {
        type: "select",
        label: "Mã banker",
        rules: {
            required: true,
            message: "Vui lòng chọn mã banker!",
        }
    },
    tpar2: {
        type: "textArea",
        label: "Ghi chú",
        rules: {
            required: false,
        }
    },
    ipar1: {
        type: "inputNumber",
        label: "FYP",
        rules: {
            required: false,
        }
    },
}

const mapTypeToForm = {
    [TYPE_OBJECT.AREA]: AreaForm,
    [TYPE_OBJECT.REGION]: RegionForm,
    [TYPE_OBJECT.BRANCH]: BranchForm,
    [TYPE_OBJECT.BANKER]: BankerForm,
    [TYPE_OBJECT.SALE]: SaleForm,
    [TYPE_OBJECT.CUSTOMER]: CustomerForm
};

export function getFormVariables(type) {
    return mapTypeToForm[type] || {};
}
