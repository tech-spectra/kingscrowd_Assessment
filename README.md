# KingsCrowd Crowdfunding Deals Explorer

A modern, professional Nuxt.js application for exploring active public fundraising opportunities from Reg CF and Reg A+ crowdfunding platforms. Built with Vue 3, TypeScript, and Shadcn UI components.

## 📋 Assessment Summary

**What I Built:** A Nuxt 3 application that displays active Reg CF and Reg A+ crowdfunding deals in a sortable, paginated table with CSV export functionality. The app fetches data from the KingsCrowd API via a secure server route, handles all loading/error/empty states, and provides a professional user experience.

## 💻 Demo 

![Assessment Demo](public/demo.gif)

## 🚀 Features


- **📊 Interactive Data Table**: View active crowdfunding deals with sortable columns
- **🔍 Advanced Sorting**: Sort by Money Raised and Valuation columns
- **📄 Pagination**: Navigate through multiple pages of deals with URL synchronization
- **📥 CSV Export**: Export current page data to CSV with proper formatting
- **🎨 Professional UI**: Built with Shadcn UI components and Tailwind CSS
- **⚡ Real-time Error Handling**: Comprehensive error handling with toast notifications
- **🔄 Loading States**: Beautiful skeleton loaders during data fetching
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/) - The Intuitive Vue Framework
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom theme variables
- **UI Components**: Shadcn UI (Vue port)
- **Icons**: Nuxt Icon with Heroicons
- **Toast Notifications**: Vue Toastification
- **State Management**: Vue 3 Composition API

## 📋 Prerequisites

- Node.js 18+ and npm
- KingsCrowd API key

## 🔧 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Nuxt
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   KINGS_CROWD_API_KEY=your_api_key_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 🏗️ Project Structure

```
├── assets/
│   └── css/
│       └── tailwind.css              # Global styles and theme variables
├── components/
│   ├── common/                       # Common reusable components
│   │   ├── FooterLink.vue            # Footer link component
│   │   └── SocialLink.vue            # Social media link component
│   ├── kingscrowd/                   # Application-specific components
│   │   ├── CrowdfundingTable.vue     # Main table component
│   │   ├── CrowdfundingTableSkeleton.vue  # Loading skeleton loader
│   │   ├── EmptyState.vue            # Empty state component
│   │   ├── TableHeaderSection.vue    # Reusable table header section
│   │   ├── TableSearchInput.vue      # Search input component
│   │   ├── TableSortButton.vue       # Reusable sort button component
│   │   ├── DealsTableRow.vue         # Individual table row component
│   │   └── DealsPagination.vue       # Pagination component
│   ├── layout/                       # Layout components
│   │   ├── AppHeader.vue             # Application header component
│   │   └── AppFooter.vue             # Application footer component
│   └── ui/                           # Shadcn UI components
│       ├── button/
│       │   └── Button.vue            # Button component
│       ├── pagination/
│       │   ├── Pagination.vue        # Pagination container
│       │   ├── PaginationContent.vue # Pagination content wrapper
│       │   ├── PaginationItem.vue    # Pagination item wrapper
│       │   ├── PaginationLink.vue    # Pagination link/button
│       │   ├── PaginationPrevious.vue # Previous page button
│       │   ├── PaginationNext.vue    # Next page button
│       │   └── PaginationEllipsis.vue # Ellipsis indicator
│       ├── skeleton/
│       │   └── Skeleton.vue          # Skeleton loader component
│       └── table/
│           ├── Table.vue             # Table container
│           ├── TableHeader.vue       # Table header wrapper
│           ├── TableBody.vue         # Table body wrapper
│           ├── TableRow.vue          # Table row component
│           ├── TableHead.vue         # Table header cell
│           └── TableCell.vue         # Table data cell
├── composables/                      # Reusable composables (auto-imported)
│   ├── useApiError.ts                # Error handling composable
│   ├── useDealsPagination.ts         # Pagination logic composable
│   ├── useDealsData.ts               # Data fetching composable
│   ├── useTableSort.ts               # Table sorting composable
│   ├── useTableSearch.ts             # Table search/filter composable
│   ├── useCsvExport.ts               # CSV export composable
│   └── useErrorMessages.ts           # Error message formatting composable
├── constants/
│   └── deals.ts                      # Centralized constants (CSV headers, thresholds)
├── utils/                            # Utility functions
│   ├── csvUtils.ts                   # CSV formatting utilities
│   └── errorUtils.ts                 # Error normalization utilities
├── lib/
│   └── utils.ts                      # General utility functions (cn helper)
├── layouts/
│   └── default.vue                   # Default layout with header/footer
├── pages/
│   └── index.vue                     # Main page component
├── plugins/
│   ├── toastification.client.ts      # Vue Toastification plugin
│   └── suppress-warnings.client.ts   # Console warnings suppression plugin
├── public/                           # Static assets
│   ├── favicon.ico                   # Site favicon
│   └── robots.txt                    # Robots.txt file
├── server/
│   ├── api/
│   │   └── deals.ts                  # API endpoint for fetching deals
│   └── tsconfig.json                 # TypeScript config for server
├── types/                            # TypeScript type definitions
│   ├── deals.d.ts                    # Deals data type definitions
│   └── response.d.ts                 # API response type definitions
├── error.vue                         # Global error page component
├── nuxt.config.ts                    # Nuxt configuration
├── tailwind.config.js                # Tailwind CSS configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json                      # Project dependencies and scripts
```

## 📖 Usage

### Viewing Deals

1. Navigate to the home page to see active crowdfunding deals
2. The table displays:
   - Raise Name
   - Raise Status
   - Platform
   - Money Raised (sortable)
   - Valuation (sortable)

### Sorting

