import { createContext,useContext,useState,type ReactNode } from "react";
import { initialOrders,initialProducts,type Order,type Product,type Role } from "./dzi-data";
type CartItem={product:Product;quantity:number};
export type Purchase={id:string;date:string;items:CartItem[];total:number;status:"Pagado"|"Enviado"|"Entregado"|"Devuelto"};
export type Account={name:string;email:string;role:Role};
export type Seller={email:string;name:string;active:boolean};
export type PosSale={id:string;productId:string;productName:string;quantity:number;total:number;date:string;seller:string};
export type Refund={id:string;purchaseId:string;productName:string;amount:number;reason:string;date:string;by:string};
export const refundReasons=["Stock agotado en tienda física","Pieza vendida presencialmente antes de preparar el envío","Solicitud de la clienta","Pieza con observación de calidad"];
export const initialWhitelist:Seller[]=[{email:"diego@dzi.pe",name:"Diego Salas",active:true},{email:"rocio@dzi.pe",name:"Rocío Ayala",active:true},{email:"nadia@dzi.pe",name:"Nadia Quispe",active:false}];
type Store={role:Role;setRole:(r:Role)=>void;cart:CartItem[];cartOpen:boolean;setCartOpen:(v:boolean)=>void;add:(p:Product)=>void;remove:(id:string)=>void;quantity:(id:string,n:number)=>void;products:Product[];setProducts:React.Dispatch<React.SetStateAction<Product[]>>;orders:Order[];setOrders:React.Dispatch<React.SetStateAction<Order[]>>;purchases:Purchase[];placeOrder:(total:number)=>Purchase|null;account:Account|null;signIn:(a:Account)=>void;signOut:()=>void;whitelist:Seller[];setWhitelist:React.Dispatch<React.SetStateAction<Seller[]>>;posSales:PosSale[];registerPosSale:(productId:string,quantity:number,seller:string)=>PosSale|null;refunds:Refund[];refundPurchase:(purchaseId:string,reason:string,by:string)=>void};

const C=createContext<Store|undefined>(undefined);
export function DziProvider({children}:{children:ReactNode}){
const[role,setRole]=useState<Role>("Cliente");
const[cart,setCart]=useState<CartItem[]>([]);
const[cartOpen,setCartOpen]=useState(false);
const[products,setProducts]=useState(initialProducts);
const[orders,setOrders]=useState(initialOrders);
const[purchases,setPurchases]=useState<Purchase[]>([]);
const add=(product:Product)=>{setCart(c=>{const old=c.find(x=>x.product.id===product.id);return old?c.map(x=>x.product.id===product.id?{...x,quantity:x.quantity+1}:x):[...c,{product,quantity:1}]});setCartOpen(true)};
const remove=(id:string)=>setCart(c=>c.filter(x=>x.product.id!==id));
const quantity=(id:string,n:number)=>setCart(c=>n<1?c.filter(x=>x.product.id!==id):c.map(x=>x.product.id===id?{...x,quantity:n}:x));
const fecha=()=>new Intl.DateTimeFormat("es-PE",{day:"2-digit",month:"short"}).format(new Date());
const placeOrder=(total:number)=>{if(cart.length===0)return null;const purchase:Purchase={id:`DZI-${1100+purchases.length}`,date:fecha(),items:cart,total,status:"Pagado"};setPurchases(p=>[purchase,...p]);setProducts(v=>v.map(p=>{const it=cart.find(x=>x.product.id===p.id);return it?{...p,stock:Math.max(0,p.stock-it.quantity)}:p}));setCart([]);return purchase};
const[account,setAccount]=useState<Account|null>(null);
const[whitelist,setWhitelist]=useState<Seller[]>(initialWhitelist);
const[posSales,setPosSales]=useState<PosSale[]>([]);
const[refunds,setRefunds]=useState<Refund[]>([]);
const registerPosSale=(productId:string,qty:number,seller:string)=>{const product=products.find(p=>p.id===productId);if(!product||qty<1)return null;const sold=Math.min(qty,product.stock);if(sold<1)return null;const sale:PosSale={id:`POS-${2100+posSales.length}`,productId,productName:product.name,quantity:sold,total:product.price*sold,date:fecha(),seller};setPosSales(v=>[sale,...v]);setProducts(v=>v.map(p=>p.id===productId?{...p,stock:Math.max(0,p.stock-sold)}:p));return sale};
const refundPurchase=(purchaseId:string,reason:string,by:string)=>{const purchase=purchases.find(p=>p.id===purchaseId);if(!purchase||purchase.status==="Devuelto")return;setPurchases(v=>v.map(p=>p.id===purchaseId?{...p,status:"Devuelto"}:p));setRefunds(v=>[{id:`DEV-${3100+v.length}`,purchaseId,productName:purchase.items.map(i=>i.product.name).join(", "),amount:purchase.total,reason,date:fecha(),by},...v]);setProducts(v=>v.map(p=>{const it=purchase.items.find(x=>x.product.id===p.id);return it&&reason!==refundReasons[0]&&reason!==refundReasons[1]?{...p,stock:p.stock+it.quantity}:p}))};
const signIn=(a:Account)=>{setAccount(a);setRole(a.role)};
const signOut=()=>{setAccount(null);setRole("Cliente")};
return <C.Provider value={{role,setRole,cart,cartOpen,setCartOpen,add,remove,quantity,products,setProducts,orders,setOrders,purchases,placeOrder,account,signIn,signOut,whitelist,setWhitelist,posSales,registerPosSale,refunds,refundPurchase}}>{children}</C.Provider>}
export function useDzi(){const v=useContext(C);if(!v)throw new Error("DziProvider missing");return v}
