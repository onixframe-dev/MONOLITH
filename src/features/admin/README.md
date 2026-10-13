# Admin / CRM feature boundary

Admin navigation is defined in `navigation.ts`. Future CRM code should be grouped here by domain, for example `leads/`, `clients/`, `projects/`, and `activity/`, while the shared layout remains in `components/AdminFrame.tsx`.

This keeps operational modules separate from public-site components and allows each module to own its types, server actions, and UI.
