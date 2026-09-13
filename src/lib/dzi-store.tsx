import { createContext,useContext,useState,type ReactNode } from "react";
import { initialOrders,initialProducts,type Order,type Product,type Role } from "./dzi-data";
type CartItem={product:Product;quantity:number};
export type Purchase={id:string;date:string;items:CartItem[];total:number;status:"Pagado"|"Enviado"|"Entregado"};
type Store={role:Role;setRole:(r:Role)=>void;cart:CartItem[];cartOpen:boolean;setCartOpen:(v:boolean)=>void;add:(p:Product)=>void;remove:(id:string)=>void;quantity:(id:string,n:number)=>void;products:Product[];setProducts:React.Dispatch<React.SetStateAction<Product[]>>;orders:Order[];setOrders:React.Dispatch<React.SetStateAction<Order[]>>;purchases:Purchase[];placeOrder:(total:number)=>Purchase|null};
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
const placeOrder=(total:number)=>{if(cart.length===0)return null;const purchase:Purchase={id:`DZI-${1100+purchases.length}`,date:new Intl.DateTimeFormat("es-PE",{day:"2-digit",month:"short"}).format(new Date()),items:cart,total,status:"Pagado"};setPurchases(p=>[purchase,...p]);setCart([]);return purchase};
return <C.Provider value={{role,setRole,cart,cartOpen,setCartOpen,add,remove,quantity,products,setProducts,orders,setOrders,purchases,placeOrder}}>{children}</C.Provider>}
export function useDzi(){const v=useContext(C);if(!v)throw new Error("DziProvider missing");return v}
