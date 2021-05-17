function initValidator(handler) {
    return new Validator(document.querySelector('form[id="profile"]'), function (err, res) {
        console.log(res)
        console.log(err)
        if (res) {
            handler();
        }
    },
        {
            errorClassName: 'help-block'
        }
    );
}