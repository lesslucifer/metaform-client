import {request} from './base.service'

export const getObject = async params => await request('GET', '/objects', undefined, params)
export const updateObject = async data => await request('POST', '/objects', data)