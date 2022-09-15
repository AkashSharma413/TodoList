import React, { useState, useEffect } from 'react'
import "./style.css"

const Todo = () => {

    // Get the data form Local Storage
    const getLocalData = () => {
        const list = localStorage.getItem("MyToDoList");

        if (list) {
            return JSON.parse(list);
        } else {
            return [];
        }
    }

    const [inputData, setinputData] = useState("");
    const [items, setitems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // To Add the items
    const addItem = () => {
        if (!inputData) {
            alert("Please add the items");
        } else if (inputData && toggleButton) {
            setitems(
                items.map((currElem) => {
                    if (currElem.id === isEditItem) {
                        return { ...items, name: inputData }
                    }
                    return currElem;
                })
            );
            setinputData("");
            setIsEditItem(null);
            setToggleButton(false);
        }
        else {
            const newInputData = {
                id: new Date().getTime().toString(),
                name: inputData
            }
            setitems([...items, newInputData]);
            setinputData("");
        }
    }

    // To Edit the items
    const editItem = (index) => {
        const todo_item_edited = items.find((currElem) => {
            return currElem.id === index;
        })
        setinputData(todo_item_edited.name);
        setIsEditItem(index);
        setToggleButton(true);
    }

    // To Delete the items
    const deleteItems = (index) => {
        const newUpdatedItems = items.filter((currElem) => {
            return currElem.id !== index;
        })
        setitems(newUpdatedItems);
    }

    // To Remove all the items
    const removeAll = () => {
        setitems([]);
    }

    // Adding Items into Local Storage
    useEffect(() => {
        localStorage.setItem("MyToDoList", JSON.stringify(items));
    }, [items])

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src='./images/todo.svg' alt='todologo' />
                        <figcaption>Add your list here ✌</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type='text' placeholder='✍ Add Item' className='form-control'
                            value={inputData} onChange={(e) => setinputData(e.target.value)} />
                        {toggleButton ? (
                            <i class="fa fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i class="fa fa-plus add-btn" onClick={addItem}></i>
                        )}

                    </div>

                    {/* Show our items */}
                    <div className='showItems'>
                        {
                            items.map((currElem, index) => {
                                return (
                                    <>
                                        <div className='eachItem' key={currElem.id}>
                                            <h3>{currElem.name}</h3>
                                            <div className='todo-btn'>
                                                <i class="far fa-edit add-btn" onClick={() => editItem(currElem.id)}></i>
                                                <i class="far fa-trash-alt add-btn" onClick={() => deleteItems(currElem.id)}></i>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            )
                        }
                    </div>

                    {/* Remove all check list button */}
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text='Remove All' onClick={removeAll}>
                            <span>Check List</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo