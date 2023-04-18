const ssnIsValid = (props) => {
    var re = new RegExp(/^\d{3}-\d{2}-\d{4}$/);
    //console.log("ssnIsValid", re.test(props));
    return re.test(props);
   
}

export default ssnIsValid