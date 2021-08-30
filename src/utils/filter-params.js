import moment from 'moment';
import { formatDateToParser } from './contants';

export const CustomDateParam = {
  encode: date => (date ? date.format(formatDateToParser) : date),
  decode: input =>
    input ? moment(input).format(formatDateToParser) : undefined
};

export const DateRangeParam = {
  encode: values => {
    return values
      ? values.map(value => (value ? value.format(formatDateToParser) : value))
      : values;
  },
  decode: values =>
    values.map(value =>
      value ? moment(value).format(formatDateToParser) : value
    )
};
