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

    table_header();
    let new_arr = [];
    obj.filter(arr => arr[0].startsWith("order-")).forEach(arr => {new_arr.push(JSON.parse(arr[1]).goods_order) });

        let all_goods_count = new Map();

        new_arr.forEach( arr => {
          arr =Object.entries(arr).forEach(goods => {

            let goods_id = parseInt(goods[0]);
            let map_id = all_goods_count.get(parseInt(goods[0]));

            if( map_id  != undefined ){
              let summa = goods[1] +  all_goods_count.get(goods_id);
              all_goods_count.set(goods_id,summa);
              
            } else {
              all_goods_count.set(goods_id,goods[1]);
            }

          })

        });

      let content ="";
      let summ = 0;
      all_goods_count.forEach((allCount , goods_id) => { 
        let price = goods_map.get(parseInt(goods_id)).price;  
        let sum = price*allCount;
        summ += goods_count_order(goods_id , allCount);
        content += orders_html(goods_id, allCount,sum);
      
      });  
        
      document.getElementById("orders_table").insertAdjacentHTML("afterend",content);
      document.getElementById("all_price").innerText = summ;
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


function create_out_excel(){
  if( obj.filter(arr => arr[0].startsWith("order-")).length != 0){
    
      let new_arr = [];
      obj.filter(arr => arr[0].startsWith("order-")).forEach(arr => {new_arr.push(JSON.parse(arr[1]).goods_order)  });

      let all_goods_count = new Map();

      new_arr.forEach( arr => {
        arr =Object.entries(arr).forEach(goods => {

          let goods_id = parseInt(goods[0]);
          let map_id = all_goods_count.get(parseInt(goods[0]));

          if( map_id  != undefined ){
            let summa = goods[1] +  all_goods_count.get(goods_id);
            all_goods_count.set(goods_id,summa);
            
          } else {
            all_goods_count.set(goods_id,goods[1]);
          }

        })

      });

      let newWorkbook = new ExcelJS.Workbook();  
      let newworksheet = newWorkbook.addWorksheet("Դուրսգրման ապրանքներ");

      newworksheet.mergeCells('A1:D1');
      newworksheet.columns = [
          { header: '', key: 'name',width: 25 },
          { header: '', key: 'count' ,width: 8},
          { header: '', key: 'type',width: 8 },
          { header: '', key: 'price',width: 8 },
          { header: '', key: 'sum',width: 10 }
      ];

      newworksheet.getCell('A1').value = 'Դուրսգրման ապրանքներ';
      newworksheet.getCell('A1').alignment = { horizontal:'center'} ;

      newworksheet.getCell('E1').value = '2021-12-15';
      newworksheet.getCell('E1').alignment = { horizontal:'center'} ;

      const rows3 = [{name: 'Անվանում', count: "Քանակ", type: 'Հատ/Կգ', price: 'Գին', sum: 'Գումար'}];
      const rows5 = [{name: ''}];
      newworksheet.addRows(rows5);
      newworksheet.addRows(rows3);
      
      let summ = 0;
      all_goods_count.forEach((allCount , goods_id) => {  

        summ += goods_count_order(goods_id , allCount);

        let price = goods_map.get(parseInt(goods_id)).price; 
        let sum = price*allCount;
        let name = goods_map.get(parseInt(goods_id)).name;
        let type = goods_map.get(parseInt(goods_id)).type;

        let  rows = [{name: name, count: allCount, type: type, price: price, sum: sum}];
        newworksheet.addRows(rows);

        });
      
      let size = all_goods_count.size + 5;
      
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


    newWorkbook.xlsx.writeBuffer().then((data) => {
        const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
        saveAs(blob, 'test.xlsx');
    });
    return;
  } 
  alert("Ստեղծեք Պատվեր (Դուրսգրման համար ապրանքնրի քանակը 0)");
}