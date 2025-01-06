# POS System (Node.js + NestJS)

Este proyecto tiene como objetivo construir un **sistema POS (Point Of Sale)** usando **NestJS, Sequelize** y **MySQL (o MariaDB)** (inicialmente se planteó Postgres, luego se usó MySQL como ejemplo, pero lo puedes adaptar a Postgres sin problema). Además, cuenta con medidas de seguridad desde el primer despliegue.

## Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Arquitectura Base](#arquitectura-base)
3. [Tecnologías Utilizadas](#tecnologías-utilizadas)
4. [Etapas del Proyecto](#etapas-del-proyecto)
5. [Cómo Ejecutar el Proyecto](#cómo-ejecutar-el-proyecto)
6. [Rutas Implementadas](#rutas-implementadas)
7. [Roadmap Próximas Fases](#roadmap-próximas-fases)
8. [Contribución](#contribución)
9. [Licencia](#licencia)

---

## Descripción General

Este proyecto se centra en la creación de un **sistema de punto de venta** (POS) que exponga una API robusta y escalable. Nuestra prioridad es garantizar la **seguridad** desde el comienzo, implementando:

- **Autenticación y autorización** con JWT.
- **Rate limiting** (limitación de solicitudes).
- **Validación de datos** y protección frente a inyección.

La idea es contar con un **backend** modular y bien organizado.

---

## Arquitectura Base

- **NestJS** para la estructura principal y modularización.
- **Sequelize** como ORM, facilitando la interacción con la base de datos relacional.
- **Base de datos**:
  - Originalmente planeamos PostgreSQL, pero en el proyecto se ilustra con MySQL.
  - La configuración se puede ajustar para Postgres u otros dialectos soportados por Sequelize.
- **JWT** para autenticación y autorización.
- **Decoradores y Guards** para proteger endpoints.
- **Class-Validator** para validacion de datos en los DTO (Data Transfer Object)

---

## Tecnologías Utilizadas

- **Node.js** (versión 18+ recomendada).
- **NestJS** (versión 9 o superior).
- **Sequelize** (para interactuar con la base de datos)
- **JWT** y **Passport** (para seguridad de tokens).
- **bcrypt** para hashear contraseñas.
- **@nestjs/config** para manejar variables de entorno.
- **Winston** (o cualquier otra librería de logs) para la capa de logging.

---

## Etapas del Proyecto

1. **Fase 0**:

   - Creación del repositorio.
   - Inicialización del proyecto Nest con `nest new`.
   - Configuración de `.gitignore`, etc.
   - Preparación del `ConfigModule` y variables de entorno.

2. **Fase 1**:
   - Añadir **seguridad inicial**: CORS, Helmet, Rate limiting.
   - Implementar **AuthModule** para JWT (login/signin básico).
   - Registrar usuarios e inicios de sesión con contraseñas hasheadas.
   - Crear un **guard** JWT que proteja las rutas.

_(Actualmente nos encontramos al cierre de la Fase 1, habiendo implementado el endpoint `/auth/signin`.)_

---

## Cómo Ejecutar el Proyecto

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/0FreddyPuerta1/pos-system.git
   ```
2. **Instalar dependencias**:
   ```bash
   cd pos-system
   npm install
   ```
3. **Configurar variables de entorno**:

```bash
  NODE_ENV=development
  DB_HOST=direccion de tu db
  DB_PORT=3306 (por defecto es este en mysql)
  DB_USERNAME=usuario de tu db
  DB_PASSWORD=contraseña de tu db
  DB_NAME=nombre de tu db
  JWT_SECRET=secreto para JWT
  PORT=Puerto en el que se ejectuta la aplicación
```
