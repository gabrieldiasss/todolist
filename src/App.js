import './styles.css';
import './global.css'
import { IoMdAdd } from 'react-icons/io'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MdOutlineClose } from 'react-icons/md'

function App() {

	const [task, setTask] = useState("")

	const [tasks, setTasks] = useState([])

	const handleAddTask = () => {

		if (task === "") {
			toast.error("Digite alguma task")
		} else {
			const idRandom = (num) => Math.floor(Math.random() * num)

			const newTask = { id: idRandom(102343), title: task, isComplete: false }

			setTasks([...tasks, newTask])

			setTask("")
		}

	}

	const handleToggleTaskCompletion = (id) => {

		const taskComplete = tasks.map(task => {
			if (task.id === id) {
				return { ...task, isComplete: !task.isComplete }
			}

			return task
		})

		setTasks(taskComplete)
	}

	const handleDelete = (id) => {
		setTasks(tasks.filter((remove) => remove.id !== id))
	}

	return (
		<div className="app">

			<ToastContainer />

			<div className='todo'>
				<div className='header'>
					<div className='input-fake' >
						<input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
					</div>

					<button onClick={handleAddTask} ><IoMdAdd /></button>
				</div>

				{tasks.map((task) => (
					<div key={task.id} className={task.isComplete ? 'task-container completed' : 'task-container'}>
						<div className='check-and-title' >
							<label className="checkbox-container">
								<input
									onClick={() => handleToggleTaskCompletion(task.id)}
									type="checkbox"
								/>

								<p className='checkmark'></p>
							</label>

							<p>{task.title}</p>
						</div>

						<div>
							<MdOutlineClose className='remove' onClick={() => handleDelete(task.id)} />
						</div>	
						
					</div>
				))}

			</div>
		</div>
	);
}

export default App;
