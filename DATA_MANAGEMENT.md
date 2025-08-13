# Migration Status Data Management

This file contains the source of truth for all migration status data. Update this file to change what appears on the live dashboard.

## 📊 Data Files

### `migration-data.csv`
This CSV file contains all the migration status data. You can:
- Edit it directly in GitHub (click the pencil icon)
- Download it, edit in Excel/Google Sheets, then upload back
- Import it into Google Sheets for collaborative editing

### Columns:
- **Report Name**: Name of the report/feature
- **Category**: Grouping category (Core Sales, Inventory, etc.)
- **Data Source**: Where the data comes from
- **Current State**: Migration status (see valid values below)
- **Owner**: Team or person responsible
- **Notes**: Additional information

### Valid Status Values:
- `Migrated to SDP`
- `In progress migrating to SDP`
- `Not started`
- `Other Team Owned`
- `External Workflow`

## 🔄 How to Update the Live Dashboard

### Option 1: Edit CSV directly in GitHub (Recommended)
1. Go to https://github.com/Divyasq/migration-status
2. Click on `migration-data.csv`
3. Click the pencil icon (Edit this file)
4. Make your changes
5. Commit changes
6. Run the update script (see below)

### Option 2: Use Google Sheets
1. Import the CSV into Google Sheets
2. Share with your team for collaborative editing
3. Export as CSV when ready to update
4. Upload the new CSV to the repository

### Option 3: Excel/Local editing
1. Download `migration-data.csv`
2. Edit in Excel or any spreadsheet application
3. Save as CSV (make sure to keep the same format)
4. Upload back to the repository

## 🚀 Updating the Live Site

After updating the CSV data, you need to regenerate the HTML file:

### Automatic Update Script
Run this command to update the live site with new data:
```bash
cd /Users/divyac/migration-status-site
node update-dashboard.js
git add .
git commit -m "Update migration status data"
git push origin main
```

### Manual Update
If you prefer to update manually:
1. Edit the `reportData` array in `index.html`
2. Copy the data from your updated CSV
3. Commit and push changes

## 📋 Current Status Summary

The dashboard automatically calculates:
- Total reports: 53
- Progress percentages
- Category breakdowns
- Status distributions

## 🔗 Links

- **Live Dashboard**: https://divyasq.github.io/migration-status/
- **Repository**: https://github.com/Divyasq/migration-status
- **CSV Data File**: https://github.com/Divyasq/migration-status/blob/main/migration-data.csv
