import { createClient } from '@vercel/postgres';
import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());

async function run() {
    const client = createClient();
    await client.connect();
    try {
        const res = await client.query(`SELECT slug, name, category, in_stock FROM products`);
        console.log(JSON.stringify(res.rows, null, 2));
    } catch(e) {
        console.error(e);
    }
    await client.end();
    process.exit(0);
}
run();
