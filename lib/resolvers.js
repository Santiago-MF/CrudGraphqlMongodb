// Comenzamos traendo el modelo de datos
const Products = require("../models/products")

// Exportamos las funciones que resolverá las peticiones
module.exports = {
    // Esta función es para los querys
    products: async() => {
        try {
            // creamos una constante que mediante find me trae todo el arreglo de registros
            const productsFetched = await Products.find()
    
                // Hacemos un map al arreglo y creamos otro arreglo pero con los datos que queremos mostrar
            return productsFetched.map(product => {
                console.log(product);
                return {
                    title:product.title,
                    description: product.description,
                    price: product.price,
                    _id: product.id,
                    createdAt: new Date(product._doc.createdAt).toISOString(),
                }

            })
        } catch (error) {
            throw error
        }
    },

    // Esta otra función es para el mutation
    createProduct: async args => {
        try {
            // Creamos un objeto a partir de los args que son los que mandamos
            console.log(args.product);
            const { title, description, price } = args.product
                // Creamos el objeto article con el objeto anterior
            const product = new Products({
                    title,
                    description,
                    price
                })
                // Hacemos un await guardando el articulo creado con save
            const newProduct = await product.save()
                // Retornamos un objeto con el resultado del await y el id
            return {...newProduct._doc, _id: newProduct.id }
        } catch (error) {
            throw error
        }
    },

    deleteProduct: async (id) => {
        try {
          const deletedPrduct = await Products.findByIdAndDelete(id);
          return  `Product deleted Successfully!!!`
        } catch (error) {
          throw error
        }
      },

    updateProduct: async args =>{
        try{
            const {_id, price} = args
            const updatedProduct = await Products.findByIdAndUpdate(_id, {price: price });
            return `Product ${updatedProduct.id} updated Successfully!!!`
        } catch (error){
            throw error
        }
    },
}

/**
 mutation{
  createProduct(product:{title:"Arroz",description:"Con leche",price:"10s"}){
    _id,
    title,
    description,
    price
  }
  
}


{
  products{
    _id,
    title,
    description,
    price
  }
  
}
**/



