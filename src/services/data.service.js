import {request} from './base.service'

export const getData = async (endpoint, params) => await request('GET', `/${endpoint}`, undefined, params)
export const updateData = async (endpoint, data) => await request('POST', `/${endpoint}`, data)