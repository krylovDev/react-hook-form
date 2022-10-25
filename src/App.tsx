import React, {useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import './App.css';
import {IShippingFields} from './types/Form.interface'

function App() {
	
	const {
		register,
		handleSubmit,
		// errors: Ошибки всех полей
		formState: {
			errors,
			isSubmitting,
			isSubmitSuccessful,
			// etc
		},
		// reset: сброс всех полей
		reset,
		// resetField: сброс конкретного поля
		resetField,
		getValues,
		// getFieldState: Хранит объект с инфой о поле {error, invalid, isDirty, isTouched}
		getFieldState,
		// watch: Позволяет отслеживать поля формы.
		// value={все поля}, name: текущее поле, type: событие
		watch,
		// Позволяет задать самим value
		setValue,
	} = useForm<IShippingFields>({
		// defaultValues: {} // Дефолтные значения в таблице
		// listener state: onSubmit, onBlur, onTouched, onChange, all
		mode: 'onChange'
	})
	
	const onSubmit: SubmitHandler<IShippingFields> = (data) => {
		alert(`your name: ${data.name}`)
		console.log(data)
		reset()
	}
	
/* // Подписка на события
	useEffect(() => {
		const subscribe = watch((value, {name,type}) => console.log(value,name,type))
		return subscribe.unsubscribe()
	},[watch])
*/
	
	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				style={{display: 'flex', flexDirection: 'column', width: '50vw'}}
			>
				<input
					type="text"
					placeholder='Name'
					{
						...register("name", {
							required: 'Name is required field',
						})}
				/>
				{errors.name &&
					<div style={{color: 'red'}}>
						{errors.name.message}
					</div>
				}
				
				<input
					type="text"
					placeholder='Email'
					{
						...register("email", {
							required: 'Email is required field',
							pattern: {
								value: /^\S+@\S+\.\S+$/,
								message: 'Please enter valid email'
							}
						})}
				/>
				{errors.email &&
					<div style={{color: 'red'}}>
						{errors.email.message}
					</div>
				}
				<div>
					<button>Отправить</button>
				</div>
			</form>
			<div>
				<button
					onClick={() => {
						setValue('name', 'Vladimir')
						setValue('email', 'test@mail.ru')
					}}
				>Заполнить поля</button>
			</div>
		</>
	);
}

export default App;
