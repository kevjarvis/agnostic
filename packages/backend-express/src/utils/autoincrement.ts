/** Esta interfaz define el tipo de items de la forma
 * {id: number, ...}
 * Las otras propuedades del item son opcionales para añadirle
 * versatilidad a la función 
 */
interface Item {
  id: number,
  [key: string]: any
}

/** Función que dado un array de objetos con propiedad id de tipo 
 * numérica, retorna un nuevo id
 */
export default function autoIncrementID(array:Item[]) : number{
  const lastID = Math.max(...array.map(object => object.id))
  return lastID + 1;
}

export function createFirstID(object:object) : object {
  return {...object, id: 1};
}