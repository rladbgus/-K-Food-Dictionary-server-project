const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const PORT = 5000;

const userRouter = require('./routes/users');
// const productRouter = require('./routes/products');

dotenv.config();
app.use(cors());
app.use(logger());

app.use(cookieParser(process.env.SESSION_SECRET_KEY));
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false, // resave는 요청이 왔을 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지에 대한 설정
  saveUninitialized: false, // saveUninitialized는 세션에 저장할 내역이 없더라도 세션을 저장할지에 대한 설정
}));

app.use(express.json()); // body-parser역할
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRouter);
// app.use('/product', productRouter);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(PORT, () => {
  console.log(`${PORT}번포트에 연결됨`);
});
