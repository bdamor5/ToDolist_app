import React,{useState,useEffect} from 'react';
import todo from './todo.svg';
import './Todo.css';

//to get data from local storage when we refresh our page , so that our todolist will not become empty
const getLocalItems = () =>{
    const todolists = localStorage.getItem('todolists');

    if(todolists){
        return JSON.parse(todolists);
    }else{
        return [];
    }
    
}

const Todo = () => {

    const [input , setInput] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggle, setToggle] = useState(false);
    const [editvaluebyid, setEditValueById] = useState('');

    //Adding data to local storage using useEffect
    useEffect(()=>{
        localStorage.setItem('todolists', JSON.stringify(items));

    },[items]);

    const addItem = () =>{
        if(!input){
            alert('Please Enter A Value');

        }else if(input && toggle){
            setItems(
                items.map((curr)=>{
                    if(curr.id === editvaluebyid ){
                        return {...curr, name:input}
                    }
                    return curr;
                })
            ); 
            setToggle(false); //now again show add button as we are done with editing

            setInput(''); //this value will be showed in the input field
            
            setEditValueById('');      
        }else{
            const inputWithID = {
                id : new Date().getTime().toString(),
                name : input
            }

             setItems([...items, inputWithID]);
             setInput('');
            
        }
    }

//To edit an item - 
// Step 1 : Get the id of the data which the user clicked on
// Step 2 : Set a toggle state so that the add button is changed to an edit button
// Step 3 : Now update the value of the input field i.e setInput state with the new edited value
// Step 4 : To pass the current element ID to new state for reference 
    const editItem = (id)=>{
            const editItem = items.find((curr)=>{
                return curr.id === id;
            });

            setToggle(true); //show edit button

            setInput(editItem.name); //this value will be showed in the input field
            
            setEditValueById(id); //pass the id of which we edited the value
        }

    const deleteItem = (id) =>{
            const filterItems = items.filter((curr)=>{
                return curr.id !== id;
            });
            setItems(filterItems);
    }

    const RemoveAll = () =>{
        setItems([]);
    }

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                <figure>
                    <img src={todo} alt="todolist" />
                    <figcaption> Add Your Items Here</figcaption>
                </figure>

                <div className='addItems'>
                    <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Add Items'/>
                    {
                        toggle 
                        ? <i className="fa fa-edit add-btn" title='Edit Item' onClick={addItem}></i>
                        :<i className="fa fa-plus add-btn" title='Add Item' onClick={addItem}></i>
        
                    }
                    
                </div>

                <div className='showItems'>
                {
                    items.map((curr,i)=>{
                        return <div className='eachItem' key={curr.id}>
                                    <h3>{curr.name}</h3>
                                    <i className='far fa-edit add-btn edit' title='Edit Item' onClick={()=>editItem(curr.id)} ></i>                                        
                                    <i className='far fa-trash-alt add-btn' title='Delete Item' onClick={()=>deleteItem(curr.id)} ></i>                                   
                                </div>
                    })
                }
                    
                </div>

                <div className='showItems'>
                    <button className='btn effect04' data-sm-link-text='Remove All' onClick={RemoveAll} ><span>CHECK LIST</span></button>
                </div>

                </div>
            </div>
        </>
    )
}

export default Todo
