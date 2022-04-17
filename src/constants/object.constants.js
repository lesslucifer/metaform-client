export const TYPE_FORM = {
    AREA: "aiss.1.area",
    REGION: "aiss.1.region",
    BRANCH: "aiss.1.branch",
    BANKER: "aiss.1.banker",
    SALE: "aiss.1.sale",
    CUSTOMER: "aiss.1.customer",
    REFER: "aiss.1.refer",
    SUB: "aiss.1.sub",
    ISSUE: "aiss.1.iss",
};

export const ROLE = [
    {
        code: "SM",
        name: "SM",
    },
    {
        code: "SALE",
        name: "IS / EIS",
    },
];

export const CUSTOMER_GROUP = [{
    id: 1, name: 'Nhóm 1 - KH từ chối khi IS refer'
}, { id: 2, name: 'Nhóm 2 - Follow KH nhưng KH từ chối' },
{ id: 3, name: 'Nhóm 3 - KH cần theo và chăm sóc' },
{ id: 4, name: 'Nhóm 4 - KH đồng ý sub hợp đồng' },
{ id: 5, name: 'Nhóm 5 - KH dã sub hợp đồng và đóng phí' }]