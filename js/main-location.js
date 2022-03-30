const select_city = document.getElementById('city_name');
const select_district = document.getElementById('district_name');
const select_shop = document.getElementById('shop_name');

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
 let city_arr     = [];
 let district_arr = [];
 let shops_arr    = [];

 let textFile = readTextFile("goods-data.xlsx");
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

    // Create City object and City array
    worksheets.city.forEach(city_parse => city_arr.push(city_parse));

    // Create District object and District array
    worksheets.district.forEach(district_parse =>  district_arr.push(district_parse));

    // Create shop object and shops array
    worksheets.shops.forEach(shops_parse =>  shops_arr.push(shops_parse));

    city_html(city_arr);

}


 /*  add City {name} and {id} options in id="city_name" select  html   */ 
 function city_html(city_arr){
    let city_text = '<option value="0" selected> > Ընտրեք Քաղաք </option>';
    city_arr.forEach(citys => city_text+='<option value="'+ citys.id + '" >'+ citys.city_name +'</option>');
   
    select_city.innerHTML = city_text;
 }

 /*  add District {name} ,{City_id} and {id} options in id="district_name" select  html   */ 
 function district_html(city_id){ 
    let district_text = '<option value="0" selected> > Ընտրեք Թաղամաս </option>';
     district_arr.filter(district => district.city_id == city_id)
        .forEach(district => 
            district_text+=`<option  value="${district.district_id}" > ${district.district_name }</option>` );                  
             
    select_district.innerHTML = district_text;
}



 /*  add Shop {name} ,{Shop_id} and {id} options in id="shop_name" select  html   */ 
 function shops_html(district_id){ 
    let shop_text = '<option value="0" selected> > Ընտրեք Խանութ </option>';
        shops_arr.filter(shops => shops.district_id == district_id )
                .forEach(shops => 
                    shop_text+=`<option  value="${shops.shop_id}" > ${shops.shop_name} </option>` );
              
    select_shop.innerHTML = shop_text;
}