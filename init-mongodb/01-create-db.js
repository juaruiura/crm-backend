// Create user
dbAdmin = db.getSiblingDB("admin");
dbAdmin.createUser({
  user: "root",
  pwd: "root",
  roles: [{ role: "userAdminAnyDatabase", db: "admin" }],
  mechanisms: ["SCRAM-SHA-1"],
});

// Authenticate user
dbAdmin.auth({
  user: "root",
  pwd: "root",
  mechanisms: ["SCRAM-SHA-1"],
  digestPassword: true,
});

// Create DB and collection
db = new Mongo().getDB("crm");
db.createCollection("users", { capped: false });
