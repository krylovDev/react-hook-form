import React, {useEffect} from 'react';
import {
	Controller,
	SubmitHandler,
	useForm
} from 'react-hook-form';
import ReactSelect, {SingleValue} from 'react-select';
import './App.css';
import {IOption, IShippingFields} from './types/Form.interface'

const options: IOption[] = [
	{value: 'Russia', label: 'Russia'},
	{value: 'USA', label: 'USA'},
	{value: 'Germany', label: 'Germany'},
]

const getValue = (value: SingleValue<string | IOption>) => {
	return value
		? options.find((option) => option.value === value)
		: ''
}

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
		control,
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
				
				<Controller
					control={control}
					// Поле, которое будем менять
					name={'address.country'}
					// Проверка
					rules={{required: 'Country is required field'}}
					render={(
						{
							field: {value,onChange},
							fieldState: {error}
						}
					) => (
						<>
							<ReactSelect
								placeholder='countries'
								options={options}
								value={getValue(value)}
								onChange={(value: SingleValue<string | IOption>) => onChange(value)}
							/>
							{error &&
								<div style={{color: 'red'}}>
									{error.message}
								</div>
							}
						</>
					)}
				/>
				
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
				>Заполнить поля
				</button>
			</div>
		</>
	);
}

export default App;
