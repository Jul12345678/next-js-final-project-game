exports.up = async (sql) => {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(50) NOT NULL UNIQUE,
      password_hash varchar(120) NOT NULL
		);
				`;
};

exports.down = async (sql) => {
  console.log('Drop Users');
  await sql`
    DROP TABLE users
  `;
};
