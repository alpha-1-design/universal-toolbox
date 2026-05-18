# Contributing to Universal Toolbox

Thank you for your interest in contributing to the **Universal Toolbox**! We are a community-driven project aimed at curating the best tools on the web.

## How Can I Help?

### 1. Adding New Tools
This is the most impactful way to contribute!
*   Locate the appropriate data file in `frontend/src/data/` (e.g., `tools1.js`).
*   Add your tool following the existing schema:
    ```javascript
    {
      id: 1234, // Increment from previous
      name: "Your Tool",
      url: "https://example.com",
      category: "dev",
      tags: ["productivity", "code"],
      color: "#FF5500",
      free: true,
      desc: "A brief description."
    }
    ```

### 2. Reporting Bugs
*   Check existing issues first.
*   Provide clear reproduction steps and browser environment details.

### 3. Pull Requests
1.  Fork the repo and create your feature branch.
2.  Follow the existing React + Tailwind code style.
3.  Ensure your changes don't break the PWA functionality or mobile responsiveness.
4.  Submit your PR with a clear description of changes.

## Engineering Standards

*   **Performance:** All components should be optimized for mobile speed and accessibility.
*   **Privacy:** Never add scripts that track user behavior or send local data to external servers.
*   **Clean Data:** Ensure all URLs are active and descriptions are concise.

Happy coding!
