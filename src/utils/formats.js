import moment from 'moment';
import { formatDateToRender, formatDateTimeDisplay } from './contants';

export const displayDate = date => {
  if (date !== null) {
    return moment(date).format(formatDateToRender);
  }
};

export const displayDateTime = date => {
  if (date !== null) {
    return moment(date).format(formatDateTimeDisplay);
  }
};

export const displayPrice = amount =>
  Number(amount).toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS'
  });
