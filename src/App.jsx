import { useState } from 'react';
//import propImg from './assets/components.png'
import { CORE_CONCEPTS } from './data';
import Header from './components/Header/Header';
import ComponentData from './components/ComponentData';
import TabButton from './components/TabButton';
import {EXAMPLES} from './data';


function App() {

  const [selectedItem, setSelectedItem] = useState();

  function handleSelect(selectedButton){
    // here, selectedButton -> 'components', 'props', 'jsx', 'state' (from main menu)
    setSelectedItem(selectedButton);
    
    
  }
  return (
    <div>
      <Header />
      <main>
        <h2>Time to get started!</h2>
        <section id="core-concepts">
          <h2>Core Concepts</h2>
    
          <ul>
{/*             
// way 01: render items by accessing the object items
            <ComponentData
              title={CORE_CONCEPTS[0].title}
              description={CORE_CONCEPTS[0].description}
              image={CORE_CONCEPTS[0].image}
            />
// way 02: render items using spread operator
            <ComponentData {...CORE_CONCEPTS[1]} />
            <ComponentData {...CORE_CONCEPTS[2]} />
            <ComponentData {...CORE_CONCEPTS[3]} /> */}

{/* way 03: render items using map() function and spread operator */}
            
            {CORE_CONCEPTS.map((renderItem) => <ComponentData key = {renderItem.title} {...renderItem}  />)}
          </ul>
          




        </section>

        {/* section for example menu buttons */}
        <section id="examples">
          <h2>Menu</h2>
          <menu>
            <TabButton isSelected = {selectedItem==='components'} onSelect={()=>handleSelect('components')}>Component</TabButton>
            <TabButton isSelected = {selectedItem==='jsx'} onSelect={()=>handleSelect('jsx')}>JSX</TabButton>
            <TabButton isSelected = {selectedItem==='props'} onSelect={()=>handleSelect('props')}>Props</TabButton>
            <TabButton isSelected = {selectedItem==='state'} onSelect={()=>handleSelect('state')}>States</TabButton>
          </menu>
          
            {selectedItem ? <div id='tab-content'><h3>{EXAMPLES[selectedItem].title}</h3>
            <p>{EXAMPLES[selectedItem].description}</p>
            <pre>
              <code>{EXAMPLES[selectedItem].code}</code>
            </pre></div> : <p>Please select the menu</p>}
            
          
        </section>
      </main>
    </div>
  );
}

export default App;
