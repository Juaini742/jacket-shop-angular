# JACKETID

Welcome to JACKETID, your ultimate destination for a wide variety of jackets, coats, blazers, and similar outerwear from various top brands. Our platform offers a seamless shopping experience, ensuring you find the perfect outerwear to suit your style and needs.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Demo

click [here to see demo](https://jacketid.vercel.app/)

![Juaini](/preview.png)

## Overview

JACKETID is an e-commerce application dedicated to providing an extensive collection of jackets, blazers, and related outerwear from numerous reputable brands. Whether you're looking for a casual jacket, a formal blazer, or a warm winter coat, JACKETID has you covered. Our goal is to offer a diverse range of styles, sizes, and colors to cater to every customer’s preferences.

---

## Getting Started And Installation

To get started with the JACKETID, follow these steps:

1. Clone the repository: git clone https://github.com/Juaini742/jacket-shop-angular.git
2. Install dependencies:

```sh
cd frontend
```

```sh
npm install
```

```sh
cd backend
```

```sh
npm install
```

3. Run database migrations and seeders (backend):

```sh
npx prisma migrate dev --name init
```

4. Run the server:

```sh
npm start
```

5. Run the client:

```sh
npm start
```

## Folder Structure Front-End (React Native)

```
front-end/
src/
├── app/
│   ├── component/
│   ├── environments/
│   ├── guards/
│   ├── layouts/
│   ├── modules/
│   ├── pipes/
│   ├── services/
├── assets/
│   ├── images/
└── interfaces/
```

### Directory Descriptions

#### `src/app/component`

This directory contains all the Angular components needed for the application. Each component should have its own folder containing the `.ts`, `.html`, and `.scss` (or `.css`) files.

#### `src/app/environments`

This directory holds environment configuration files (`environment.ts` and `environment.prod.ts`) that are used to manage different settings for development and production environments.

#### `src/app/guards`

This directory contains the authentication guard files. These guards are used to protect routes from unauthorized access and ensure that only authenticated users can access certain parts of the application.

#### `src/app/layouts`

This directory includes layout components such as the navbar and footer, which are shared across multiple pages of the application.

#### `src/app/modules`

This directory is for organizing the application into feature modules. Each feature module can encapsulate related components, services, and other code.

#### `src/app/pipes`

This directory contains custom pipes that transform data in the template. Pipes are used for formatting and transforming data before displaying it in the view.

#### `src/app/services`

This directory includes all service files. Services are used for handling business logic, data retrieval, and communication with backend APIs.

#### `src/assets/images`

This directory holds all image assets used in the application. It includes logos, icons, and other image files.

#### `src/interfaces`

This directory contains all TypeScript interfaces used for type definitions throughout the application. Interfaces help in ensuring type safety and consistency.

## Additional Files

- **`src/index.html`**: The main HTML file that loads the Angular application.
- **`src/main.ts`**: The main entry point for the Angular application.
- **`src/styles.scss`**: The global styles file for the application.
- **`angular.json`**: The configuration file for Angular CLI.
- **`package.json`**: The npm configuration file containing project dependencies and scripts.
- **`README.md`**: The main README file containing information about the project.

---

## Folder Structure Back-End (ExpressJs)

```
backend/
├── prisma/
│   ├── migrations/
│   │   └── ... # Migration files
│   ├── schema.prisma # Prisma Schema
├── src/
│   ├── controller/
│   │   └── ... # Controller files
│   ├── middleware/
│   │   └── ... # Middleware files
│   ├── router/
│   │   └── ... # Route files
│   ├── utilities/
│   │   └── ... # Utility files
│   ├── index.ts # Main server file
│   └── seed.ts # Seed data script
├── package.json # Package file
├── tsconfig.json # TypeScript configuration
└── ... # Other root-level files (e.g., README.md, .env)
```

## Contributing

We welcome contributions from the community! If you find any issues or have suggestions for improvements, feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. Feel free to use, modify, and distribute the code as per the terms of the license.

## Contact

If you have any questions or feedback, please contact us at juaini742@gmail.com.

---
