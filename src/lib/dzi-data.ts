export type Role = "Cliente" | "Vendedor" | "Administrador";
export type Product = { id:string; name:string; category:string; price:number; stock:number; material:string; color:string; image:"hero"|"materials" };
export const initialProducts: Product[] = [
{id:"abrigo-tierra",name:"Abrigo Tierra",category:"Abrigos",price:1280,stock:8,material:"Lana virgen y seda",color:"Cacao",image:"hero"},
{id:"chal-niebla",name:"Chal Niebla",category:"Accesorios",price:320,stock:14,material:"Seda salvaje",color:"Marfil",image:"materials"},
{id:"chaqueta-nogal",name:"Chaqueta Nogal",category:"Chaquetas",price:890,stock:3,material:"Lana teñida con nogal",color:"Nogal",image:"materials"},
{id:"capa-paramo",name:"Capa Páramo",category:"Abrigos",price:1040,stock:6,material:"Alpaca y lana virgen",color:"Espresso",image:"hero"},
{id:"bufanda-savia",name:"Bufanda Savia",category:"Accesorios",price:240,stock:2,material:"Seda y lana",color:"Avellana",image:"materials"},
{id:"vestido-raiz",name:"Vestido Raíz",category:"Prendas",price:760,stock:11,material:"Seda salvaje",color:"Arcilla",image:"hero"},
];
export type Order={id:string;customer:string;total:number;status:"Pendiente"|"En preparación"|"Enviado"|"Entregado";date:string};
export const initialOrders:Order[]=[
{id:"DZI-1048",customer:"Valentina R.",total:1520,status:"Pendiente",date:"12 sep"},
{id:"DZI-1047",customer:"Mateo C.",total:890,status:"En preparación",date:"12 sep"},
{id:"DZI-1046",customer:"Luciana G.",total:2080,status:"Enviado",date:"11 sep"},
{id:"DZI-1045",customer:"Emilia P.",total:320,status:"Entregado",date:"10 sep"},
];
export const money=(value:number)=>new Intl.NumberFormat("es-PE",{style:"currency",currency:"PEN",maximumFractionDigits:0}).format(value);
