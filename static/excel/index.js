const fs = require('fs');
const XLSX = require('xlsx');
window.onload = ()=>{
    const readBtn = document.querySelector('#read')
    const myFile = document.querySelector('#myFile')
    const result = document.querySelector('#result')
    const exportBtn = document.querySelector('#export')
    let excelData = []
    let sheetNum = 0
    readBtn.addEventListener('click',async()=>{
        const files = myFile.files
        for (let index = 0; index < files.length; index++) {
            const file = files[index];
            const data = await file.arrayBuffer()
            /* parse and load first worksheet */
            console.log(`data==${data.length}`)
            const wb = XLSX.read(data)
            const ws = wb.Sheets[wb.SheetNames[0]];
            excelData.push(...XLSX.utils.sheet_to_json(ws))
            sheetNum = sheetNum + excelData.length
            console.log(`sheetNum==${sheetNum}`)
            const ohtml = XLSX.utils.sheet_to_html(ws, { id: "tabeller" })
            result.innerHTML = ohtml
        }
        
    })
    exportBtn.addEventListener('click',async()=>{

        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Presidents");
        /* Export to file (start a download) */
        XLSX.writeFile(wb, "SheetJSTable.xlsx");
    })
}
