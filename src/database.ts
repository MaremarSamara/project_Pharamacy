import { Pool } from 'pg';
import config_ from './config/config';


const Client = new Pool({
    connectionString: config_.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

export default Client;