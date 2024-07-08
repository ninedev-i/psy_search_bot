import BotApi, { Message } from 'node-telegram-bot-api';
import { token } from './config';
import { getSpecialistList, start } from './controllers/message';
import { callback_query } from './controllers/callback_query';

export const bot = new BotApi(token as string, { polling: true });

bot.setMyCommands([
    { command: '/start', description: 'Начнемс' },
    { command: '/info', description: 'Что ты умеешь' },
]);

bot.on('message', async ({ chat, text }: Message) => {
    switch (text) {
        case '/start':
            await start(chat.id);
            break;
        default:
            await getSpecialistList(chat.id);
    }
});

bot.on('callback_query', callback_query);
