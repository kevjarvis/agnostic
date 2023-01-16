import express from "express";
import cartRoutes from './routes/cartRoutes';
import productRoutes from './routes/productRoutes';
import adminMiddleware from "./middlewares/admin.middleware";
import errorHandler from './middlewares/errorHandler.middleware';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Import middlewares
app.use(adminMiddleware)

app.use('/api/carrito', cartRoutes);
app.use('/api/productos', productRoutes)

// middleware que maneja errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[INFO]: Servidor inicializado en puerto ${PORT}`);
})

