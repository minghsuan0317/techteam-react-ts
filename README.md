# TeachTeam – Assignment 1

This is the front-end prototype for the TeachTeam system.
It is built with **React + TypeScript** and uses **Chakra UI** for styling.

✅ This version follows all assignment rules:
- No JavaScript
- No database
- Only uses client-side code
- No pre-built templates

👥 This project was built by **Ming** and **Arina**.

---

## 🎨 Styling

We use **Chakra UI** for all styles.
The custom theme is in `theme.tsx`.
It sets:
- Fonts
- Colors (brand color: teal)
- Border radius
- Responsive breakpoints

---

## Project Structure

# `pages/index.tsx`
This is the homepage. It shows:
- `Hero` section (title and description)
- `Main` section (2 cards: Tutor / Lecturer)

# `pages/Lecturer.tsx`
This is the Lecturer Dashboard page.

# `components/Layout.tsx`
This wraps the page layout with a **Header** and **Footer**.

# `components/Header.tsx` + `Navigation.tsx`
This is the top navigation bar. It has:
- Website title
- Menu links (Home, About, Courses)
- Login and Sign up buttons

# `components/Footer.tsx`
Bottom section of all pages.
Shows copyright and academic notice.

# `components/Hero.tsx`
The big title area on the homepage.
It's the first section users see.

# `components/Main.tsx`
The 2 cards in the homepage.
- Left: For Tutor applicants
- Right: For Lecturers

---

