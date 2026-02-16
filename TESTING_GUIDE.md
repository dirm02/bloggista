# Testing Guide: Advanced Filters & Search History

## Quick Start

This guide helps you test the newly implemented advanced filters and search history features.

## Prerequisites

Before testing, ensure:
1. Jekyll is installed and running
2. Portfolio data is loaded (portfolio.json exists)
3. Browser has JavaScript enabled
4. Browser supports localStorage (all modern browsers)

## Starting the Development Server

```bash
cd blog/brutalist-blog
bundle exec jekyll serve
```

Then open: `http://localhost:4000/portfolio/`

## Test Cases

### Test 1: Basic Search with History

**Steps:**
1. Navigate to portfolio page
2. Type "react" in search box
3. Wait for results to appear
4. Clear search box
5. Look for "Recent Searches" section below filters

**Expected Result:**
- ✅ Search results appear instantly
- ✅ "Recent Searches" section appears
- ✅ "react" badge is clickable
- ✅ Clicking badge re-runs search

### Test 2: Advanced Filters Toggle

**Steps:**
1. Click "Advanced Filters" button
2. Observe the panel expand
3. Click again to collapse

**Expected Result:**
- ✅ Panel smoothly expands/collapses
- ✅ Arrow icon rotates (▶ to ▼)
- ✅ Three filter controls visible when expanded:
  - Language dropdown
  - Minimum stars input
  - Last updated dropdown

### Test 3: Language Filter

**Steps:**
1. Expand advanced filters
2. Open language dropdown
3. Select a language (e.g., "JavaScript")
4. Observe filtered results

**Expected Result:**
- ✅ Dropdown populated with languages from data
- ✅ Shows count per language (e.g., "JavaScript (245)")
- ✅ Only projects with selected language shown
- ✅ Works with search query if entered

**Note:** If dropdown is empty, run the sync script to populate metadata.

### Test 4: Stars Filter

**Steps:**
1. Expand advanced filters
2. Enter "100" in minimum stars field
3. Wait 300ms (debounce delay)
4. Observe filtered results

