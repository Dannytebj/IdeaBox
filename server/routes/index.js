
module.export = (app) => {
   app.get('/', (req, res) => {
    res.send('home.html');
  });
}