// importando as definições de Request e Response no express pra satisfazer a tipagem do TypeScript

import { Request, Response } from 'express';
import knex from '../database/connections';

class PointsController {

    async index(request: Request, response: Response) {
        const {uf, city, items} = request.query;
        
        const parsedItems = String(items)
        .split(',')
        .map(item => Number(item.trim()));

        //    WhereIn para comparar dados de duas arrays

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*')

        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `http://192.168.0.2:3333/uploads/${point.image}`
            };
        })
    
        return response.json(serializedPoints);
    }

    async create(request: Request, response: Response ) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        const trx = await knex.transaction()

        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }
    
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items
        .split(',')
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => {
                return {
                    item_id,
                    point_id
                }
        });
    
        await trx('point_items').insert(pointItems);

        // ao final de todas as transactions é necessário usar o commit()

        await trx.commit();
    
        return response.json({
            id: point_id,
            ...point,

        })
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point) {
            return response.status(400).json({ message: 'Point Not Found' });
        }

        const serializedPoint = {
                ...point,
                image_url: `http://192.168.0.2:3333/uploads/${point.image}`
        }

        /* JOIN faz uma busca em uma tabela principal e onde a igualdade de valores se satisfazer
        ele vai juntar as tabelas menores
        */ 

        const items = await knex('items')
        .join('point_items', 'items.id', '=', "point_items.item_id")
        .where('point_items.point_id', id)
        .select('items.title');

        return response.json({point: serializedPoint, items});
    }
};

export default PointsController;