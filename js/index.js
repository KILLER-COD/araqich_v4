// Import dependencies 
let orders;
let goods_count = {};
let price_arr = [];
let summ = 0;
let order_obj;
let order_arr = [];
let goods_count_map = new Map();

function change_city() {
     let select_city_id = select_city.options[select_city.selectedIndex].value;
     district_html(select_city_id);
}

function change_district() {
     let select_district_id = select_district.options[select_district.selectedIndex].value;
     shops_html(shops_arr,select_district_id);
}

 function change_shops() {
    shop_id = select_shop.options[select_shop.selectedIndex].value;
    select_goods.disabled = false;
}
    
  
function set_count_goods(){
  let goods_id = parseInt(select_goods.options.selectedIndex);
  
  let count = goods_count_order(goods_id);
  if (count != null) {
    goods_html(goods_id,count);
    var option = document.createElement("option");
    option.text = "Text";
    option.value = "myvalue";

    select_goods.removeChild(select_goods.options[select_goods.options.selectedIndex]);
   
  }
}


function goods_count_order(goods_id) {
   select_city.disabled      = true;
   select_district.disabled  = true;
   select_shop.disabled      = true;

   var count = parseInt(prompt("Մուտքագրեք ապրանքի քանակը։"));
   console.log(goods_id);

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
    
    document.getElementById("order_price").innerText =summ ;
    
    goods_count_map.set(goods_id, count);

    document.getElementById("goods_count-"+goods_id).innerText = count;

    if (count == 0) { 
      document.getElementById(element_id).innerHTML = "";
      goods_count_map.delete(goods_id);
    }
        

}
 
function order_data() {
    if (select_shop.options.length != 0 && summ != 0) {
      select_city.disabled      = false;
      select_district.disabled  = false;
      select_shop.disabled      = false;

      summ = 0;
      document.getElementById("order_price").innerText = summ ;
      goods_tables.innerHTML = "";
      select_shop.innerHTML = "",
      select_district.innerHTML = "";
      select_city.selectedIndex = 0;

      order_obj = {
          shop_id : shop_id,
          goods_order : goods_count_map
      };
      order_arr.push(order_obj);

      goods_html_select();
      goods_count_map.clear() ;


    } else {
      alert("Ընտրեք Քաղաքը -> Թաղամասը -> խանութը -> Ապրանքատեսակները -> Այնուհետև սեղմեք այս կոճակը");
    }

 }  


  function goods_out() {

  }


	$(document).ready(function() {
    $(".js-example-basic-single").select2({theme: "classic"});
  });

