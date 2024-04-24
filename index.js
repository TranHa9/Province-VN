import express from "express";
require('dotenv').config();
import cors from 'cors';
import mysql2 from 'mysql2';


const app = express()

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["POST", "GET", "PUT", "DELETE"]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Tạo kết nối đến cơ sở dữ liệu
const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'provincevn'
});

// Kết nối đến cơ sở dữ liệu
connection.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối:', err);
        return;
    }
    console.log('Đã kết nối đến cơ sở dữ liệu MySQL');
});

app.get('/api/tinh-tp', (req, res) => {
    connection.query('SELECT * FROM province', (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).send('Lỗi server');
            return;
        }
        res.json(results);
    });
});
app.get('/api/tinh-tp/quan-huyen/:id', (req, res) => {
    const tinhTpId = req.params.id;
    connection.query('SELECT * FROM district WHERE province_id = ?', [tinhTpId], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).send('Lỗi server');
            return;
        }
        res.json(results);
    });
});
app.get('/api/quan-huyen', (req, res) => {
    connection.query('SELECT * FROM district', (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).send('Lỗi server');
            return;
        }
        res.json(results);
    });
});
app.get('/api/quan-huyen/xa-phuong/:id', (req, res) => {
    const quanHuyenId = req.params.id;
    connection.query('SELECT * FROM wards WHERE district_id = ?', [quanHuyenId], (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).send('Lỗi server');
            return;
        }
        res.json(results);
    });
});
app.get('/api/xa-phuong', (req, res) => {
    connection.query('SELECT * FROM wards', (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err);
            res.status(500).send('Lỗi server');
            return;
        }
        res.json(results);
    });
});

// Đoạn mã dưới này phải đặt dưới đoạn mã xử lý API
app.use('/', (req, res) => { res.send("server on...") })

const port = process.env.PORT || 9999
const listener = app.listen(port, () => {
    console.log(`Server is running in the port: http://localhost:${listener.address().port}`)
})
