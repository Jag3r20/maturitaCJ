const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public', 'rozbory');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

let listHtml = '';

files.forEach(file => {
    let author = "Ostatní";
    let title = file.replace('.html', '');
    
    const parts = title.split('_');
    // Check if the first part is a number (e.g., 01, 02)
    if (parts.length >= 2 && !isNaN(parseInt(parts[0]))) {
        author = parts[1].replace(/-/g, ' ');
        title = parts.slice(2).join(' ').replace(/-/g, ' ');
    } else {
        title = title.replace(/_/g, ' ');
    }
    
    listHtml += `
            <li>
                <a href="/rozbory/${file}">
                    <span class="author">${author}</span>
                    <span class="title">${title}</span>
                </a>
            </li>`;
});

const templatePath = path.join(__dirname, 'public', 'index.template.html');
const indexHtmlPath = path.join(__dirname, 'public', 'index.html');

let templateContent = fs.readFileSync(templatePath, 'utf8');

const newContent = templateContent.replace('<!-- FILE_LIST -->', listHtml.trim());

fs.writeFileSync(indexHtmlPath, newContent, 'utf8');
console.log('Static index.html generated successfully during build.');
