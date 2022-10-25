interface IAddress {
	country: string
	city: string
	street: string
}

export interface IShippingFields {
	email: string
	name: string
	address: IAddress
}

export interface IOption {
	label: string
	value: string
}
