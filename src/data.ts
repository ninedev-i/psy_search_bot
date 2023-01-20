import knex from 'knex';
import { dbConfig } from './config';
import { Specialist, UserConfig } from './types';

const knexConnection = knex(dbConfig);

export const getData = (): Promise<Specialist[]> => {
    return knexConnection('specialists').where({
        'id': 1
    }).select('*');
};

export const getUserConfig = (id: number): Promise<UserConfig> => {
    return knexConnection('users').where({
        telegram_id: id
    }).first('gender', 'format', 'city', 'price');
};

//@ts-ignore
export const setUserConfig = async (data: UserConfig): Promise<any> => {
    const user = await knexConnection<UserConfig>('users').insert(data).onConflict().merge();
};

export const formatDescription = ['Очно', 'Онлайн', 'Очно и онлайн'];
