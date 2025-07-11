import _ from 'lodash';

export const judeHasOwnProperty = (obj: object, name: PropertyKey) => {
    return obj.hasOwnProperty(name);
};

// 字符串为空
export const isValueEmpty = (value: any) => {
    return _.isEmpty(value);
};
