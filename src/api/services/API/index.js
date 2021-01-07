import { get, post, put, destroy } from 'api/config';

export const Users = {
    index: () =>
        get('/users'),
    create: (params) =>
        post('/signup', params),
    login: (params) =>
        post('/signin', params)
}

export const IncomeTypes = {
    index: () =>
        get('/incomeTypes')
}

export const ExpenseTypes = {
    index: () =>
        get('/expenseTypes')
}

export const Expenses = {
    index: () =>
        get('/expenses'),
    create: (params) =>
        post('/expenses', params),
    update: (params) =>
        put(`expenses/${params.id}`, params),
    remove: (params) =>
        destroy(`/expenses/${params}`)
}

export const Incomes = {
    index: () =>
        get('/incomes'),
    create: (params) =>
        post('/incomes', params),
    update: (params) =>
        put(`incomes/${params.id}`, params),
    remove: (params) =>
        destroy(`/incomes/${params}`)
}

export const Currencies = {
    index: () =>
        get('/currencies/all')
}

