const {Router}=require('express')
const router=Router()
const admin=require('firebase-admin')

const serviceAccount=require('../../node-firebase-example-d9953-firebase-adminsdk-xb4p5-5d96168336.json')

admin.initializeApp(
  
  {
    credential:admin.credential.cert(serviceAccount),
    databaseURL:"https://node-firebase-example-d9953-default-rtdb.firebaseio.com/"
  }

)
const db=admin.database()

router.get('/',(req,res)=>{
  db.ref('contacts').once('value',(snapshot)=>{
    const data=snapshot.val();
     res.render('index',{contacts:data})
    
  })

 
})

router.post('/new-contact',(req,res)=>{
  console.log(req.body)
  const newContact={
    firstName:req.body.firstname,
    lastName:req.body.lastname,
    email:req.body.email,
    phone:req.body.phone
  }
  db.ref('contacts').push(newContact)
res.redirect('/')
})

router.get('/delete-contact/:id',(req,res)=>{
  db.ref('contacts/'+ req.params.id).remove()
  res.redirect('/')
})


module.exports=router