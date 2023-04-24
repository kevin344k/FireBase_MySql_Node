const app=require('./app')


app.listen(app.get('port'));
console.log('serve5r on port ', app.get('port'))