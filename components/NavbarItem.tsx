import React from "react";
interface NavbarItemProps {
    label: String;
    url:string;
}
const NavbarItem:React.FC<NavbarItemProps> = ({label,url}) =>{
    return (

        <a className="text-white cursor-pointer hover:text-gray-300 transition" href= {url}>
             {label}
             
        </a>
    )
};
export default NavbarItem;