import Client from '../database';


export type drugs = {
    idpharmaceutical?: number,
    slug: string,
    pharmaceuticalname: string,
    pharmaceuticaltype:string,
    pharmacyid: number,
    quantity: number,
    price:number
  };

export class Drugs {
    async index(): Promise<drugs[]> {
        try {
            const conn = await Client.connect();
            const sql = 'select drugs.idpharmaceutical, drugs.slug, drugs.pharmaceuticalname, drugs.pharmaceuticaltype, drugs.pharmacyid, drugs.quantity, drugs.price , pharmacy.pharmacyLocation from drugs left join pharmacy on drugs.pharmacyid = pharmacy.idpharmacy;';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        } catch (e) {
            throw new Error(`${e}`);
        }
    }

    async show(slug: string): Promise<drugs> {
        try {
            const conn = await Client.connect();
            const sql = 'select * from drugs where slug =($1);';
            const res = await conn.query(sql, [slug]);
            conn.release();
            return res.rows[0];
        } catch (e) {
            throw new Error(`${e}`);
        }
    }
}