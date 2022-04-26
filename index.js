import 'dotenv/config'
import express from "express";
import sqs from "./routes/sqs"

const port = 3000
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
	res.json({ "hello": "world" })
})

app.use('/api', sqs );

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
