import Client from '../database';



export type pharmacy = {
    idpharmacy?: number;
    slug: string,
    pharmacyname: string,
    pharmacynum: string,
    pharmacylocation: string,
  };

export class Pharmacy {
    async index(): Promise<pharmacy[]> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from pharmacy;';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async show(slug: string): Promise<pharmacy> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from pharmacy where slug =($1);';
            const res = await conn.query(sql, [slug]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}