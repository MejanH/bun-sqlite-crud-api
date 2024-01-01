import { DatabaseManager } from "./db/db-manager";

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);
    const dbManager = new DatabaseManager(req);
    dbManager.init();
    switch (url.pathname) {
      case "/":
        const users = await dbManager.getUsers();
        return Response.json({ users });
      case "/create":
        await dbManager.createUser();
        return new Response("Created", { status: 201 });
      case "/update":
        await dbManager.updateUser();
        return new Response("Updated", { status: 200 });
      case "/delete":
        await dbManager.deleteUser();
        return new Response("Deleted", { status: 200 });
      default:
        return new Response("Not found", { status: 404 });
    }
  },
});

console.log(`Listening on http://localhost:${server.port}...`);
