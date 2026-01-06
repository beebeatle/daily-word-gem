export interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "2026-01-06.1100",
    date: "January 6, 2026",
    changes: [
      "Added new 'Moods & Mindfulness' word category with 7 curated words",
    ],
  },
  {
    version: "2026-01-06.1000",
    date: "January 6, 2026",
    changes: [
      "Fixed bug: saved category filter now correctly applies on page load/refresh",
    ],
  },
  {
    version: "2026-01-05.1000",
    date: "January 5, 2026",
    changes: [
      "Added localStorage persistence for word category filter for guest users",
    ],
  },
  {
    version: "2026-01-04.1730",
    date: "January 4, 2026",
    changes: [
      "Added incremental build number to version format",
      "Added Changelog page to track build history",
      "Improved unique visitor tracking using persistent localStorage",
      "Added visitor_id column for accurate unique visitor counts",
    ],
  },
  {
    version: "2026-01-04.1700",
    date: "January 4, 2026",
    changes: [
      "Added version number display in footer",
      "Version updates automatically with each build",
    ],
  },
  {
    version: "2026-01-04.1630",
    date: "January 4, 2026",
    changes: [
      "Added 'Unique Words Displayed' statistic card",
      "Created word_displays table for accurate tracking",
      "Added Recent Word Displays table in About page",
    ],
  },
  {
    version: "2026-01-04.1600",
    date: "January 4, 2026",
    changes: [
      "Added Table of Contents navigation to About page",
      "Added user testimonials section",
      "Added Usage Statistics section with live data",
    ],
  },
  {
    version: "2026-01-04.1500",
    date: "January 4, 2026",
    changes: [
      "Created About page with mission statement",
      "Added About link to navigation",
    ],
  },
  {
    version: "2026-01-04.1400",
    date: "January 4, 2026",
    changes: [
      "Added activity tracking for Pronunciation button",
      "Added activity tracking for dropdown selections",
      "Improved activity logging system",
    ],
  },
  {
    version: "2026-01-03",
    date: "January 3, 2026",
    changes: [
      "Initial release of Word Delight",
      "Word of the day feature with shuffle",
      "User authentication system",
      "Word preferences by category",
      "Activity logging for admin users",
    ],
  },
];
