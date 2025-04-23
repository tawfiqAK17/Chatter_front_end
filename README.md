# Chatter - Front End

This is the front-end component of the Chatter application, built with React.

## Technologies Used

- JavaScript
- React
- Socket.IO Client (for real-time messaging)
- Axios (for API requests)

## Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:
   ```
   npm install
   ```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```
VITE_SERVER_URL=http://localhost:3000
```

Replace the URL with your back-end server URL.

## Running the Application

To start the development server:

```
npm run dev
```

## Building for Production

```
npm run build
```

## Features

- Real-time messaging using Socket.IO
- User authentication
- Message history
- Responsive design
