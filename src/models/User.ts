export type TypeUser = {
    id?: number,
    name?: string,
    email: string,
    password: string
}

export const User: TypeUser = {
    id: 1,
    name: 'Bryan',
    email: "bryan@email.com",
    password: "12345"
}