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
