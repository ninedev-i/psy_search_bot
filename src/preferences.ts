import { InlineKeyboardButton } from 'node-telegram-bot-api';

export const specialist: InlineKeyboardButton[][] = [
  [
    { text: 'Психолог', callback_data: 'specialist_1' },
    { text: 'Психиатр', callback_data: 'specialist_2' },
    { text: 'Невролог', callback_data: 'specialist_3' },
    { text: 'Не знаю', callback_data: 'specialist_3' },
  ],
];

export const age: InlineKeyboardButton[][] = [
  [
    { text: '20—29', callback_data: 'age_1' },
    { text: '30—39', callback_data: 'age_2' },
    { text: '40—49', callback_data: 'age_3' },
    { text: '50+', callback_data: 'age_4' },
  ],
  [{ text: 'Не важно', callback_data: 'age_0' }],
  [{ text: '← Назад', callback_data: 'start_' }],
];

export const format: InlineKeyboardButton[][] = [
  [
    { text: 'Онлайн', callback_data: 'format_1' },
    { text: 'Очно', callback_data: 'format_2' },
  ],
  [{ text: 'Не важно', callback_data: 'format_0' }],
  [{ text: '← Назад', callback_data: 'specialist_' }],
];

export const city: InlineKeyboardButton[][] = [
  [
    { text: 'Санкт-Петербург', callback_data: 'city_1' },
    { text: 'Москва', callback_data: 'city_2' },
    { text: 'Тбилиси', callback_data: 'city_3' },
    { text: 'Ереван', callback_data: 'city_4' },
  ],
  [{ text: '← Назад', callback_data: 'age_' }],
];

export const gender: InlineKeyboardButton[][] = [
  [
    { text: 'Мужчина', callback_data: 'gender_1' },
    { text: 'Женщина', callback_data: 'gender_2' },
  ],
  [{ text: 'Не важно', callback_data: 'gender_0' }],
  [{ text: '← Назад', callback_data: 'age_' }],
];

export const price: InlineKeyboardButton[][] = [
  [
    { text: '1500—2000', callback_data: 'price_1' },
    { text: '2000—3000', callback_data: 'price_2' },
    { text: '3000—4000', callback_data: 'price_3' },
    { text: '4000—5000', callback_data: 'price_4' },
  ],
  [{ text: '← Назад', callback_data: 'format_' }],
];
