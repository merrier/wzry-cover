import XLSX from 'xlsx';
import FileSaver from 'file-saver';

// 工具函数，转为十六进制
function s2ab(s) {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}

/**
 * 将数据导出至excel，并在当前页面下载
 * @param headers
 * @param data
 * @param fileName
 */
function dataToExcel(headers, data, fileName) {

    let _headers = headers.map((v, i) => Object.assign({}, {
        v: v,
        position: String.fromCharCode(65 + i) + 1
    })).reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
    let _data = data.map((v, i) => headers.map((k, j) => Object.assign({}, {
        v: v[k],
        position: String.fromCharCode(65 + j) + (i + 2)
    }))).reduce((prev, next) => prev.concat(next)).reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
    // 合并 headers 和 data
    let output = Object.assign({}, _headers, _data);
    // 获取所有单元格的位置
    let outputPos = Object.keys(output);
    // 计算出范围
    let ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
    // 构建 workbook 对象
    let wb = {
        SheetNames: ['Sheet1'],
        Sheets: {
            'Sheet1': Object.assign({}, output, {'!ref': ref})
        }
    };
    // 将数据写入Excel
    let wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'};
    let wbout = XLSX.write(wb, wopts);

    // 当前页面下载Excel
    FileSaver.saveAs(new Blob([s2ab(wbout)], {type: ""}), fileName + '.xlsx');
}

/**
 * 将表格中的数据导出至excel，并在当前页面下载
 * @param dom
 * @param fileName
 */
function tableToExcel(dom, fileName){

    // let dom = document.getElementsByClassName(truedom)[0];

    // 构建 workbook 对象
    let wb = {
        SheetNames: ['Sheet1'],
        Sheets: {
            'Sheet1': XLSX.utils.table_to_sheet(dom)
        }
    };
    // 将数据写入Excel
    let wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'};
    let wbout = XLSX.write(wb, wopts);

    // 当前页面下载Excel
    FileSaver.saveAs(new Blob([s2ab(wbout)], {type: ""}), fileName + '.xlsx');
}

const exportToExcel = {
    dataToExcel,
    tableToExcel,
};

export default exportToExcel;