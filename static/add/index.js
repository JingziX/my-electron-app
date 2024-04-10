const fs = require('fs');
const { dialog } = require('electron')
window.onload = ()=>{
    const openDialogBtn = document.querySelector('#openDialogBtn')
    const myFile = document.querySelector('#myFile')
    const total = document.querySelector('#total')
    const numDom = document.querySelector('#nums')
    openDialogBtn.addEventListener('click',()=>{
        const nums = []
        for (let index = 0; index < myFile.files.length; index++) {
            const ele = myFile.files[index];
            const name = ele.name.replace(/\.(\w+)$/g,'')
            const data = name.replace(/\-|\_/g,'')
            nums.push(+data)
        }
        const sum = nums.reduce((total, item) => total + item, 0)
        total.innerHTML=`总和为：${sum}；\n 总个数：${nums.length}`
        numDom.innerHTML = `所有文件为：${nums.join(', ')}`
    })
}
