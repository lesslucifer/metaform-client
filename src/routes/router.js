import * as PATH from './path';
import FormAdd from '../form/form.add';
import App from '../App'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        path: PATH.PATH_DEFAULT,
        component: App,
        exact: true,
    },
    {
        path: PATH.PATH_FORM,
        component: FormAdd,
        exact: false,
    }
];
