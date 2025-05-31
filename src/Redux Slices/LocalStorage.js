
// fetching Cart Data from local storage 
export const cartDatafromLS = () =>{
    try {
     const data = localStorage.getItem('cartItems')
        if (data) { 
            return JSON.parse(data)
            }
        return null
    } catch (error) {
        console.error(error)
    }
}

//saving data in local storage
export const saveDatatoLS = (state) =>{
    try {
        const cartData = JSON.stringify(state);
    localStorage.setItem('cartItems', cartData)
    } catch (error) {
         console.error(error)
    }
    
}
