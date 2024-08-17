
let selectedRow1 = null;
let selectedRow2 = null;
let returnSelection = false;
let retRows = localStorage.getItem('retn-rows-added'); 


function logSelectedRowValues(selectedRow, tableName) {
    const values = selectedRow.find('td').map((index, td) => {
        return index === 0 ? $(td).html().split('<br>')[0].trim() : $(td).html();
    }).get();

    const [trainNo, yourStation, departureTime, yourDestination, destinationTime, frequency, trainType, availableClasses, priceHtml] = values;
    const [price1, price2, price3] = priceHtml.split('<br>').map(price => price.trim());

    localStorage.setItem(`${tableName}_trainNo`, trainNo);
    localStorage.setItem(`${tableName}_yourStation`, yourStation);
    localStorage.setItem(`${tableName}_departureTime`, departureTime);
    localStorage.setItem(`${tableName}_yourDestination`, yourDestination);
    localStorage.setItem(`${tableName}_destinationTime`, destinationTime);
    localStorage.setItem(`${tableName}_frequency`, frequency);
    localStorage.setItem(`${tableName}_trainType`, trainType);
    localStorage.setItem(`${tableName}_availableClasses`, availableClasses);
    localStorage.setItem(`${tableName}_price1`, price1);
    localStorage.setItem(`${tableName}_price2`, price2);
    localStorage.setItem(`${tableName}_price3`, price3);
}


$("#main-table").on('click', '.table-row', function() {
    $("#main-table tbody tr").removeClass("selected-row"); 
    $(this).addClass("selected-row"); 
    selectedRow1 = $(this); 
});


$("#return-table").on('click', '.table-row', function() {
    $("#return-table tbody tr").removeClass("selected-row");
    $(this).addClass("selected-row"); 
    selectedRow2 = $(this); 
    
});


$('#final-proceed-btn').on('click', function() {
    if (!selectedRow1) {
        alert('Please select a oneway train.'); 
    }
     else {
        logSelectedRowValues(selectedRow1, 'main'); 
        if (selectedRow2) {
            logSelectedRowValues(selectedRow2, 'return');
            returnSelection = true;

            } 

        
        const departureDate = $('#start-date').val();
        const numPassengers = $('#no-of-passangers').val();
        const returnDate = $('#return-date').val();

        
        localStorage.setItem('departureDate', departureDate);
        localStorage.setItem('numPassengers', numPassengers);
        localStorage.setItem('returnDate', returnDate);
        localStorage.setItem('retSelected',returnSelection);

        window.location.href = 'class_selection.html';
    }
});
