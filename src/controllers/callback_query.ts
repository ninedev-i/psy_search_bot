import { CallbackQuery, InlineKeyboardButton } from 'node-telegram-bot-api';
import { setUserConfig } from '../data';
import { age, city, format, gender, price, specialist } from '../preferences';
import { bot } from '../index';

export const callback_query = async ({ data, message }: CallbackQuery) => {
    let question = '';
    let options;
    //@ts-ignore
    const [full, type, value] = data!.match(/(\w+)_(\d+)?/i);

    if (data!.match(/start_(\d+)?/i)) {
        await setUserConfig({
            telegram_id: message!.chat.id,
            specialist_type: value,
        });
        question = 'Знаете ли вы кого ищете?';
        options = specialist;
    } else if (data!.match(/specialist_(\d+)?/i)) {
        question = 'Предпочтительный возраст специалиста';
        options = age;
        await setUserConfig({
            telegram_id: message!.chat.id,
            specialist_type: value,
        });
    } else if (data!.match(/age_(\d+)?/i)) {
        await setUserConfig({
            telegram_id: message!.chat.id,
            age: value,
        });
        question = 'Предпочтительный формат работы';
        options = format;
    } else if (data!.match(/format_(\d+)?/i)) {
        await setUserConfig({
            telegram_id: message!.chat.id,
            format: value,
        });
        //@ts-ignore
        const [full, format] = data!.match(/format_(\d+)?/i);
        if (format === '2') {
            question = 'Город';
            options = city;
            await setUserConfig({
                telegram_id: message!.chat.id,
                city: value,
            });
        } else {
            await setUserConfig({
                telegram_id: message!.chat.id,
                gender: value,
            });
            question = 'Пол специалиста';
            options = gender;
        }
    } else if (data!.match(/city_(\d+)?/i)) {
        await setUserConfig({
            telegram_id: message!.chat.id,
            gender: value,
        });
        question = 'Пол специалиста';
        options = gender;
    } else if (data!.match(/price_(\d+)?/i)) {
        await setUserConfig({
            telegram_id: message!.chat.id,
            price: value,
        });
        question = 'Цена за час';
        options = price;
    }

    await bot.editMessageText(question, {
        chat_id: message!.chat.id,
        message_id: message!.message_id,
        reply_markup: {
            inline_keyboard: options as InlineKeyboardButton[][],
        },
    });
};
