const express = require('express');
const { Pool } = require('pg');
 
const app = express();
const port = 3000;
 
 
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: 'Kuliahsem5', // pw postgresql
    port: 5432,
});
 
app.use(express.json());

app.get('/biodata', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM biodata");
 
        res.status(200).json({
            message: "Berhasil mengambil data biodata",
            data: result.rows
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Terjadi kesalahan pada server atau database" });
    }
});
 
//GET
app.get('/biodata/:id', (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM biodata");

        res.status(200).json({
            message: "Berhasil mengambil data biodata",
            data: result.rows
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Terjadi kesalahan pada server atau database" });
    }
});

//POST
app.post('/biodata', async (req, res, next) => {
    try {
        const { nama, nim, kelas } = req.body;
 
        if (!nama || !nim || !kelas) {
            return res.status(400).json({ message: "nama, nim, dan kelas wajib diisi" });
        }
 
        const result = await pool.query(
            "INSERT INTO biodata (nama, nim, kelas) VALUES ($1, $2, $3) RETURNING *",
            [nama, nim, kelas]
        );
 
        res.status(201).json({
            message: "Berhasil menambahkan data biodata",
            data: result.rows[0]
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Terjadi kesalahan pada server atau database" });
    }
});

//PUT


app.listen(port, () => {
    console.log(`App running on port ${port}`);
});


//put

//delete


