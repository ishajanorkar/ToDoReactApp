import React, {useState, useEffect} from 'react';
import './App.css';
import {TiDelete} from 'react-icons/ti';
import {AiFillCheckCircle} from 'react-icons/ai';
function App () {
  const [allTasks, setallTasks] = useState ([]);
  const [newTaskTitle, setnewTaskTitle] = useState ('');
  const [newDescription, setNewDescription] = useState ('');
  const [completedTasks, setcompletedTasks] = useState ([]);
  const [isCompletedScreen, setIsCompletedScreen] = useState (false);

  const handleAddNewTasks = () => {
    let newTaskObj = {
      title: newTaskTitle,
      description: newDescription,
    };
    // console.log (newTaskObj);
    let updatedTaskArr = [...allTasks];
    updatedTaskArr.push (newTaskObj);
    // console.log (updatedTaskArr);
    setallTasks (updatedTaskArr);
    localStorage.setItem ('tasklist', JSON.stringify (updatedTaskArr));
    setNewDescription ('');
    setnewTaskTitle ('');
  };

  useEffect (() => {
    let savedTasks = JSON.parse (localStorage.getItem ('tasklist'));
    let savedcompletedTasks = JSON.parse (
      localStorage.getItem ('completedTasks')
    );
    if (savedTasks) {
      setallTasks (savedTasks);
    }

    if (savedcompletedTasks) {
      setcompletedTasks (savedcompletedTasks);
    }
  }, []);

  const handleTasksDelete = index => {
    let reducedTasks = [...allTasks];
    reducedTasks.splice (index);
    // console.log (index);

    // console.log (reducedTasks);
    localStorage.setItem ('tasklist', JSON.stringify (reducedTasks));
    setallTasks (reducedTasks);
  };

  const handleCompletedTasksDelete = index => {
    let reducedcompletedTasks = [...completedTasks];
    reducedcompletedTasks.splice (index);
    // console.log (reducedcompletedTasks);
    localStorage.setItem (
      'completedTasks',
      JSON.stringify (reducedcompletedTasks)
    );
    setcompletedTasks (reducedcompletedTasks);
  };

  const handleComplete = index => {
    const date = new Date ();
    var dd = date.getDate ();
    var mm = date.getMonth () + 1;
    var yyyy = date.getFullYear ();
    var hh = date.getHours ();
    var minutes = date.getMinutes ();
    var ss = date.getSeconds ();
    var finalDate =
      dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;

    let filteredTasks = {
      ...allTasks[index],
      completedOn: finalDate,
    };

    // console.log (filteredTasks);

    let updatedCompletedList = [...completedTasks, filteredTasks];
    console.log (updatedCompletedList);
    setcompletedTasks (updatedCompletedList);
    localStorage.setItem (
      'completedTasks',
      JSON.stringify (updatedCompletedList)
    );
    // console.log (index);

    handleTasksDelete (index);
  };

  return (
    <div className="App">
      <h1>Today's Checklist</h1>

      <div className="todo-wrapper">

        <div className="todo-input">
          <div className="todo-input-item">
            <label>Task Title:</label>
            <input
              type="text"
              value={newTaskTitle}
              onChange={e => setnewTaskTitle (e.target.value)}
              placeholder="Enter task title.."
            />
          </div>
          <div className="todo-input-item">
            <label> Task Description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={e => setNewDescription (e.target.value)}
              placeholder="Enter task description.."
            />
          </div>
          <div className="todo-input-item">
            <button
              className="primary-btn"
              type="button"
              onClick={handleAddNewTasks}
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
            onClick={() => setIsCompletedScreen (false)}
          >
            To-Do
          </button>
          <button
            className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
            onClick={() => setIsCompletedScreen (true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">

          {isCompletedScreen === false &&
            allTasks.map ((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                </div>
                <div>
                  <TiDelete
                    title="Delete?"
                    className="icon"
                    onClick={() => handleTasksDelete (index)}
                  />
                  <AiFillCheckCircle
                    title="Completed?"
                    className=" check-icon"
                    onClick={() => handleComplete (index)}
                  />
                </div>
              </div>
            ))}

          {isCompletedScreen === true &&
            completedTasks.map ((item, index) => (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p> <i>Completed at: {item.completedOn}</i></p>
                </div>
                <div>
                  <TiDelete
                    className="icon"
                    onClick={() => handleCompletedTasksDelete (index)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;