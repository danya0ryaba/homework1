import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'


type GreetingContainerPropsType = {
    users: UserType[]
    addUserCallback: (name: string) => void
}

export const pureAddUser = (name: string, setError: Function, setName: Function, addUserCallback: (name: string) => void) => {
    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут

    if (name.trim() === '') setError('Ошибка! Введите имя!')
    if (name.trim() !== '') {
        addUserCallback(name)
        setName('')
    }
}

export const pureOnBlur = (name: string, setError: Function) => {
    if (name.trim() === '') setError('Ошибка! Введите имя!')
}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: () => void) => {
    if (e.key === 'Enter') addUser()
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {
// type NameType= string|undefined

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
}) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('') // need to fix any
    const [error, setError] = useState<string>('') // need to fix any

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length;
    const lastUserName = users[users.length - 1]?.name

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
