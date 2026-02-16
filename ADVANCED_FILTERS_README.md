# Advanced Filters & Search History Implementation

This document describes the newly implemented advanced filtering and search history features for the portfolio.

## Features Implemented

### 1. Advanced Filters

Three new filter options have been added to the portfolio page:

#### Language Filter
- Filters projects by programming language
- Automatically populated from project data
- Shows count of projects per language

#### Minimum Stars Filter
- Filters projects by minimum GitHub star count
- Numeric input field
- Debounced for performance (300ms delay)

#### Last Updated Filter
- Filters projects by last update date
- Options:
  - Last 7 days
  - Last 30 days
  - Last 3 months
  - Last 6 months
  - Last year
  - Any time (default)

### 2. Search History

- Automatically saves recent searches to browser localStorage
- Displays up to 10 most recent searches
- Click on a saved search to re-run it
- Clear history button to remove all saved searches
- Only saves searches with 2+ characters

### 3. UI Enhancements

- **Toggle Advanced Filters**: Collapsible panel to show/hide advanced filters
- **Clear All Filters**: Button to reset all filters at once (appears when filters are active)
- **Search Stats**: Shows result count when searching
- **Visual Indicators**: Arrow icon rotates when advanced panel is toggled

## Files Modified

### 1. `_layouts/portfolio.html`
- Added advanced filter controls (language, stars, updated)
- Added search history UI
- Added toggle button for advanced filters
- Added clear all filters button
- Added search stats display

### 2. `assets/js/portfolio-app.js`
- Added search history functions:
  - `getSearchHistory()` - Retrieves history from localStorage
  - `saveSearchHistory(query)` - Saves search to history
  - `clearSearchHistory()` - Clears all history
  - `renderSearchHistory()` - Renders history badges
- Updated `filterProjects()` to include advanced filters:
  - Language matching
  - Minimum stars filtering
  - Date-based last updated filtering
- Added `updateSearchStats()` to show result counts
- Added event listeners for all new filter controls
- Added toggle functionality for advanced filters panel
- Added clear all filters functionality

### 3. `assets/js/portfolio-loader.js`
- Added language extraction and population
- Added data attributes for advanced filtering:
  - `data-language`
  - `data-stars`
  - `data-last-updated`

### 4. `_sass/main.scss`
- Added styles for search stats display
- Added styles for advanced filters panel
- Added styles for search history badges
- Added styles for toggle button icon animation
- Added dark mode support for all new elements

### 5. `scripts/sync_portfolio.rb`
- Added `fetch_github_repo_metadata()` function
- Fetches language, stars, and last_updated from GitHub API
- Added rate limiting (0.1s delay between requests)
- Supports GITHUB_TOKEN environment variable for higher rate limits
- Updates portfolio.json with new fields

## Data Requirements

For the advanced filters to work properly, the `portfolio.json` file needs to include these additional fields for each project:

```json
{
  "name": "Project Name",
  "slug": "project-slug",
  "categories": ["Category1", "Category2"],
  "image": "https://...",
  "repo_url": "https://github.com/owner/repo",
  "indexed_content": "...",
  "language": "JavaScript",
  "stars": 1234,
  "last_updated": "2026-02-15T10:30:00Z"
}
```

### Generating Data with Metadata

To regenerate the portfolio data with the new fields:

1. **Set GitHub Token (Optional but Recommended)**:
   ```bash
   export GITHUB_TOKEN="your_github_personal_access_token"
   ```
   This increases API rate limits from 60 to 5000 requests per hour.

2. **Run the sync script**:
   ```bash
   ruby scripts/sync_portfolio.rb /path/to/mystars
   ```

3. **Note**: The script will make API calls to GitHub for each project, so it may take several minutes depending on the number of projects.

### Fallback Behavior

If the metadata fields are not present in the data:
- Language filter will be hidden if no languages are found
- Stars filter defaults to 0 (shows all projects)
- Last updated filter will be ignored if dates are not present
- All filters gracefully handle missing data

## Usage

### For Users

1. **Basic Search**: Type in the search box to find projects by name or content
2. **Category Filter**: Select a category from the dropdown
3. **Advanced Filters**: Click "Advanced Filters" to expand additional options
4. **Language Filter**: Select a programming language
5. **Stars Filter**: Enter minimum number of stars
6. **Last Updated**: Select a time range
7. **Clear All**: Click "Clear All Filters" to reset everything
8. **Search History**: Click on any previous search to re-run it

### For Developers

#### Customizing Search History

Edit these constants in `portfolio-app.js`:

```javascript
var SEARCH_HISTORY_KEY = 'portfolio_search_history';  // localStorage key
var MAX_HISTORY_ITEMS = 10;  // Maximum saved searches
```

#### Customizing Debounce Delay

Edit the timeout value in the event listener:

```javascript
searchTimeout = setTimeout(filterProjects, 300); // 300ms delay
```

#### Customizing Date Ranges

Edit the options in `_layouts/portfolio.html`:

```html
<select id="updated-filter" class="form-select form-select-sm">
  <option value="">Any Time</option>
  <option value="7">Last 7 days</option>
  <option value="30">Last 30 days</option>
  <!-- Add more options here -->
</select>
```

## Browser Compatibility

- **Search History**: Requires localStorage support (all modern browsers)
- **Advanced Filters**: Works in all browsers supporting ES5+
- **Date Filtering**: Uses JavaScript Date object (universal support)

## Performance Considerations

1. **GitHub API Rate Limits**:
   - Without token: 60 requests/hour
   - With token: 5000 requests/hour
   - Script includes 0.1s delay between requests

2. **Search Performance**:
   - Debounced input (300ms) prevents excessive filtering
   - Fuse.js handles 1,600+ projects efficiently
   - Advanced filters add minimal overhead

3. **localStorage**:
   - Search history stored locally (no server load)
   - Automatically limited to 10 items
   - Gracefully handles quota errors

## Future Enhancements

Possible improvements not included in this implementation:

1. **Export filtered results** to CSV/JSON
2. **Save filter presets** for quick access
3. **Advanced search syntax** (e.g., "language:python stars:>100")
4. **Sort options** (by stars, date, name)
5. **Filter by multiple languages** at once
6. **Date range picker** for custom date ranges
7. **Search suggestions/autocomplete**
8. **Highlight search terms** in results

## Troubleshooting

### Language filter is empty
- Ensure `portfolio.json` includes `language` field
- Re-run sync script with GitHub API access

### Stars filter not working
- Check that `portfolio.json` includes `stars` field
- Verify stars are numbers, not strings

### Last updated filter not working
- Ensure `last_updated` field is in ISO 8601 format
- Example: `"2026-02-15T10:30:00Z"`

### Search history not saving
- Check browser localStorage is enabled
- Check for localStorage quota errors in console
- Try clearing browser cache

### GitHub API rate limit exceeded
- Set `GITHUB_TOKEN` environment variable
- Wait for rate limit to reset (1 hour)
- Script will continue but skip metadata for remaining projects

## Testing Checklist

- [x] Advanced filters toggle shows/hides panel
- [x] Language filter populates from data
- [x] Stars filter accepts numeric input
- [x] Last updated filter works with date ranges
- [x] Search history saves and displays
- [x] Search history badges are clickable
- [x] Clear history button works
- [x] Clear all filters button appears/disappears correctly
- [x] Search stats display shows correct count
- [x] All filters work together (combined filtering)
- [x] Filters work with Fuse.js search
- [x] Filters work without Fuse.js (fallback)
- [x] Dark mode styling works for all new elements
- [x] Responsive design works on mobile
- [x] localStorage gracefully handles errors

## License

Same as the main project.
