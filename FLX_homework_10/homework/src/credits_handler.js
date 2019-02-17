function userCard(key) {
    let balance = 100,
        transactionLimit = 100,
        historyLogs = [],
        newOperationTime = new Date().toLocaleString('en-GB');
    
    function fnHistoryLogs(operationType, credits, operationTime) {
        historyLogs.push({
            operationType: operationType,
            credits: credits,
            operationTime: operationTime
        });
    }
    
    return {
        getCardOptions() {
            return {balance, transactionLimit, historyLogs, key};
        },
        
        putCredits(amount) {
            balance += amount;
            
            fnHistoryLogs('Received credits', amount, newOperationTime);
        },
        
        takeCredits(amount) {
                balance -= amount;
            
                fnHistoryLogs('Withdrawal of credits', amount, newOperationTime);
        },
        
        setTransactionLimit(amount) {
            transactionLimit = amount;
            
            fnHistoryLogs('Transaction limit change', amount, newOperationTime);
        },
        
        transferCredits(amount, usersCard) {
            const tax = 0.005,
                  amountAndTax = amount * tax + amount;
            
            if (amountAndTax > balance) {
                console.log('You can not transfer credits, because balance exceeded');
            } else if (amountAndTax > transactionLimit) {
                console.log('You can not transfer credits, because transaction limit exceeded');
            } else {
                this.takeCredits(amountAndTax);
                usersCard.putCredits(amount);
            }
        }
    };
} 

class UserAccount {
    constructor(name) {
        this.name = name;
        this.cards = [];
        this.limitOfCards = 3;
    }
    
    addCard() {
        if (this.cards.length < this.limitOfCards) {
            this.cards.push(userCard(this.cards.length + 1));
        } else {
            console.log('Reached the maximum number of cards from the user');
        }
    }
    
    getCardByKey(key) {
        return this.cards[key - 1];
    }
}