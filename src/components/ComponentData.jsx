

// working with props first way
/*
function ComponentData(props) {
  return (
    <li>
      <img src={props.image} alt={props.title} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
  );
}
  */



/*

second  way=

In React, when passing props to a functional component, you can use destructuring directly within the function’s parameter list to simplify access to individual props. Instead of accessing each prop with props.title, props.description, and props.image, you can directly extract them using destructuring.

*/

export default function ComponentData({title, description, image}) {
    return (
      <li>
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
      </li>
    );
  }