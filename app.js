import express from 'express';
import bodyParser from 'body-parser';
import myProducts from './backend/jsonFolder/products.json' assert { type: 'json' };
import myPages from './backend/jsonFolder/pages.json' assert { type: 'json' };

import axios from 'axios';


const app = express();
const port = process.env.PORT|| 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const products = myProducts
const pages = myPages
const today = new Date();
const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
const formattedDate = today.toLocaleDateString('en-US', options);
const formattedTime = today.toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});
const currentDateTime = `${formattedDate} ${formattedTime}`;
let latitude = null;
let longitude = null;

app.post('/location', (req, res) => {
  
  latitude = req.body.latitude;
  longitude = req.body.longitude;
  

  console.log('Longitude:', longitude);
  res.status(200).json({ message: 'Location received successfully' });
})



app.get('/', (req, res) => {
 
  res.render('../view/index.ejs', { pages,latitude, 
    longitude,  currentDateTime });
});
app.get("/contact.ejs", (req,res)=>{
  res.render('../view/contact.ejs');
} );

app.get("/about.ejs", (req,res)=>{
  res.render('../view/about.ejs');
}
);
app.get("/pages/games.ejs", (req,res)=>{
  res.render('../view/pages/games.ejs');
}
);


app.get("/pages/gallery.ejs", (req, res) => {
  res.render('../view/pages/gallery.ejs');
});



app.get('/pages/:id', (req, res) => {
  const pageId = req.params.id;
  const page = pages.find(p => p.id === pageId);
  console.log(page);
  if (page) {
    res.render(`../view/pages/${page.id}`, { page: page });
  } else {
    res.status(404).send('Page not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running at${port}`);
})