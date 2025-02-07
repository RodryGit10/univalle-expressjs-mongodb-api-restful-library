import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

const mongoURL = "mongodb+srv://rodrygo:AwL8A4RFjAED30Nj@clusterunivalle.uzpjpsm.mongodb.net/library?retryWrites=true&w=majority&appName=ClusterUnivalle";  // acceder a la base de datos
app.use(express.json());

app.get('/authors', async(req, res) => {
  try {
    const client = await MongoClient.connect(mongoURL);
    const db = client.db();

    const authors = await db.collection('authors').find().toArray();
    client.close();
    res.json(authors);
  }catch (error){
    console.error(error);
    res.status(500).send("Error en el servidor");
  }
  
})

app.get('/authors/:id', async (req, res) => {
  try {
      const client = await MongoClient.connect(mongoURL);
      const db = client.db();
  
      const author = await db.collection('authors').findOne({ _id: new ObjectId(req.params.id)});
      client.close();
      res.json(author);
  } catch (error) {
      console.error(error);
      res.status(500).send("Error en el Servidor");
  }
});

app.post('/authors', async (req, res) => {
  try {
      const client = await MongoClient.connect(mongoURL);
      const db = client.db();
  
      // obtener datos
      const {name, nationality} = req.body;
      if (!name) {
        res.status(400).send('Se require el campo name');
        return;
      }

      const newAuthor = { name, nationality };
      await db.collection('authors').insertOne(newAuthor);

      client.close();
      res.json(newAuthor);
  } catch (error) {
      console.error(error);
      res.status(500).send("Error en el Servidor");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});