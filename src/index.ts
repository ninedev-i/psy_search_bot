import BotApi, { CallbackQuery, InlineKeyboardButton, Message } from 'node-telegram-bot-api';
import { age, specialist, format, city, gender, price } from './preferences';
import {formatDescription, getData, setUserConfig} from './data';
import { token } from './config';

const bot = new BotApi(token as string, { polling: true });

bot.setMyCommands([
    { command: '/start', description: 'Начнемс' },
    { command: '/info', description: 'Что ты умеешь' },
]);

bot.on('message', async ({ chat, text }: Message) => {
    const chatId = chat.id;

    switch (text) {
        case '/start':
            bot.sendMessage(
                chatId,
                'Сейчас я спрошу у вас несколько вопросов, которые помогут определиться со специалистом. Чем меньше критериев, тем больше выбор, но не волнуйтесь — вы сможете пройти опрос еще раз.',
            );
            bot.sendMessage(chatId, 'Знаете ли вы кого ищете?', {
                reply_markup: { inline_keyboard: specialist },
            });
            break;
        default:
            const list = await getData();
            list.forEach(({ name, format, city, price, photo }) => {
                if (photo) {
                    bot.sendPhoto(chatId, photo, {
                        caption: `*${name}*\n${formatDescription[format]}\n${city}\n${price} руб`,
                        //@ts-ignore
                        parse_mode: 'markdown',
                        disable_notification: true,
                    });
                } else {
                    bot.sendMessage(
                        chatId,
                        `*${name}*\n${formatDescription[format]}\n${city}\n${price} руб`,
                        {
                            //@ts-ignore
                            parse_mode: 'markdown',
                            disable_notification: true
                        },
                    );
                }
            });
    }
});

bot.on('callback_query', ({ data, message }: CallbackQuery) => {
    let question = '';
    let options;
    //@ts-ignore
    const [full, type, value] = data!.match(/(\w+)_(\d+)?/i);

    if (data!.match(/start_(\d+)?/i)) {
        setUserConfig({
            telegram_id: message!.chat.id,
            specialist_type: value
        })
        question = 'Знаете ли вы кого ищете?';
        options = specialist;
    } else if (data!.match(/specialist_(\d+)?/i)) {
        question = 'Предпочтительный возраст специалиста';
        options = age;
        setUserConfig({
            telegram_id: message!.chat.id,
            specialist_type: value,
        });
    } else if (data!.match(/age_(\d+)?/i)) {
        setUserConfig({
            telegram_id: message!.chat.id,
            age: value,
        });
        question = 'Предпочтительный формат работы';
        options = format;
    } else if (data!.match(/format_(\d+)?/i)) {
        setUserConfig({
            telegram_id: message!.chat.id,
            format: value,
        });
        //@ts-ignore
        const [full, format] = data!.match(/format_(\d+)?/i);
        if (format === '2') {
            question = 'Город';
            options = city;
            setUserConfig({
                telegram_id: message!.chat.id,
                city: value,
            });
        } else {
            setUserConfig({
                telegram_id: message!.chat.id,
                gender: value,
            });
            question = 'Пол специалиста';
            options = gender;
        }
    } else if (data!.match(/city_(\d+)?/i)) {
        setUserConfig({
            telegram_id: message!.chat.id,
            gender: value,
        });
        question = 'Пол специалиста';
        options = gender;
    } else if (data!.match(/price_(\d+)?/i)) {
        setUserConfig({
            telegram_id: message!.chat.id,
            price: value,
        });
        question = 'Цена за час';
        options = price;
    }

    bot.editMessageText(question, {
        chat_id: message!.chat.id,
        message_id: message!.message_id,
        reply_markup: {
            inline_keyboard: options as InlineKeyboardButton[][],
        },
    });
});
