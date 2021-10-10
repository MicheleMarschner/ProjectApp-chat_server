module.exports = (event, text, username ) => {
    
    return {
        event: event, 
        payload: {
            text: text,
            username: username,
            time: new Date(),
        }
    }
}