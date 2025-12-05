# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Significance Mirror** is a daily reflection app built to help users recognize their significance by reflecting on two daily questions:
1. Who they helped or positively impacted today
2. Who supported or encouraged them today

The app is a single-page React application with a calm, contemplative user experience featuring serif typography, muted colors, and gentle animations.

## Technology Stack

- **Framework**: Vite + React 18 + TypeScript
- **UI Library**: shadcn/ui (Radix UI components)
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: React hooks with localStorage persistence
- **Routing**: React Router v6
- **Data Querying**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation

## Development Commands

```bash
# Install dependencies
npm i

# Start development server (runs on http://[::]:8080)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Run linter
npm run lint

# Preview production build
npm run preview
```

## Architecture

### State Management Pattern

The app uses a **custom hook pattern** for state management centered around `useReflections` hook:
- All reflection data is stored in localStorage under key `significance-mirror-data`
- State includes: reflections array and onboarding status
- Data persists automatically via useEffect whenever state changes
- Reflections are keyed by ISO date string (YYYY-MM-DD) for daily uniqueness

### Screen Flow Architecture

The main `Index` page (`src/pages/Index.tsx`) orchestrates a state machine with 5 screens:
1. **welcome** - First-time onboarding screen
2. **question1** - "Who did you help today?"
3. **question2** - "Who supported you today?"
4. **summary** - Review/edit before saving (MirrorSummary component)
5. **history** - View all past reflections

Screen transitions are managed through local state in Index component. The app checks for existing reflections on mount and routes accordingly:
- No onboarding completed → welcome screen
- Onboarding complete + no today's reflection → question1
- Onboarding complete + today's reflection exists → history screen

### Component Structure

**Feature Components** (in `src/components/`):
- `WelcomeScreen` - Onboarding landing page
- `ReflectionQuestion` - Reusable question input screen (handles both Q1 and Q2)
- `MirrorSummary` - Shows completed reflection with edit capability
- `ReflectionHistory` - Lists all past reflections chronologically
- `NavLink` - Custom navigation component

**UI Components** (in `src/components/ui/`):
- Full shadcn/ui component library imported
- Components are pre-configured through `components.json`
- Custom button variant "warm" is used throughout for branded styling

### Data Model

```typescript
interface Reflection {
  date: string;              // ISO date (YYYY-MM-DD) - unique key
  helpedPerson: string;      // Answer to Q1
  helpedDescription: string; // Duplicate of helpedPerson (legacy)
  supportedBy: string;       // Answer to Q2
  createdAt: string;         // Full ISO timestamp
}
```

### Path Aliases

The project uses TypeScript path aliases configured in `vite.config.ts` and `tsconfig.json`:
- `@/` maps to `src/`
- Use `@/components`, `@/hooks`, `@/lib` for imports

## Important Development Notes

### Working with Reflections

- Only ONE reflection per day is allowed (enforced by date key)
- Saving a new reflection for today OVERWRITES any existing one
- Use `getTodaysReflection()` to check if user has reflected today
- Reflections are automatically sorted newest-first when saved

### shadcn/ui Integration

This project uses shadcn/ui components. To add new components:
```bash
npx shadcn@latest add <component-name>
```

Configuration is in `components.json` with:
- Style: default
- Base color: slate
- CSS variables: enabled
- TypeScript: enabled

### Styling Conventions

The app uses custom Tailwind typography tokens:
- `text-display` - Large serif headings
- `text-body-lg` - Body copy
- `text-small` - Small text
- `font-serif` - Serif font family
- Custom animation: `animate-gentle-fade`

Button variant `warm` is the primary branded button style.

### localStorage Key

All app data is stored under: `significance-mirror-data`

Never change this key as it would lose all user data.

## Project Context

This project was initially created through Lovable.dev (a no-code React builder). The codebase is fully editable as standard React/TypeScript. The `lovable-tagger` plugin in dev mode adds metadata for Lovable integration but doesn't affect production builds.
