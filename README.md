# README - Task Manager Frontend

## Enlace a la Aplicación Desplegada
[Enlace a la aplicación desplegada](https://client-coally.vercel.app/)

---

## Pasos para Instalar y Ejecutar el Proyecto Localmente

### 1. Clonar el Repositorio
```bash
$ git clone https://github.com/Yohaan2/client-coally.git
$ cd client-coally
```

### 2. Instalar Dependencias
Asegúrate de tener Node.js y npm instalados. Luego, ejecuta:
```bash
$ yarn 
```

### 3. Configurar las Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
```env
VITE_HOST_API=http://localhost:3001
```

### 4. Iniciar la Aplicación
Ejecuta el siguiente comando:
```bash
$ yarn run dev
```
La aplicación estará disponible en `http://localhost:5173`.

---

## Descripción de la Aplicación

### Pantalla Principal
- **Listado de Tareas**: Muestra todas las tareas con su:
  - Título
  - Estado (pendiente o completada)
  - Fecha de creación
- **Botones de Acción**:
  - Editar una tarea
  - Eliminar una tarea

### Formulario
- Permite agregar nuevas tareas proporcionando:
  - Título
  - Descripción
  - Estado inicial

### Filtros
- **Opciones de Filtrado**:
  - Tareas completadas
  - Tareas pendientes
  - Todas las tareas

### Diseño
- **Responsivo**: Adaptado para dispositivos móviles y de escritorio.

---

## Tecnologías Utilizadas

### Frontend
- React
- Tailwind CSS
- TanStack Query

