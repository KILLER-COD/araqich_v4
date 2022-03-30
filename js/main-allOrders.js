const select_goods = document.getElementById("js-example-basic-single");
const goods_tables = document.getElementById("orders_table");

async function readTextFile(file) {
    const response = await fetch(file, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }       
    });
    return await response.blob();
}
 let workbook ;
 let worksheets   = {};
 let storage_arr  = [];
 let city_arr     = [];
 let district_arr = [];
 let shops_arr    = [];
 let goods_map = new Map();

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

    worksheets.shops.forEach(shops_parse =>  shops_arr.push(shops_parse));

    get_order();

}


function table_header(shop_id) {
    return `<table class="table " id="table-${shop_id}">
                    <thead>
                        <tr >
                            <th>Խանութի անուն</th>
                            <th>Ապրանքի անուն<br></th>
                            <th>Քանակ</th>
                            <th>Գին</th>
                            <th>Պատվերի արժեքը<br></th>
                        </tr>
                    </thead>						
                        
                    <tbody id="orders_table-${shop_id}">

                    </tbody>
            </table`;
               
}



/*  add Goods {name} , {type}, {price}, {quantity} and {id} options in id="goods_table" select  html   */ 
function orders_html(shop_id,goods_id,count){
    let goods = goods_map.get(parseInt(goods_id));

    return  `<tr onclick="goods_count_change(this);" goods_id="${goods_id}">
        <th scope="row" id="th_bord">${shops_arr[parseInt(shop_id)-1].shop_name}</th>
        <td id="td_bord"><div> ${goods.name}  </div></td>
        <td id="td_bord"><div> ${count}  </div></td>
        <td id="td_bord"><div> ${goods.price} </div></td>
        <td id="td_bord"><div id="order_price"> </div></td></tr>`;       
    
}
