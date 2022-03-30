// Import dependencies 


let price_arr = [];
let summ = 0;
let order_obj;
let goods_count_map = new Map();
let select_city ;
let select_district;
let select_shop;
let order_data_map = new Map();


function get_location() {
  select_city = JSON.parse(localStorage.getItem("city_id"));
  select_district = JSON.parse(localStorage.getItem("district_id"));
  select_shop = JSON.parse(localStorage.getItem("shop_id"));

  document.getElementById("select_city_ids").innerText = select_city.city_name;
  document.getElementById("select_district_ids").innerText = select_district.district_name;
  document.getElementById("select_shop_ids").innerText = select_shop.shop_name;

}
 
get_location();

function set_count_goods(){
  var e = select_goods
  var strUser = e.options[e.selectedIndex].value;
  let goods_id = parseInt(strUser);
  let count = goods_count_order(goods_id);
  if (count != null) {
    goods_html(goods_id,count);
    document.getElementById("order_send").hidden = false;
    select_goods.removeChild(select_goods.options[select_goods.options.selectedIndex]);  
  }
}


function goods_count_order(goods_id) {
 
   var count = parseInt(prompt("Մուտքագրեք ապրանքի քանակը։"));

   if (count!=null) {

      price_arr.push(goods_map.get(goods_id).price*count);
      summ = price_arr.reduce(function(previousValue, currentValue) {
        return previousValue + currentValue;
      });
      document.getElementById("order_price").innerText =summ ;
      goods_count_map.set( parseInt(goods_id) , count);   
    
      return count;
    }
    return null;
}

function goods_count_change(element) {
    let goods_id = parseInt(element.getAttribute("goods_id"));

    let count = parseInt(prompt("Մուտքագրեք ապրանքի նոր քանակը։"));
    
    let goods_count = goods_count_map.get(goods_id);   
    let goods_price = goods_map.get(goods_id).price;

    let last_count_sum = goods_count * goods_price;
    let new_count_sum = count * goods_price;

    summ = summ + new_count_sum - last_count_sum; 
    
    goods_count_map.set(goods_id, count);
    
    document.getElementById("order_price").innerText =summ ;
    document.getElementById("goods_count-"+goods_id).innerText = count;

    if (count == 0) { 
      element.innerHTML = "";
      goods_count_map.delete(goods_id);
     
      let option = document.createElement("option");
      option.value = goods_id;
      option.text  = goods_map.get(goods_id).name;
     
      select_goods.insertBefore(option, select_goods.children[1]); 

      if(goods_count_map.size == 0) {
        document.getElementById("order_send").hidden = true;
      }
    }

}
 
function order_data() {
    if ( summ != 0) {

      summ = 0;
      document.getElementById("order_price").innerText = summ ;
      goods_tables.innerHTML = "";
 
      order_obj = {
          shop_id : select_shop.shop_id,
          goods_order : Object.fromEntries(goods_count_map)
      };

      let send_order = JSON.stringify(order_obj); 
      localStorage.setItem("order-"+select_shop.shop_id, send_order);
 
      goods_html_select();
      goods_count_map.clear() ;

      alert("Պատվերը հաջողությամբ ընդունված է")

      window.location.replace("/new-order-location.html");

    } else {
      alert("Ընտրեք Քաղաքը -> Թաղամասը -> խանութը -> Ապրանքատեսակները -> Այնուհետև սեղմեք այս կոճակը");
    }

 }  


$(document).ready(function() {
  $(".js-example-basic-single").select2({theme: "classic"});
});

