# TeachTeam<br>(React + TS client-side web prototype)

This project is **Assignment 1** for **COSC2938 Further Web Programming** course at RMIT. It's a front-end prototype for the TeachTeam system, built using **React + TypeScript** and styled with **Chakra UI**. All data is stored in **localStorage**, and the project follows all the assignment requirements.

## 🔗 Github URL
https://github.com/rmit-fsd-2025-s1/s4055813-s3989875-a1.git

## 👥 Team Members & Contributions

- **s4055813** Ming Hsuan Chen (Ming)
  - Styling and content of pages
  - Lecturer Dashboard page
  - Additional features for lecturers (filters, sort, visual summary)
  - Unit tests (`ApplicantCard`)
  - Write `README.md` and organize project structure.

- **s3989875** Zih Han Liao (Arina)
  - Sign-up & Sign-in flow
  - Tutor application page
  - Visual representation section
  - Unit tests (`login`, `signup`)


## 🔧 Tech Stack

- [Next.js](https://nextjs.org/) + [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Chakra UI](https://chakra-ui.com/) (UI Component Library)
- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) (Unit Testing)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) (Data storage)

## 👤 Roles

- **Tutor**: Aspiring tutor can log in and fill out a form to apply for a tutor position.

- **Lecturer**: Lecturer can log in to see all tutor applications and manage them.

## 📚 Key Features

- **Tutor**:

  - Role-based redirection after login
  - Apply for casual tutor roles:
    - Select course from pre-defined list
    - Input and validate: academic credentials, availability (Part Time / Full Time), skills, previous experience

- **Lecturer**:

  - Role-based redirection after login
  - Filter applicants by course, availability, skills and name
  - Sort applicants by course and availability
  - Select applicants to confirmed section
    - Assign rankings (1–10)
    - Add comments
    - Confirm selections
  - View visual summary of applicants


## ▶️ How to Run

### Step 1: Clone this repository
```bash
git clone https://github.com/rmit-fsd-2025-s1/s4055813-s3989875-a1.git
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Start the development server
```bash
npm run dev
```
Open your browser at: http://localhost:3000

### Step 4: Use dummy user account to log in
**Tutor:**
- email: `tutor@example.com`
- Password: `Password123!`

**Lecturer:**
- email: `lecturer@example.com`
- Password: `Password567!`



## 🧪 Unit Tests

Implemented using **Jest + React Testing Library**.

Test files are located in: `src/tests/`

### How to run tests:
```bash
npm run test
```

## 🗂️ Project Structure

- `components/` – Reusable UI components (Header, Footer, Hero, Layout, Main, Navigation, ApplicantCard)
- `data/` – Contains data of mock users and applications  (used to initialize localStorage)
- `pages/` – Routing pages (index, login, signup, lecturer, tutor)
- `tests/` – Unit tests for ApplicantCard, signup and login
- `theme` – Chakra UI theme configuration
