# 🏥 Patient Sync

A real-time patient registration dashboard built with **Next.js**, **React**, **Tailwind CSS**, and **WebSockets**.

Patient Sync simulates a digital hospital registration workflow where a patient fills out a registration form while hospital staff monitor the process live in real time. Every interaction—from typing into a field to successful registration—is synchronized instantly between both dashboards.

---

# 🌐 Live Demo

**Vercel Deployment**

https://patient-sync-jh74xh4sh-abhi-ghoshs-projects.vercel.app

---

# ✨ Key Features

- 🔄 Real-time synchronization using WebSockets
- 🩺 Live Staff Monitor dashboard
- 📝 Patient registration form
- ✅ Real-time field validation
- 📊 Live completion percentage
- 🎯 Active field tracking
- ⚠️ Validation error monitoring
- 📱 Responsive desktop and mobile layouts
- 🌙 Dark / Light mode
- 📡 Live patient activity status
- 📈 Live statistics dashboard
- 🎉 Registration success workflow

---

# 📸 Screenshots

## Desktop (Light)

![Desktop Light](./assets/desktoplight.webp)

---

## Desktop (Dark)

![Desktop Dark](./assets/desktopdark.webp)

---

## Mobile (Light)

![Mobile Light](./assets/mobilelight.webp)

---

## Mobile (Dark)

![Mobile Dark](./assets/mobiledark.webp)

---

## Real-time Activity Tracking

Shows the Staff Monitor updating instantly as the patient fills out the registration form.

![Realtime Tracking](./assets/realtimetracking.webp)

---

## Staff Monitoring Dashboard

Displays synchronized patient information, validation state, completion progress and activity status.

![Realtime Tracking 2](./assets/realtimetracking2.webp)

---

## Live Statistics

Live counters displaying required fields, validation errors and optional field completion.

![Statistics](./assets/stats.webp)

---

# 🛠️ Technologies Used

## Frontend

- Next.js 16
- React 19
- JavaScript (ES6+)
- Tailwind CSS
- Lucide React

## Real-time Communication

- Native WebSocket API
- Node.js WebSocket Server

## Development Tools

- Git
- GitHub
- Vercel
- VS Code

---

# 🚀 Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/abhi-ghosh/patient-sync.git
```

## 2. Navigate into the project

```bash
cd patient-sync
```

## 3. Install dependencies

```bash
npm install
```

## 4. Start the Next.js development server

```bash
npm run dev
```

The application will be available at:

```
http://localhost:3000
```

---

# 🔌 Running the WebSocket Server

Patient Sync uses a WebSocket server to synchronize both dashboards in real time.

Open a second terminal and navigate to the server location.

Run:

```bash
node server.js
```

The server starts on:

```
ws://localhost:8080
```

With both the Next.js application and WebSocket server running, open two browser windows (or devices) to observe real-time synchronization between the Patient Registration form and the Staff Monitor.

---

# 💻 Project Structure

```
patient-sync
│
├── app/
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
│
├── components/
│   ├── Data.jsx
│   ├── Navbar.jsx
│   ├── MainContent.jsx
│   ├── PatientPanel.jsx
│   ├── StaffPanel.jsx
│   ├── InfoCard.jsx
│   ├── StatCard.jsx
│   ├── SectionHeader.jsx
│   ├── ProgressBar.jsx
│   ├── SubmissionSuccess.jsx
│   └── TypeAnimation.jsx
│
├── assets/
│
├── public/
│
├── package.json
└── README.md
```

The project follows a component-based architecture where reusable UI components are separated by responsibility. Application state is managed centrally and passed to child components through props, making the codebase easier to maintain and extend.

---

# 🎨 UI / UX Design Decisions

The application was designed to resemble a modern hospital registration interface while remaining clean and intuitive.

### Responsive Layout

- Desktop displays the Patient Registration form and Staff Monitor side by side.
- Mobile devices display one panel at a time for improved usability.
- Consistent spacing and typography improve readability across all screen sizes.

### Form Validation

- Required fields are clearly marked.
- Validation occurs in real time.
- Invalid fields display descriptive error messages.
- Successfully completed fields receive green confirmation styling.

### Staff Dashboard

The Staff Monitor provides immediate visual feedback through:

- Live patient information
- Active field indicator
- Completion percentage
- Validation error count
- Required and optional field statistics
- Patient activity status
- Submission confirmation

Color-coded states help staff quickly understand patient progress without refreshing the page.

---

# 🧩 Component Architecture

The application is composed of reusable React components, each with a single responsibility.

| Component         | Responsibility                                    |
| ----------------- | ------------------------------------------------- |
| PatientPanel      | Registration form, validation and submission      |
| StaffPanel        | Displays synchronized patient information         |
| Navbar            | Branding and theme toggle                         |
| MainContent       | Responsive application layout                     |
| InfoCard          | Individual information display cards              |
| StatCard          | Dashboard statistics                              |
| SectionHeader     | Reusable section headers                          |
| ProgressBar       | Form completion indicator                         |
| SubmissionSuccess | Registration completion screen                    |
| TypeAnimation     | Indicates the field currently being edited        |
| Data              | Shared configuration, default state and constants |

This modular architecture keeps components reusable, maintainable and easy to extend.

---

# 🔄 Real-Time Synchronization Flow

The application uses the native browser WebSocket API for real-time communication.

### Patient Dashboard

Whenever the patient interacts with the registration form:

- Form values are updated.
- Validation runs instantly.
- Completion percentage is recalculated.
- The active field is tracked.
- Updated data is packaged into a payload and sent to the WebSocket server.

### WebSocket Server

The server receives incoming updates and immediately broadcasts them to all connected clients.

### Staff Dashboard

The Staff Monitor listens for incoming WebSocket messages and updates automatically without requiring page refreshes.

The synchronized data includes:

- Form values
- Active input field
- Validation errors
- Completion percentage
- Patient activity status
- Submission state
- Submission timestamp

This provides staff with a live view of the registration process as it happens.

---

# 🎯 Application Workflow

1. The patient begins filling out the registration form.
2. Input is validated in real time.
3. Every update is transmitted through WebSockets.
4. The Staff Monitor instantly reflects:
   - Current field being edited
   - Updated patient information
   - Validation errors
   - Completion percentage
   - Activity status
5. After successful submission:
   - The patient sees a registration success screen.
   - The Staff Monitor switches to Submitted mode.
   - The submission time is displayed.

---

# 📚 What I Learned

Building Patient Sync strengthened my understanding of:

- React state management
- Component architecture
- Form validation
- Conditional rendering
- Reusable UI components
- Responsive interface design
- Real-time WebSocket communication
- Synchronizing application state across multiple clients

---

# 👨‍💻 Author

**Abhijit Ghosh**

GitHub: https://github.com/abhi-ghosh