- Click on the "Money Raised" or "Valuation" column headers to sort
- Click again to toggle between ascending and descending order
- Visual indicators show the current sort column and direction

### Pagination

- Use the pagination controls at the bottom of the table
- Page numbers are synchronized with the URL
- Browser back/forward buttons work correctly
- The current page is highlighted

### Exporting Data

- Click the "Export to CSV" button to download the current page's data
- The CSV file includes all visible columns
- Files are named with the current page number: `crowdfunding_deals_page_X.csv`
- Excel-compatible format with UTF-8 BOM

## 🔐 API Configuration

The application requires a valid KingsCrowd API key. Set it in your `.env` file:

```env
KINGS_CROWD_API_KEY=your_api_key_here
```

The API endpoint filters for:

- **Status**: Active deals only
- **Type**: RegCF and RegA+ crowdfunding opportunities

## 🎨 Theming

The application uses a custom theme with CSS variables defined in `assets/css/tailwind.css`. The primary color is `#4339CB` (indigo), which can be customized by modifying the CSS variables.

### Theme Variables

- `--primary`: Primary brand color
- `--primary-hover`: Hover state for primary color
- `--destructive`: Error/destructive actions color
- `--muted`: Muted background colors
- `--border`: Border colors

## 🐛 Error Handling

The application includes comprehensive error handling:

- **401 Unauthorized**: Invalid or missing API key
- **404 Not Found**: Resource not found
- **429 Too Many Requests**: Rate limiting
- **500 Server Error**: Internal server errors
- **HTML Responses**: Detects and handles authentication failures

All errors are displayed via toast notifications with user-friendly messages.

## 🧪 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build

### Code Style

- TypeScript for type safety
- Vue 3 Composition API
- JSDoc comments for functions
- Consistent naming conventions
- Professional code organization

## 📝 Key Components & Architecture

### Component Organization

The application follows a well-organized component structure:

- **`components/common/`**: Shared reusable components used across the application (e.g., FooterLink, SocialLink)
- **`components/layout/`**: Layout-specific components (AppHeader, AppFooter)
- **`components/kingscrowd/`**: Application-specific business logic components
- **`components/ui/`**: Shadcn UI base components (buttons, tables, pagination, etc.)

### Components

#### AppHeader

Application header component with responsive logo and navigation.

#### AppFooter

Application footer component with:

- Company logo
- Navigation links
- Social media links
- Legal links
- Copyright information

#### CrowdfundingTable

The main table component that displays deals with:

- Sortable columns
- Pagination controls
- CSV export functionality
- Responsive design

#### TableSortButton

Reusable sort button component for table headers with visual indicators.

#### DealsTableRow

Individual table row component that handles formatting and conditional styling.

#### DealsPagination

Reusable pagination component with ellipsis support and page navigation.

#### TableHeaderSection

Reusable header section component for tables that displays:

- Title and optional description
- Action buttons via slot
- Consistent styling across table views

### Composables

#### useDealsPagination

Handles pagination logic including:

- Page state management
- URL synchronization
- Page validation
- Auto-correction of invalid pages

#### useDealsData

Manages deals data fetching with:

- API integration
- Data validation and normalization
- Error handling
- Loading state management

#### useTableSort

Provides reusable sorting logic:

- Sort state management
- Toggle functionality
- Column and direction tracking

#### useCsvExport

Handles CSV export functionality:

- Data formatting
- File generation
- Download triggers
- Toast notifications

#### useApiError

Centralized error handling that:

- Normalizes error structures
- Displays toast notifications
- Handles various HTTP status codes
- Provides user-friendly error messages

#### useErrorMessages

Formats error messages based on status codes for user-friendly display.

### Utilities

#### csvUtils

CSV formatting utilities:

- Field escaping
- CSV conversion
- File download helpers

#### errorUtils

Error normalization utilities:

- Error structure normalization
- HTML response detection

### Server API

#### Deals API Endpoint

Server-side API endpoint that:

- Fetches data from KingsCrowd API
- Handles pagination
- Validates responses
- Detects authentication failures
- Returns formatted error responses

## 🔄 State Management & Architecture

The application uses Vue 3's Composition API for state management with a modular, reusable architecture:

### State Management

- **Reactive State**: `ref()` and `computed()` for reactive data
- **URL Synchronization**: Query parameters sync with pagination state
- **Error State**: Centralized error handling with watchers
- **Loading State**: Skeleton loaders during data fetching

### Code Organization

- **Composables**: Reusable logic extracted into composables for better maintainability
- **Components**: Small, focused components following single responsibility principle
- **Utilities**: Pure functions for common operations (CSV, error handling)
- **Constants**: Centralized configuration values
- **Type Safety**: Full TypeScript support with proper interfaces

### Best Practices

- **Separation of Concerns**: Each file has a single, clear responsibility
- **DRY Principle**: No code duplication, reusable composables and utilities
- **Type Safety**: TypeScript interfaces and types throughout
- **Documentation**: JSDoc comments on all functions and composables
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables

Ensure your production environment has:

- `KINGS_CROWD_API_KEY` set in environment variables

### Recommended Hosting

- Vercel
- Netlify
- AWS Amplify
- Any Node.js hosting platform

## 📄 License

This project is proprietary software.

## 👥 Contributing

This is a private project. For issues or questions, please contact the development team.

## 🙏 Acknowledgments

- [KingsCrowd](https://kingscrowd.com/) for providing the API
- [Nuxt.js](https://nuxt.com/) for the amazing framework
- [Shadcn UI](https://ui.shadcn.com/) for the component library
- [Vue Toastification](https://vue-toastification.maronato.dev/) for toast notifications

---

Built with ❤️ using Nuxt 3 and Vue 3
