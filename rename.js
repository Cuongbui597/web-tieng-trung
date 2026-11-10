const fs = require('fs');
const path = require('path');

const replacements = [
    { regex: /Phòng 5\.09, Lầu 5, Toà nhà ST Moritz, Số 1014 Phạm Văn Đồng, Phường Hiệp Bình Chánh/gi, replace: "485 Ngô Quyền" },
    { regex: /Sa Đéc, Bến Tre/gi, replace: "Đà Nẵng, Quảng Nam" },
    { regex: /Số 2 Đường Đào Trinh Nhất, P\. Linh Tây, Đà Nẵng, Đà Nẵng\.?/gi, replace: "485 Ngô Quyền Đà Nẵng." },
    { regex: /Số 2 đường Đào Trinh Nhất, khu phố An Bình, Phường Linh Tây, Đà Nẵng, Đà Nẵng/gi, replace: "485 Ngô Quyền Đà Nẵng" }
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (stat.isFile() && /\.(tsx|ts|js|md|json)$/.test(file)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            for (const r of replacements) {
                if (r.regex.test(content)) {
                    content = content.replace(r.regex, r.replace);
                    modified = true;
                }
            }
            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

processDirectory(path.join(__dirname, 'src'));
processDirectory(path.join(__dirname, 'public'));
console.log("Done");
