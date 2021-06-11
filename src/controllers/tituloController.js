const mongoose = require("mongoose")
const Titulo = require("../models/titulo")

const createTitle = async(req, res) => {
   const titulo = new Titulo({
      _id: new mongoose.Types.ObjectId(),
      nome: req.body.nome,
      genero:req.body.genero,
      descricao: req.body.descricao,
      estudio:req.body.estudio
   })

   const filmeJaExiste = await Titulo.findOne({nome:req.body.nome})
   if(filmeJaExiste){
      return res.status(409).json({error: "Filme já cadastrado"})
   }

   try {
      const newTitle = await titulo.save()
      return res.status(201).json(newTitle)
   } catch (err) {
      return res.status(400).json({message: err.message})
   }
}

const showTitle = async(req, res)=>{
   try{
      const titulos = await Titulo.find().populate("estudio")
      return res.status(200).json(titulos)
      } catch (err) {
         res.status(500).json({message: err.message})
      }
}

const mostraTitulosMarvel = async (req,res) =>{
   const titulos = await Titulo.find().populate("estudio")
   const titulosFiltrados = titulos.filter(titulo => titulo.estudio.nome == "Marvel")

   return res.status(200).json(titulosFiltrados)
}

const mostraTitulosGhibli = async (req, res) =>{
   const titulos = await Titulo.find().populate("estudio")
   const titulosFiltrados = titulos.filter(titulo => titulo.estudio.npme == "Ghibli")

   return res.status(200).json(titulosFiltrados)
}


module.exports ={
   createTitle,
   showTitle,
   mostraTitulosMarvel,
   mostraTitulosGhibli
}