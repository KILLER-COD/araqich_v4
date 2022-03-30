

let select_city_id_buffer = {};
let select_district_id_buffer ={};
let select_shop_id_buffer ={};


 function change_city() {
    let select_city_id= select_city.options[select_city.selectedIndex].value;
    select_city_id_buffer = JSON.stringify(city_arr[select_city_id-1]);
    district_html(select_city_id);
    document.getElementById("order_crate").hidden = true;
    document.getElementById('shop_name').innerHTML = ""
 }
 
 function change_district() {
    let select_district_id = select_district.options[select_district.selectedIndex].value;
    select_district_id_buffer = JSON.stringify(district_arr[select_district_id-1]);
    shops_html(select_district_id);
    document.getElementById("order_crate").hidden = true;
 }
 
 function change_shops() {
   let select_shop_id = select_shop.options[select_shop.selectedIndex].value;
   select_shop_id_buffer = JSON.stringify(shops_arr[select_shop_id-1]);
   document.getElementById("order_crate").hidden = false;
 }

/*  create location */

 function send_location() {

    localStorage.removeItem('city_id');
    localStorage.removeItem('district_id');
    localStorage.removeItem('shop_id');
  
    localStorage.setItem('city_id', select_city_id_buffer);
    localStorage.setItem('district_id', select_district_id_buffer);
    localStorage.setItem('shop_id', select_shop_id_buffer);
    
}