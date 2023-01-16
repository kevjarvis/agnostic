import { IItemDatabase } from '../types/api.interface';
import * as fs from 'fs';

export class FileHandler {
  private fileName: string;
  private data: any;
  private isEmpty: any;

  constructor(fileName: string) {
    this.fileName = fileName;
    this.updateProps()
  }

  private updateProps() {
    // Función que actualiza las propiedades de la clase
    try {
      let datos = fs.readFileSync(this.fileName, 'utf-8');
      this.data = JSON.parse(datos)
      this.isEmpty = this.data.length === 0;
    } catch (error) {
      // Si no encuentra el archivo, lo crea
      this.createFile()
    }
  }

  private createFile(): void {
    /** metodo que crea un archivo */
    fs.writeFileSync(this.fileName, "[]")
    this.updateProps()
  }

  private async autoIncrementID() {
    /** Método que devuelve el id auto-incrementado */
    const fileContent = await this.get().body;
    const lastID:number = fileContent[fileContent.length - 1]?.id + 1

    // Si el archivo está vacío, devuelve como id = 1
    return this.isEmpty ? 1 : lastID
  }

  get(id?): any {
    /** Lee un archivo y devuelve su contenido en formato JSON
     * Si un id es pasado buscará ese elemento y lo retornará
     */
    this.updateProps()
    try {
      if (id) {
        let itemFound:unknown[] = this.data.filter(item => item.id == id)
        if (!itemFound.length) return {code: -2, body: 'Item no encontrado'}
        this.updateProps()
        return {code: 4, body: itemFound}
      }
      this.updateProps()
      return {code: 4, body: this.data}
    } catch (error) {
      this.updateProps()
      return {code: -3, body: `[ERROR] ${error}`}
    }
  }

  async update(item:object, id?:number) {
    // Si se le pasa el id se tiene que actualizar el objeto
    try {
      const fileContent: IItemDatabase[] = await this.get().body;

      // _fileContent almacena el nuevo contenido del archivo, actualizado
      let _fileContent;
      let _modifiedItem; // almacena el item agregado o actualizado

      if (id) {
        /** Inicia el proceso de actualización */

        // Se encuentra el item a actualizar
        const itemToUpdate:any[] = fileContent.filter(element => element.id == id)
        if (!itemToUpdate.length) return {code: -2, body: 'Objeto no encontrado'}

        // updatedItem almacena el nuevo item, con la nueva info
        const updatedItem = {...itemToUpdate[0]}
        Object.assign(updatedItem, item)

        /** Reemplaza la info del antiguo item con la nueva */ 
        fileContent[fileContent.indexOf(itemToUpdate[0])] = updatedItem

        /** Se asigna una fileContent a la variable _fileContent para 
         * que tanto el proceso de actualización como de adición sean iguales
         */

        _fileContent = fileContent;
        _modifiedItem = updatedItem;
      } else {
        // Proceso de agregado al final
        const new_id = await this.autoIncrementID();

        // construimos el nuevo item con su id
        const _item:IItemDatabase = {...item, id: new_id}

        // asigna el nuevo contenido total a _fileContent
        _fileContent = [...fileContent, _item]
        _modifiedItem = _item;
      }

      await fs.promises.writeFile(
        this.fileName,
        /** El nuevo contenido del archivo se transforma a string */
        JSON.stringify(_fileContent, null, 2)
      )

      return {code: 4, body: _modifiedItem}
      
    } catch (error) {
      return {code: -3, body: `[ERROR] ${error}`}
    }
  }

  async delete(id?:number) {
    /** Elimina un item de la base de datos
     * si no se le otorga un id elimina todos los datos,
     *  retorna un mensaje de OK
     * si se le otorga un id elimina solo el item encontrado
     *  retorna el elemento eliminado
     */
    try {
      if (id) {
        const fileContent:IItemDatabase[] = await this.get().body;
        if (fileContent.some(element => element.id == id)) {
          /** En este proceso se filtra la base de datos dejando fuera 
           * el item con el id inputado.
           */
          const filteredContent = fileContent.filter(element => element.id != id)
          const itemToRemove = fileContent.filter(element => element.id == id)
          await fs.promises.writeFile(
            this.fileName,
            JSON.stringify(filteredContent, null, 2)
          )

          return {code: 4, body: itemToRemove}
        }

        return {code: -2, body: `No existe elemento con id ${id}`}

      } else {
        // DANGER: elimina todos los datos
        await fs.promises.writeFile(this.fileName, "")
        return {code: 4, body: `Todos los elementos de ${this.fileName} fueron eliminados`}
      }
      
    } catch (error) {
      return {code: -3, body: `[ERROR] ${error}`}
    }
  }
}
