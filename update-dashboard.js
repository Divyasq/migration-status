const fs = require('fs');
const path = require('path');

// Read the CSV file
function readCSV(filename) {
    const csvContent = fs.readFileSync(filename, 'utf8');
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',');
    
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        const obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index] || '';
        });
        data.push(obj);
    }
    return data;
}

// Simple CSV parser that handles commas in quoted fields
function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
}

// Convert CSV data to JavaScript array format
function convertToJSArray(csvData) {
    return csvData.map(row => {
        const jsObj = {
            report: row['Report Name'],
            currentState: row['Current State'],
            dataSource: row['Data Source'],
            category: row['Category']
        };
        
        if (row['Timeline']) {
            jsObj.timeline = row['Timeline'];
        }
        
        return jsObj;
    });
}

// Update the HTML file with new data
function updateHTMLFile(newData) {
    const htmlFile = 'index.html';
    let htmlContent = fs.readFileSync(htmlFile, 'utf8');
    
    // Convert data to JavaScript string format
    const dataString = JSON.stringify(newData, null, 12);
    
    // Replace the reportData array in the HTML file
    const startMarker = 'const reportData =';
    const endMarker = '            ];';
    
    const startIndex = htmlContent.indexOf(startMarker);
    const endIndex = htmlContent.indexOf(endMarker, startIndex) + endMarker.length;
    
    if (startIndex === -1 || endIndex === -1) {
        console.error('Could not find reportData array in HTML file');
        return false;
    }
    
    const newDataSection = `const reportData = ${dataString.replace(/^/gm, '            ')};`;
    
    const updatedHTML = htmlContent.substring(0, startIndex) + 
                       newDataSection + 
                       htmlContent.substring(endIndex);
    
    fs.writeFileSync(htmlFile, updatedHTML);
    return true;
}

// Main execution
try {
    console.log('📊 Reading migration data from CSV...');
    const csvData = readCSV('migration-data.csv');
    
    console.log(`✅ Found ${csvData.length} migration items`);
    
    console.log('🔄 Converting to JavaScript format...');
    const jsData = convertToJSArray(csvData);
    
    console.log('📝 Updating HTML file...');
    const success = updateHTMLFile(jsData);
    
    if (success) {
        console.log('✅ Successfully updated index.html with new migration data!');
        console.log('🚀 Run the following commands to deploy:');
        console.log('   git add .');
        console.log('   git commit -m "Update migration status data"');
        console.log('   git push origin main');
    } else {
        console.error('❌ Failed to update HTML file');
    }
    
} catch (error) {
    console.error('❌ Error updating migration data:', error.message);
}
