
const express = require("express");
const app = express();
const cors = require("cors");
const stripe=require("stripe")("sk_test_51OB9TcSB3m3uX2353mSqmoSEYTv8KheGRWIiI3Qf3D7XUR01osjMrEw5ciPfECt9hu1fwP5wjZaqwTSUuOPWUrvP00vN22vr2O")
const port=5000;

app.use(express.json());
app.use(cors());

//checkout api
app.post("/api/create-checkout-session",async(req,res)=>{
    const {products} = req.body;
    console.log(products)


    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.title,
                
                // images:[product.Image]
            },
            unit_amount:100,
        },
        quantity:product.quantity
    })
    );

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/Profile",
        cancel_url:"http://localhost:3000/Profile",
    });

    res.json({id:session.id})
    // console.log(session.id)
})


app.listen(port,()=>{
    console.log(`server running on ${port}`)
})