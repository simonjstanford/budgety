var budgetController = (function() {

    return {

    }
})();

var UIController = (function() {

})();

var appController = (function(budgetCtrl, UICtrl) {

    function ctrlAddItem() {
        //get the field input data
        
        //add the item to the budget controller
        
        //add the item to the UI
        
        //calculate the budget
        
        //display the budget on the UI
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function(e) {
        if (e.keyCode === 13 || e.which === 13) {
            ctrlAddItem();
        }
    });

})(budgetController, UIController);

