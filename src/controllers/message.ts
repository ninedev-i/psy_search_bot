import { specialist } from '../preferences';
import { formatDescription, getData } from '../data';
import { bot } from '../index';

export const start = async (chatId: number) => {
    await bot.sendMessage(
        chatId,
        'Сейчас я спрошу у вас несколько вопросов, которые помогут определиться со специалистом. Чем меньше критериев, тем больше выбор, но не волнуйтесь — вы сможете пройти опрос еще раз.',
    );
    await bot.sendMessage(chatId, 'Знаете ли вы кого ищете?', {
        reply_markup: { inline_keyboard: specialist },
    });
};

export const getSpecialistList = async (chatId: number) => {
    const list = await getData();
    list.forEach(({ name, format, city, price, photo }) => {
        if (photo) {
            bot.sendPhoto(chatId, photo, {
                caption: `*${name}*\n${formatDescription[format]}\n${city}\n${price} руб`,
                parse_mode: 'Markdown',
                disable_notification: true,
            });
        } else {
            bot.sendMessage(
                chatId,
                `*${name}*\n${formatDescription[format]}\n${city}\n${price} руб`,
                {
                    parse_mode: 'Markdown',
                    disable_notification: true,
                },
            );
        }
    });
};
