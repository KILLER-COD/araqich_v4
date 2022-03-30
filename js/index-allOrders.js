// Import dependencies 
let orders;
let goods_count = {};
let price_arr = [];
let summ = 0;
let order_obj;
let goods_count_map = new Map();
let select_city ;
let select_district;
let select_shop;
let order_data_map = new Map();
let obj = Object.entries(localStorage);


function get_order() {
  if( obj.filter(arr => arr[0].startsWith("order-")).length != 0){

    obj.filter(arr => arr[0].startsWith("order-")).forEach(arr => {
      order_obj = JSON.parse(arr[1]);

      let header = table_header(order_obj.shop_id);

      let summ = 0;
      let content ="";
      for (const goods_id in order_obj.goods_order) {  
  
        summ += goods_count_order(goods_id ,order_obj.goods_order[goods_id]);
        content += orders_html(order_obj.shop_id, goods_id, order_obj.goods_order[goods_id]);
      
      }   
        
      document.getElementById("table").insertAdjacentHTML("afterend",header+content);
      document.getElementById("order_price").innerText = summ;
    });

  }
}

function goods_count_order(goods_id,count) {
      let price_arr =[];
      price_arr.push(goods_map.get(parseInt(goods_id)).price*count);
      let summ = price_arr.reduce(function(previousValue, currentValue) {
        return previousValue + currentValue;
      });
    
      return summ;
}



function create_order_excel(){
  if( obj.filter(arr => arr[0].startsWith("order-")).length != 0){

    let newWorkbook = new ExcelJS.Workbook();
    obj.filter(arr => arr[0].startsWith("order-")).forEach(arr => {
      order_obj = JSON.parse(arr[1]);
    
      let newworksheet = newWorkbook.addWorksheet(`Order data${order_obj.shop_id}`);

      newworksheet.mergeCells('B1:E1');
      newworksheet.mergeCells('B2:E2');
      newworksheet.columns = [
          { header: '', key: 'name',width: 25 },
          { header: '', key: 'count' ,width: 4},
          { header: '', key: 'type',width: 4 },
          { header: '', key: 'price',width: 6 },
          { header: '', key: 'sum',width: 8 }
      ];

      newworksheet.getCell('A1').value = 'Խանութի Ա/Ձ';
      newworksheet.getCell('A1').alignment = { horizontal:'center'} ;

      newworksheet.getCell('B1').value = 'Ամիս, Ամսաթիվ';
      newworksheet.getCell('B1').alignment = { horizontal:'center'} ;

      newworksheet.getCell('B2').value = '2021-12-15';
      newworksheet.getCell('B2').alignment = { horizontal:'center'} ;

      newworksheet.getCell('A2').value = shops_arr[order_obj.shop_id-1].shop_name;
      newworksheet.getCell('A2').alignment = { horizontal:'center'} ;


      const rows3 = [{name: 'Անվանում', count: "Քան.", type: 'Տիպ', price: 'Գին', sum: 'Գումար'}];
      const rows5 = [{name: ''}];
      newworksheet.addRows(rows5);
      newworksheet.addRows(rows3);
      
      newworksheet.getCell('B4').alignment = { textRotation: 90 } ;
      newworksheet.getCell('C4').alignment = { textRotation: 90 } ;

      let summ = 0;
      for (const goods_id in order_obj.goods_order) {  
  
        summ += goods_count_order(goods_id ,order_obj.goods_order[goods_id]);

        let count = order_obj.goods_order[goods_id];
        let price = goods_map.get(parseInt(goods_id)).price; 
        let sum = price*count;
        let name = goods_map.get(parseInt(goods_id)).name;
        let type = goods_map.get(parseInt(goods_id)).type;

        let  rows = [{name: name, count: count, type: type, price: price, sum: sum}];
        newworksheet.addRows(rows);
        newworksheet.getCell('A4:E4').alignment = { horizontal:'center'} ;

      }   
      
      let size = Object.keys(order_obj.goods_order).length + 5;
      
      newworksheet.mergeCells(`A${size}:D${size}`);
      newworksheet.getCell(`A${size}`).value = 'Ընդհամենը';
      newworksheet.getCell(`E${size}`).value = summ ;
      
      let cellarr = ["A","B","C","D","E"];

      cellarr.forEach(cellchar => {
        for (let j = 1; j <= size ; j++) {   
            newworksheet.getCell(`${cellchar}`+j).border = {
                top: {style:'double'},
                left: {style:'double'},
                bottom: {style:'double'},
                right: {style:'double'}
            };
        }
      });
      
    });
  
    newWorkbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
        saveAs(blob, 'test.xlsx');
    });
    return;
  } 
  
  alert("Ստեղծեք պատվեեր (պատվերների քանակը 0 )")

}