**Expected Result:**
- ✅ Only projects with 100+ stars shown
- ✅ Input accepts only numbers
- ✅ Debounced (doesn't filter on every keystroke)
- ✅ Works with other filters

**Note:** If no filtering occurs, ensure portfolio.json has stars field.

### Test 5: Last Updated Filter

**Steps:**
1. Expand advanced filters
2. Select "Last 30 days" from dropdown
3. Observe filtered results

**Expected Result:**
- ✅ Only recently updated projects shown
- ✅ Dropdown options:
  - Any Time
  - Last 7 days
  - Last 30 days
  - Last 3 months
  - Last 6 months
  - Last year
- ✅ Works with other filters

**Note:** If no filtering occurs, ensure portfolio.json has last_updated field.

### Test 6: Combined Filters

**Steps:**
1. Type "machine learning" in search
2. Select "Python" from language filter
3. Enter "50" in stars filter
4. Select "Last 6 months" from updated filter
5. Observe results

**Expected Result:**
- ✅ All filters apply simultaneously
- ✅ Results match ALL criteria (AND logic)
- ✅ Result count updates correctly
- ✅ "Clear All Filters" button appears

### Test 7: Clear All Filters

**Steps:**
1. Apply multiple filters (search + category + advanced)
2. Click "Clear All Filters" button
3. Observe all filters reset

**Expected Result:**
- ✅ Search box cleared
- ✅ Category dropdown reset to "All Categories"
- ✅ Language dropdown reset
- ✅ Stars input cleared
- ✅ Updated dropdown reset
- ✅ All projects shown again
- ✅ "Clear All Filters" button disappears

### Test 8: Search History Persistence

**Steps:**
1. Search for "react"
2. Search for "python"
3. Search for "rust"
4. Refresh the page (F5)
5. Look at search history

**Expected Result:**
- ✅ History persists after refresh
- ✅ Shows up to 10 recent searches
- ✅ Most recent at the top
- ✅ No duplicates (if you search "react" again, it moves to top)

### Test 9: Clear Search History

**Steps:**
1. Ensure search history has items
2. Click "Clear History" button
3. Observe history disappear

**Expected Result:**
- ✅ All history badges removed
- ✅ "Recent Searches" section hides
- ✅ History cleared from localStorage
- ✅ Persists after refresh

### Test 10: Search Stats Display

**Steps:**
1. Type "javascript" in search
2. Look below search box for stats

**Expected Result:**
- ✅ Shows result count (e.g., "42 results")
- ✅ Updates as you type
- ✅ Correct singular/plural (1 result vs 2 results)
- ✅ Disappears when search cleared

### Test 11: Dark Mode

**Steps:**
1. Enable dark mode in OS settings
2. Refresh portfolio page
3. Test all filters

**Expected Result:**
- ✅ All filter controls have dark styling
- ✅ Search history badges have dark styling
- ✅ Advanced panel border is dark
- ✅ Text is readable in dark mode
- ✅ Hover states work correctly

### Test 12: Mobile Responsiveness

**Steps:**
1. Open portfolio on mobile device or resize browser to mobile width
2. Test all filter controls
3. Test search history

**Expected Result:**
- ✅ Filters stack vertically on mobile
- ✅ All controls are touch-friendly
- ✅ Search history badges wrap properly
- ✅ Advanced panel expands/collapses smoothly
- ✅ No horizontal scrolling

### Test 13: Performance

**Steps:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Type search query
4. Observe timing

**Expected Result:**
- ✅ Search completes in <50ms
- ✅ No console errors
- ✅ No lag when typing
- ✅ Debounce prevents excessive filtering

### Test 14: Error Handling

**Steps:**
1. Open browser DevTools Console
2. Run: `localStorage.clear()`
3. Try using search history
4. Run: `delete window.FUSE_INDEX`
5. Try searching

**Expected Result:**
- ✅ No JavaScript errors
- ✅ Search still works (falls back to basic search)
- ✅ History gracefully handles localStorage errors
- ✅ User experience not broken

## Data Generation Testing

### Test 15: Sync Script with Metadata

**Prerequisites:**
- Ruby installed
- mystars repository cloned
- GitHub token (optional but recommended)

**Steps:**
```bash
# Set token (optional)
export GITHUB_TOKEN="ghp_your_token_here"

# Run sync script
cd blog/brutalist-blog
ruby scripts/sync_portfolio.rb /path/to/mystars

# Check output
cat assets/data/portfolio.json | head -50
```

**Expected Result:**
- ✅ Script runs without errors
- ✅ Shows progress for each category
- ✅ Fetches metadata from GitHub API
- ✅ portfolio.json includes new fields:
  - language
  - stars
  - last_updated
- ✅ Takes 3-5 minutes for 1,600 projects

### Test 16: Verify JSON Structure

**Steps:**
```bash
# Check first project has new fields
cat assets/data/portfolio.json | grep -A 10 '"name"' | head -15
```

**Expected Output:**
```json
{
  "name": "Project Name",
  "slug": "project-slug",
  "categories": ["Category"],
  "image": "https://...",
  "repo_url": "https://github.com/...",
  "indexed_content": "...",
  "language": "JavaScript",
  "stars": 1234,
  "last_updated": "2026-02-15T10:30:00Z"
}
```

## Troubleshooting

### Issue: Language filter is empty

**Solution:**
1. Check portfolio.json has language field
2. Re-run sync script with GitHub token
3. Verify GitHub API is accessible

### Issue: Search history not saving

**Solution:**
1. Check browser console for localStorage errors
2. Verify localStorage is enabled in browser
3. Check localStorage quota (clear if full)
4. Try incognito mode to test

### Issue: Filters not working

**Solution:**
1. Check browser console for JavaScript errors
2. Verify portfolio.json has required fields
3. Clear browser cache and reload
4. Check data attributes on cards in DevTools

### Issue: Stars/Date filters do nothing

**Solution:**
1. Verify portfolio.json has stars and last_updated fields
2. Check data types (stars should be number, date should be ISO string)
3. Re-run sync script to populate metadata

### Issue: GitHub API rate limit

**Solution:**
1. Set GITHUB_TOKEN environment variable
2. Wait 1 hour for rate limit to reset
3. Script will continue but skip metadata for remaining projects

## Success Criteria

All features working correctly when:

- ✅ Advanced filters toggle smoothly
- ✅ Language filter populates and filters correctly
- ✅ Stars filter accepts numbers and filters correctly
- ✅ Date filter works with all time ranges
- ✅ Search history saves and displays
- ✅ History persists across page reloads
- ✅ Clear history removes all items
- ✅ Clear all filters resets everything
- ✅ Search stats show correct counts
- ✅ All filters work together
- ✅ Dark mode styling works
- ✅ Mobile responsive
- ✅ No console errors
- ✅ No linter errors

## Automated Testing (Future)

Consider adding automated tests:

```javascript
// Example Jest test
describe('Advanced Filters', () => {
  test('language filter works', () => {
    // Test implementation
  });
  
  test('search history saves', () => {
    // Test implementation
  });
});
```

## Reporting Issues

If you find bugs:

1. Check browser console for errors
2. Verify data structure in portfolio.json
3. Test in different browsers
4. Check ADVANCED_FILTERS_README.md for known issues
5. Document steps to reproduce

## Next Steps

After testing:

1. ✅ Verify all test cases pass
2. ✅ Check documentation is accurate
3. ✅ Test on production data
4. ✅ Get user feedback
5. ✅ Plan future enhancements

## Resources

- `ADVANCED_FILTERS_README.md` - Feature documentation
- `IMPLEMENTATION_SUMMARY.md` - Technical overview
- Browser DevTools - For debugging
- GitHub API Docs - For understanding rate limits
