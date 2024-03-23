import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const mongoURL = "mongodb://localhost:27017/library";  // acceder a la base de datos
app.use(express.json());

app.get('/authors', async(req, res) => {
  try {
    const client = await MongoClient.connect(mongoURL, {useNewUrlparser: true, useUnifiedTopology: true});
    const db = client.db();

    const authors = await db.collection('authors').find().toArray();
    client.close();
    res.json(authors);
  }catch (error){
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});