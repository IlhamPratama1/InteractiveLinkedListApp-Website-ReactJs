module.exports = {
  HOST: "localhost",
  PORT: 5432,
  USER: "postgres",
  PASSWORD: null,
  DB: "interactive_linkedlist",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0
  }
};