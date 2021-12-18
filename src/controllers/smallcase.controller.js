const express = require("express");
const router = express.Router();
const Smallcase = require("../models/smallcase.model");

router.get("", async(req,res)=>{
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 10;
        const investmentrange = +req.query.investmentrange || Infinity;
        const volatility = req.query.volatility || 'Low Volatility';
        const strategy = req.query.strategy || null;  
        console.log(volatility);

        const skip = (page-1)*size;
        const data =await Smallcase.find({"stats.ratios.riskLabel":volatility,"stats.minInvestAmount":{$lt:investmentrange}}).populate({path:"info",populate: ["type","investmentstrategy"]}).skip(skip).limit(size).lean().exec();
        return res.render("allsmallcase",{data});

    } catch (e) {
        res.status(500).json({message: e.message});
    }
});

router.get("/all", async(req,res)=>{
    try {
        const data =await Smallcase.find().populate({path:"info",populate: ["type"]}).lean().exec();
        return res.status(200).send(data);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
});

router.post("", async(req,res)=>{
    try {
        const operation =await Smallcase.create(req.body);
        return res.status(200).send(operation);
        } catch (e) {
        res.status(500).json({message: e});
    }
});

router.patch("/:id",async(req,res)=>{
    try {
        const operation =await Smallcase.findByIdAndUpdate(req.params.id,req.body,{new:true});
        return res.status(200).send(operation);
        } catch (e) {
        res.status(500).json({message: "Internal server error"});
    }
});

router.delete("/:id",async(req,res)=>{
    try {
        const operation = await Smallcase.findOneAndDelete(req.params.id);
        return res.status(200).send(operation);

    } catch (e) {
        res.status(500).json({message: "Internal server error"});
    }
});


module.exports = router;
