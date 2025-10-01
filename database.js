require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = process.env.DB_SOURCE || "movies.db";

const db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {

        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');

        db.serialize(() => {
            console.log('Running database setup...');


            db.run(`CREATE TABLE IF NOT EXISTS movies (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                director TEXT NOT NULL,
                year INTEGER NOT NULL
            )`, (err) => {
                if (err) {

                    console.error('Error creating table:', err.message);
                    return;
                }
                console.log('Table "movies" is ready.');


                const sql_check = `SELECT COUNT(*) as count FROM movies`;
                db.get(sql_check, (err, row) => {
                    if (err) {
                        console.error('Error checking table count:', err.message);
                        return;
                    }

                    // 3. Jika kosong, masukkan data awal
                    if (row.count === 0) {
                        console.log("Table is empty, seeding initial data...");
                        const sql_insert = `INSERT INTO movies (title, director, year) VALUES (?,?,?)`;

                        db.run(sql_insert, ["Parasite", "Bong Joon-ho", 2019]);
                        db.run(sql_insert, ["The Dark Knight", "Christopher Nolan", 2008]);
                        // Data yang diperbaiki:
                        db.run(sql_insert, ["Man of Steel", "Zack Snyder", 2013]);
                        db.run(sql_insert, ["Superman Returns", "Bryan Singer", 2006]);
                    }
                });
            });
        });
    }
});

const db2 = new sqlite3.Database('./directors.db',(err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database directors.');
        db2.run(`CREATE TABLE IF NOT EXISTS director (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name text NOT NULL,
                birthYear text NOT NULL
              )`,
            (err) => {
                if (err) {
                    console.log('Gagal membuat tabel director', err.message);
                }
                
                db2.get('SELECT COUNT(*) AS count FROM director', (err, row) => {
                    if (err) {
                        console.error(err.message);
                    }

                    if (row.count === 0) {
                        console.log('menambahkan data awal ke tabel director');
                        const insert = 'INSERT INTO director (name, birthYear) VALUES (?,?)';
                        db2.run(insert, ["Christopher Nolan", 1970]);
                        db2.run(insert, ["The Wachowskis", 1980]);
                        db2.run(insert, ["Herman Febriansah", 1992]);
                    }
                });
            });
    }
});

module.exports = {db,db2};
