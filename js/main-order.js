const select_goods = document.getElementById("js-example-basic-single");
const goods_tables = document.getElementById("goods_table");

async function readTextFile(file) {
    const response = await fetch(file, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }       
    });
    return await response.blob();
}
 var workbook ;
 var worksheets   = {};
 var storage_arr  = [];
 var city_arr     = [];
 var district_arr = [];
 var shops_arr    = [];
 var goods_map = new Map();

var textFile = readTextFile("goods-data.xlsx");
textFile.then(x => parseExcel(x));

function parseExcel(file) {
  
    const reader = new FileReader();
    reader.onload = function (e) {

        var data = e.target.result;
        workbook = XLSX.read(data, {
            type: 'binary'
        });

        init_xlsx();
    };

    reader.onerror = function (ex) {
        console.log(ex);
    };
    reader.readAsBinaryString(file);
   
}


function init_xlsx() {
    
    workbook.SheetNames.forEach(sheetName => worksheets[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]));

    worksheets.goods.forEach(goods_parse =>  goods_map.set(parseInt(goods_parse.id),goods_parse));

    // Create Storage object and Storage array
    worksheets.storage.forEach(storage_parse => storage_arr.push(storage_parse));

    goods_html_select();
    

}

 /*  add Goods select {name} ,{Shop_id} and {id} options in id="shop_name" select  html   */ 
 function goods_html_select(){ 
    let goods_name = '<option value="0" selected> > Ընտրեք Ապրանքատեսակը </option>';
    
    goods_map.forEach((goods,id) => {
         goods_name+=`<option  value="${id}" > ${goods.name} </option>`  
    });
    select_goods.innerHTML = goods_name;
}


/*  add Goods {name} , {type}, {price}, {quantity} and {id} options in id="goods_table" select  html   */ 
function goods_html(goods_id,count){
    let goods = goods_map.get(goods_id);
    let goods_text = `<tr onclick="goods_count_change(this);" goods_id="${goods_id}">
        <th scope="row" id="th_bord">${goods_id}</th>
        <td id="td_bord"><div> ${goods.name}  </div></td>
        <td id="td_bord"><div> ${goods.type}  </div></td>
        <td id="td_bord"><div> ${goods.price} </div></td>
        <td id="td_bord"><div id="goods_count-${goods_id}">${count}</div></td></tr>`;       
    
    goods_tables.insertAdjacentHTML("afterbegin",goods_text);
}