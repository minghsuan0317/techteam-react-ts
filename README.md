# TeachTeam<br>(React + TypeScript client-side web prototype)

This is the front-end prototype for the TeachTeam system.
It is built with **React + TypeScript** and uses **Chakra UI** for styling.

🎓 This project is **Assignment 1** for the RMIT course:
- COSC2938: Full Stack Development

👥 This project is developed by:
- **s4055813:** Ming Hsuan Chen (Ming)
- **s3989875:** Zih Han Liao (Arina)

✅ This project follows all assignment rules:
- No JavaScript
- No database
- No pre-built templates
- Only uses client-side code

## 🔧 Tech Stack

- [Next.js](https://nextjs.org/) (React framework)
- [TypeScript](https://www.typescriptlang.org/)
- [Chakra UI](https://chakra-ui.com/) (UI Component Library)
- [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) (Unit Testing)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) (Data storage)

## 👤 Roles & Access

- **Tutor**: Aspiring tutor can log in and fill out a form to apply for a tutor position.

- **Lecturer**: Academic staff can log in to see all tutor applications and manage them.

## 📚 Key Features

- **Tutor**:

  - Role-based redirection after login
  - Apply for casual tutor roles:
    - Select course from pre-defined list
    - Input and validate: academic credentials, availability (Part Time / Full Time), skills, previous experience

- **Lecturer**:

  - Role-based redirection after login
  - Filter applicants by: Course, Name, Availability, Skills
  - Sort applicants by course, name and availability
  - Select candidates to shortlist
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

Implemented using Jest + React Testing Library.

Test files are located in: `src/tests/`

### How to run tests:
```bash
npm run test
```

## 🗂️ Project Structure

- `components/` – Reusable UI components (Header, Footer, Hero, Layout, Main, Navigation, ApplicantCard)
- `pages/` – Routing pages (index, login, signup, lecturer, tutors)
- `tests/` – Unit tests
- `theme` – Chakra UI theme configuration
