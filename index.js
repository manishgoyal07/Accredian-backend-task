import express from 'express';
import cors from 'cors';
import {referralMiddleware} from './middlewares.js';

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "tiger123",
//     database: "accredianDB"
// })

// connection.connect(function (err) {
//     if (err) {
//         console.log("Error in the connection")
//         console.log(err)
//     }
//     else {
//         console.log(`Database Connected`)
//         connection.query(`SHOW DATABASES`,
//             function (err, result) {
//                 if (err)
//                     console.log(`Error executing the query - ${err}`)
//                 else
//                     console.log("Result: ", result)
//             })
//     }
// })


app.post('/refer', referralMiddleware)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});