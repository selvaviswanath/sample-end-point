const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.json());

// Sample data store (in-memory)
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/rootPage.html');
});

app.post('/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.json(newItem);
});

app.get('/items', (req, res) => {
  res.json(items);
});


app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((i) => i.id === itemId);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((i) => i.id === itemId);
  if (item) {
    item.name = req.body.name;
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = items.findIndex((i) => i.id === itemId);
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.json({ message: 'Item deleted' });
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
