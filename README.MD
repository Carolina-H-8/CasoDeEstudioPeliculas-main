# API de Gestión de Medios

API REST desarrollada con **Node.js, Express, Prisma ORM y MongoDB**. Permite gestionar películas y otros contenidos audiovisuales, así como sus géneros, directores, productoras y tipos.

## 1. Requisitos previos

Antes de ejecutar el proyecto, es necesario instalar los siguientes programas:

| Programa | Versión / requisito |
|---|---|
| Node.js | Versión 24 |
| Git | Versión reciente |
| MongoDB Community Server | Instalado localmente |
| MongoDB Shell (`mongosh`) | Instalado |

Descargas:

- [Node.js](https://nodejs.org/)
- [Git](https://git-scm.com/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)
- [MongoDB Shell](https://www.mongodb.com/try/download/shell)

También se recomienda instalar [MongoDB Compass](https://www.mongodb.com/products/tools/compass) para visualizar y administrar las bases de datos gráficamente.

## 2. Clonar el repositorio

Abrir CMD, PowerShell o la terminal de Visual Studio Code y ejecutar:

```bash
git clone https://github.com/Carolina-H-8/CasoDeEstudioPeliculas.git
```

Ingresar a la carpeta del proyecto:

```bash
cd CasoDeEstudioPeliculas
```

## 3. Instalar las dependencias

Ejecutar:

```bash
npm ci
```

Este comando instala las dependencias utilizando las versiones especificadas en `package-lock.json`.

**Importante:** el proyecto utiliza Prisma 6.19.0 y `@prisma/client` 6.19.0. Se recomienda conservar esas versiones para evitar incompatibilidades.

## 4. Configurar MongoDB

El proyecto utiliza MongoDB local y requiere un replica set llamado `rs0`.

### 4.1. Iniciar el servicio de MongoDB

En PowerShell, comprobar el estado del servicio:

```powershell
Get-Service MongoDB
```

Si está detenido, iniciarlo:

```powershell
Start-Service MongoDB
```

Si el servicio no existe, revisar la instalación de MongoDB y el nombre del servicio configurado.

### 4.2. Configurar el replica set

Localizar el archivo `mongod.cfg` de la instalación de MongoDB. Normalmente se encuentra dentro de la carpeta de instalación, en `bin`.

Abrirlo como administrador y comprobar que incluya esta configuración:

```yaml
replication:
  replSetName: rs0
```

Si ya existe una sección `replication`, agregar `replSetName` dentro de ella en lugar de duplicarla.

Guardar los cambios y reiniciar MongoDB desde PowerShell:

```powershell
Restart-Service MongoDB
```

### 4.3. Inicializar el replica set

Abrir una terminal y ejecutar:

```bash
mongosh
```

Inicializar el replica set:

```javascript
rs.initiate()
```

Comprobar su estado:

```javascript
rs.status()
```

La configuración estará lista cuando el nodo aparezca como `PRIMARY`.

Salir de MongoDB Shell:

```javascript
exit
```

## 5. Crear el archivo de entorno `.env`

En la raíz del proyecto, al mismo nivel que `package.json`, crear un archivo llamado:

```text
.env
```

Agregar el siguiente contenido:

```env
DATABASE_URL="mongodb://127.0.0.1:27017/peliculas_db?replicaSet=rs0"
PORT=3000
```

**Importante:**

- El archivo debe llamarse `.env`, no `.env.txt`.
- No se debe subir al repositorio.
- Cada integrante debe crear su propio archivo `.env`.
- La dirección utiliza MongoDB local, por lo que no necesita credenciales si la instalación local no tiene autenticación habilitada.

## 6. Configurar Prisma

Desde la raíz del proyecto, ejecutar:

### Generar Prisma Client

```bash
npx prisma generate
```

Este comando genera el cliente que utiliza la aplicación para comunicarse con MongoDB.

### Sincronizar el esquema con MongoDB

```bash
npx prisma db push
```

Este comando sincroniza los modelos definidos en `prisma/schema.prisma` con la base de datos.

La base de datos `peliculas_db` se creará cuando MongoDB reciba las primeras escrituras.

**Nota:** `db push` sincroniza la estructura, pero no importa los registros existentes en la base de datos del equipo de otro integrante.

## 7. Ejecutar el proyecto

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

Si todo funciona correctamente, aparecerá un mensaje similar a:

```text
Servidor escuchando en http://localhost:3000
```

## 8. Comprobar que la API funciona

Abrir el navegador y visitar:

[http://localhost:3000/](http://localhost:3000/)

La respuesta esperada es:

```json
{
  "message": "API de Gestión de Medios funcionando"
}
```

A partir de ese momento se pueden probar los endpoints de la API utilizando Postman.

## 9. Resumen de comandos

Una vez instalados y configurados Node.js, Git y MongoDB, los comandos para preparar el proyecto son:

```bash
git clone https://github.com/Carolina-H-8/CasoDeEstudioPeliculas.git

cd CasoDeEstudioPeliculas

npm ci

npx prisma generate

npx prisma db push

npm run dev
```

Recuerda que antes de ejecutar Prisma debes haber creado el archivo `.env` y configurado el replica set `rs0`.

## 10. Solución de problemas frecuentes

### Error: Environment variable not found: DATABASE_URL

Prisma no encuentra la variable de conexión.

Solución:

1. Comprobar que `.env` esté en la raíz del proyecto.
2. Verificar que no tenga la extensión `.txt`.
3. Comprobar que contenga `DATABASE_URL`.
4. Ejecutar nuevamente `npx prisma generate`.

### Error de conexión con MongoDB

Comprobar que el servicio esté activo:

```powershell
Get-Service MongoDB
```

También se puede comprobar si el puerto está disponible:

```powershell
Test-NetConnection 127.0.0.1 -Port 27017
```

### Error relacionado con el replica set

Abrir `mongosh` y ejecutar:

```javascript
rs.status()
```

Verificar que el replica set se llame `rs0` y que el nodo esté en estado `PRIMARY`.

### Error al ejecutar npm ci

Comprobar que Node.js y npm estén instalados:

```bash
node -v
npm -v
```

Si no se encuentra Node.js, revisar su instalación y las variables de entorno de Windows.

## 11. Estructura general del proyecto

```text
CasoDeEstudioPeliculas/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── controllers/
│   ├── lib/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── index.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 12. Consideraciones para trabajar en equipo

- No subir `node_modules/` al repositorio.
- No subir el archivo `.env`.
- Mantener actualizado `package-lock.json` cuando se modifiquen las dependencias.
- Utilizar las mismas versiones de Prisma y `@prisma/client`.
- Cada integrante debe tener MongoDB instalado y configurado localmente.
- Para compartir los registros existentes, se debe realizar una exportación e importación de MongoDB; clonar el repositorio no copia los datos.

---

**Tecnologías utilizadas:** Node.js · Express · Prisma ORM · MongoDB · JavaScript