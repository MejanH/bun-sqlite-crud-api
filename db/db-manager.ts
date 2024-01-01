import { Database } from "bun:sqlite";

export class DatabaseManager {
  private db: Database;
  private req: Request;

  constructor(req: Request) {
    this.db = new Database("mydb.sqlite");
    this.req = req;
  }

  public init(): void {
    const query = this.db.query(`CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    );`);
    query.run();
  }

  public async getUsers(): Promise<any> {
    const query = this.db.query(`SELECT * FROM user;`);
    return query.all();
  }

  public async createUser(): Promise<void> {
    const { name, email } = await this.req.json();
    const query = this.db.query(
      `INSERT INTO user (name, email) VALUES (?, ?);`
    );
    query.run(name, email);
  }

  public async updateUser(): Promise<void> {
    const { id, name, email } = await this.req.json();
    const query = this.db.query(
      `UPDATE user SET name = ?, email = ? WHERE id = ?;`
    );
    query.run(name, email, id);
  }

  public async deleteUser(): Promise<void> {
    const { id } = await this.req.json();
    const query = this.db.query(`DELETE FROM user WHERE id = ?;`);
    query.run(id);
  }

  public async getUser(): Promise<any> {
    const { id } = await this.req.json();
    const query = this.db.query(`SELECT * FROM user WHERE id = ?;`);
    return query.get(id);
  }
}
