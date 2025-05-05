// using pg.Pool lib
import pg from "pg"
const { Pool } = pg

const pool = new Pool();

const query = (text, params) => pool.query(text, params);
export { query };
export default { query };