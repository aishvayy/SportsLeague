# Sports League Dashboard

A React-based single-page application that displays sports leagues with filtering and search capabilities. Click on any league card to view its season badge.

## Features

- **League Display**: Shows league name, sport, and alternate name
- **Search Functionality**: Filter leagues by name with real-time search
- **Sport Filter**: Dropdown to filter by specific sports (Soccer, Basketball, etc.)
- **Interactive Cards**: Click league cards to fetch and display season badges (displays error if badge is unavailable)
- **Responsive Design**: Mobile-friendly layout that works on all screen sizes
- **API Caching**: Responses are cached to avoid repeat API calls
- **Loading States**: Visual feedback during data fetching

## How to Run the Project

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Setup

1. **Navigate to the project directory:**
   ```bash
   cd SportsLeague
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
npm run build
```

The built files will be available in the `dist/` directory.

## AI Tools and Design Decisions

### AI Tools Used
- **Claude Sonnet 4**: Used for drafting README documentation, and partially assisting with modularisation decisions
- **Online AI UX**: Used to create the UX of the dashboard
- **Scope**: AI assistance was focused on documentation, user experience considerations, and architectural guidance 

### Technical Architecture Decisions

#### 1. **Component Structure**
- **Modular Design**: Separated concerns into distinct components (SearchBar, SportFilter, LeagueCard)
- **Single Responsibility**: Each component handles one specific functionality
- **Reusability**: Components are designed to be reusable and configurable

#### 2. **Performance Optimizations**
- **Memoization**: Used useMemo for expensive filtering operations
- **Lazy Loading**: Badge images are only fetched when cards are clicked
- **Cached Responses**: All API calls are cached to prevent redundant requests
- **Debounced Search**: Real-time search without excessive API calls

#### 3. **Technology Choices**
- **Vite**: Chosen over Create React App for faster development and better performance
- **Vanilla CSS**: Used instead of CSS-in-JS or frameworks for simplicity and performance
- **Modern JavaScript**: ES6+ features including destructuring, arrow functions, and modules

## API Integration

### Endpoints Used
1. **All Leagues**: `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
2. **Season Badges**: `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=<id>`

### Caching Implementation
- **Memory-based Cache**: Uses JavaScript Map for in-memory caching
- **Cache Keys**: Unique keys for different API endpoints
- **Cache Persistence**: Cache persists for the session duration
- **Cache Management**: Includes methods to clear cache and check cache size

## Project Structure

```
SportsLeague/
├── src/
│   ├── components/
│   │   ├── LeagueCard.jsx     # Individual league card with badge functionality
│   │   ├── SearchBar.jsx      # Search input component
│   │   └── SportFilter.jsx    # Sport dropdown filter
│   ├── services/
│   │   └── api.js            # API service with caching
│   ├── App.jsx               # Main application component
│   ├── App.css              # Comprehensive styling
│   ├── index.css            # Global styles
│   └── main.jsx             # Application entry point
├── index.html               # HTML template
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
