import React, { useState, useEffect, useRef } from 'react';
//import { View, StyleSheet, Button, Alert } from "react-native";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
	// HINT: each "item" in our list names a name,
	// a boolean to tell if its been completed, and a quantity
	const [items, setItems] = useState([]);
	const [inputValue, setInputValue] = useState();
	const [totalItemCount, setTotalItemCount] = useState(0);
	
	const handleAdd = () => {

		if(inputValue != null ){

			const newItem = {
				itemName: inputValue,
				quantity: 1,
				valor: null,
				isSelected: false,
			};

			const newItems = [...items, newItem];
			
			setItems(newItems);
			setInputValue('');
			calculateTotal();
		}else{

			alert("O campo precisa de no minimo 3 caracteres para serem inseridos!!!")
		}
	};

	const handleQuantityIncrease = (index) => {
		const newItems = [...items];

		newItems[index].quantity+=1;

		setItems(newItems);
		calculateTotal();
	};

	const handleQuantityDecrease = (index) => {
		const newItems = [...items];

		newItems[index].quantity-=1;

		setItems(newItems);
		calculateTotal();
	};

	const toggleComplete = (index) => {
		const newItems = [...items];

		newItems[index].isSelected = !newItems[index].isSelected;

		setItems(newItems);
	};

	const calculateTotal = () => {
		const totalItemCount = items.reduce((total, item) => {
			return total + item.quantity;
		}, 0);

		setTotalItemCount(totalItemCount);
	};

	const handleChangeValueItem = (index, value) => {
		const _items = [...items];
		_items[index].valor = value;
		setItems(_items);
		
	}

	var total = items.reduce(getTotal, 0);
	function getTotal(total, item) {
		return total + (item.valor * item.quantity);
	};

	return (
		<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>
					<input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Adicione o produto...' />
					<FontAwesomeIcon icon={faPlus} onClick={() => handleAdd()} />
				</div>
				<div className='item-list'>
					{items.map((item, index) => (
						<div key={index} className='item-container'>
							<div className='item-name' onClick={() => toggleComplete(index)}>
								{item.isSelected ? (
									<React.Fragment>
										<FontAwesomeIcon icon={faCheckCircle} />
										<span className='completed'>{item.itemName}</span>
									</React.Fragment>
								) : (
									<React.Fragment>
										<FontAwesomeIcon icon={faCircle} />
										<span>{item.itemName}</span>
									</React.Fragment>
								)}
							</div>

							<div className='quantity'>
							<div className='valor-item-box'>
							R$ <input className='valor-item-input' placeholder='0,00' value={item.valor} onChange={(event) => { handleChangeValueItem(index, event.currentTarget.value) }}/>
							</div>
								<button>
									<FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
								</button>
								<span> {item.quantity} </span>
								<button>
									<FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
								</button>
							</div>
						</div>
					))}
				</div>
				<div className='total'>QTotal: {totalItemCount}</div>
				<div className='valor'>R$ {total.toFixed(2)}</div>
				

			</div>
		</div>
	);
};

export default App;
