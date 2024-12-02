/*
 * @Author: jingzi 1163478123@qq.com
 * @Date: 2023-10-18 18:04:15
 * @LastEditors: jingzi 1163478123@qq.com
 * @LastEditTime: 2024-12-02 17:09:17
 * @Description: 文件求和
 * Copyright (c) 2024 by ${git_name}, All Rights Reserved.
 */
const fs = require('fs');
const { dialog } = require('electron')
window.onload = ()=>{
    const addFile = document.querySelector('#addFile') // 计算文件和
    const myFile = document.querySelector('#myFile') // 选中的文件
    const total = document.querySelector('#total') // 文件计算总和
    const numDom = document.querySelector('#nums') // 所有文件名
    const historyTotal = document.querySelector('#historyTotal') // 历史记录
    const addHistory = document.querySelector('#addHistory') // 计算历史记录总和
    const clearHistory = document.querySelector('#clearHistory') // 清除历史记录
    const historyData = document.querySelector('#historyData')
    let history = []
    addFile.addEventListener('click',()=>{
        const nums = []
        for (let index = 0; index < myFile.files.length; index++) {
            const ele = myFile.files[index];
            const name = ele.name.replace(/\.(\w+)$/g,'')
            if(name.indexOf('行程')===-1){
                const data = name.replace(/[_-]\d+/g,'')
                console.log(`data==${data}`)
                nums.push(+data)
            }
        }
        const sum = nums.reduce((total, item) => total + item*100, 0) / 100
        history.push(sum)
        total.innerHTML=`总和为：${sum}；\n 总个数：${nums.length}`
        numDom.innerHTML = `所有文件为：${nums.join(', ')}`
        historyTotal.innerHTML = `所有历史数据数据：${history.join(', ')}`
        historyData.innerHTML = `${nums.join(', ')}`
    })
    addHistory.addEventListener('click',()=>{
        const hTotal = history.reduce((prev,cur)=> prev+cur)
        historyTotal.innerHTML = `所有数据：${history.join(', ')}，历史数据总和为：${hTotal}`
    })
    clearHistory.addEventListener('click',()=>{
        historyTotal.innerHTML = ``
        history=[]
    })
}
