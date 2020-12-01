//BUDGET CONTROLLER
var budgetController = (function() {

    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function(type, des, val) {
            let newItem, ID;
            let array = data.allItems[type];

            if (array.length > 0) {
                ID = array[array.length - 1].id + 1;
            } else {
                ID = 0;
            }

            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            array.push(newItem);

            console.log(data);

            return newItem;
        }
    }
})();

//UI CONTROLLER
var UIController = (function() {
    let DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };
    
    return {
        getInput: function() {
            return {
                //will be either inc or exp
                type : document.querySelector(DOMstrings.inputType).value, 
                description : document.querySelector(DOMstrings.inputDescription).value,
                value : document.querySelector(DOMstrings.inputValue).value
            };
        },
        addListItem: function(obj, type) {
            let html, element;

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html =  `<div class="item clearfix" id="income-${obj.id}">
                            <div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">${obj.value}</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = `<div class="item clearfix" id="expense-${obj.id}">
                            <div class="item__description">${obj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">${obj.value}</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`
            }

            document.querySelector(element).insertAdjacentHTML('beforeend', html);
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    };

})();

//GLOBAL APP CONTROLLER
var appController = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        let DOM = UIController.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(e) {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem();
            }
        });
    };

    function ctrlAddItem() {
        //get the field input data
        let input = UIController.getInput();

        //add the item to the budget controller
        let newItem = budgetController.addItem(input.type, input.description, input.value);
        
        //add the item to the UI
        UIController.addListItem(newItem, input.type);

        //calculate the budget
        
        //display the budget on the UI
    };

    return {
        init: function() {
            console.log('Application has started');
            setupEventListeners();
        }
    }
})(budgetController, UIController);

appController.init();

