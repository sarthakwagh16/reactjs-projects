
export default function TabButton({children, onSelect, isSelected}){

    /*

    */
    return <li><button className={isSelected ? 'active' : undefined} onClick={onSelect}>{children}</button></li>;
}

/*

In React, the children prop is used to pass content between the opening and closing tags of a custom component. React automatically recognizes this content and assigns it to the children prop of the component.

*/