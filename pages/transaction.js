import { store } from '../js/global.js';

export const beforeTransactionRender = () => {
    const transactionId = window.location.pathname.split("/").pop();
    const transaction = store.transactions?.find(trans => trans.id = transactionId);
    const result = { transaction };

    return result;
}

export const renderTransaction = ({ transaction }) => {
    console.log('DETAILS', transaction);
    return (`
        <h1>transaction ${transaction.id}</h1>
        <div>Name: ${transaction.name}</div>
    `)
};

export const initTransaction = () => {console.log('elo1')};
export const cleanupTransaction = () => {console.log('elo2')};