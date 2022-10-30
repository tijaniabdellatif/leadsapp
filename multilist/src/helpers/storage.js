export const addUserToLocalstorage = (user) => {

    localStorage.setItem('user',JSON.stringify(user));
}


export const removeUserFromLocalstorage = () => {

    localStorage.removeItem('user');

}

export const getUserFromLocalStorage = () => {
     const result = localStorage.getItem('user');
     return result ? JSON.parse(result) : null;
}