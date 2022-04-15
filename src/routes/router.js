import HeaderAdmin from "../component/header_admin";
import HeaderSale from "../component/header_sale";
import FormAdd from '../form/form.add';
import { Redirect } from "react-router-dom";
import App from '../App'
import * as PATH from './path';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    ...PATH.SaleForms.map(f => ({
        path: `${PATH.PATH_FORM}/${f.path}`,
        component: FormAdd,
        header: HeaderSale,
        props: {
            type: f.type
        },
        exact: true,
    })),
    ...PATH.AdminForms.map(f => ({
        path: `${PATH.PATH_ADMIN}/${f.path}`,
        component: FormAdd,
        header: HeaderAdmin,
        props: {
            type: f.type
        },
        exact: true,
    })),
    {
        path: PATH.PATH_ADMIN,
        component: Redirect,
        props: {
            to: `${PATH.PATH_ADMIN}/${PATH.AdminForms[0].path}`
        }
    },
    {
        path: PATH.PATH_DEFAULT,
        component: App
    }
];
