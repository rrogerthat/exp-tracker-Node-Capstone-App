let token; //global variable

//To display totals for each expense category
function displayExpTotals() {
	const categoryArr = ['gas', 'restaurants', 'entertainment', 'groceries', 'medical', 'misc'];

	for (i = 0; i < categoryArr.length; i++) {
		$.ajax({
			type: 'GET',
			url: `/items/${categoryArr[i]}`,	
			dataType: 'json',
			headers: {Authorization: `Bearer ${token}`},
			success: function(data) {
				const eachObj = data.expenses[0];
				let totalExp = 0; let totalExp2 = 0; let totalExp3 = 0;	let totalExp4 = 0; let totalExp5 = 0; let totalExp6 = 0;
				
				if (eachObj === undefined) { //this category total taken care of in displayAllTotal() in if statement.
					console.log('One more more category has no expenses');
				} else if (eachObj.category === 'gas') {		
					for (index in data.expenses) {
						totalExp += Number(data.expenses[index].cost);
					}								  //formats to contain commas and 2 decimals
					$('.total-1').html('$' + totalExp.toLocaleString(undefined, { minimumFractionDigits: 2}));
				} else if (eachObj.category === 'restaurants') {					
					for (index in data.expenses) {
						totalExp2 += Number(data.expenses[index].cost);
					}
					$('.total-2').html('$' + totalExp2.toLocaleString(undefined, { minimumFractionDigits: 2 }));
				} else if (eachObj.category === 'entertainment') {				
					for (index in data.expenses) {
						totalExp3 += Number(data.expenses[index].cost);
					}
					$('.total-3').html('$' + totalExp3.toLocaleString(undefined, { minimumFractionDigits: 2 })); 
				} else if (eachObj.category === 'groceries') {				
					for (index in data.expenses) {
						totalExp4 += Number(data.expenses[index].cost);
					}
					$('.total-4').html('$' + totalExp4.toLocaleString(undefined, { minimumFractionDigits: 2 }));
				} else if (eachObj.category === 'medical') {				
					for (index in data.expenses) {
						totalExp5 += Number(data.expenses[index].cost);
					}
					$('.total-5').html('$' + totalExp5.toLocaleString(undefined, { minimumFractionDigits: 2 }));
				} else if (eachObj.category === 'misc') {				
					for (index in data.expenses) {
						totalExp6 += Number(data.expenses[index].cost);
					}
					$('.total-6').html('$' + totalExp6.toLocaleString(undefined, { minimumFractionDigits: 2 }));
				}
			}
		})
	}
};

//tally up ALL expenses
function displayAllTotal() {
	$.ajax({
		type: 'GET',
		url: '/items',	
		dataType: 'json',
		headers: {Authorization: `Bearer ${token}`},
		success: function(data) {
			// console.log(data.expenses);
			let totalExp7 = 0;
			for (index in data.expenses) {
				totalExp7 += Number(data.expenses[index].cost);
			}
			$('.total-7').html('$' + totalExp7.toLocaleString(undefined, { minimumFractionDigits: 2 }));
			//if you do not find specific category, display $0.00 for that category
			//an issue since if u delete last exp in its category, displayExpTotal() will be undefined for that category
			//and not function properly with category totals display	
			if ( !(data.expenses.find(item => item.category === 'gas')) ) { //item is each obj in array							
				$('.total-1').html('$0.00');
				$('.expense-items-1').html(`<p>Currently no expenditures here.</p>`); //what makes it display on 1st app load	
				$('.detailsBtn-1').text('Hide Details');
				$('.expense-items-1').data().expanded = true;
			} 
			if ( !(data.expenses.find(item => item.category === 'restaurants')) ) { 						
				$('.total-2').html('$0.00');
				$('.expense-items-2').html(`<p>Currently no expenditures here.</p>`);	
				$('.detailsBtn-2').text('Hide Details');
				$('.expense-items-2').data().expanded = true;
			}
			if ( !(data.expenses.find(item => item.category === 'entertainment')) ) { 						
				$('.total-3').html('$0.00');
				$('.expense-items-3').html(`<p>Currently no expenditures here.</p>`);	
				$('.detailsBtn-3').text('Hide Details');
				$('.expense-items-3').data().expanded = true;
			}
			if ( !(data.expenses.find(item => item.category === 'groceries')) ) {								
				$('.total-4').html('$0.00');
				$('.expense-items-4').html(`<p>Currently no expenditures here.</p>`);	
				$('.detailsBtn-4').text('Hide Details');
				$('.expense-items-4').data().expanded = true;
			}
			if ( !(data.expenses.find(item => item.category === 'medical')) ) {								
				$('.total-5').html('$0.00');
				$('.expense-items-5').html(`<p>Currently no expenditures here.</p>`);	
				$('.detailsBtn-5').text('Hide Details');
				$('.expense-items-5').data().expanded = true;
			}
			if ( !(data.expenses.find(item => item.category === 'misc')) ) {								
				$('.total-6').html('$0.00');
				$('.expense-items-6').html(`<p>Currently no expenditures here.</p>`);	
				$('.detailsBtn-6').text('Hide Details');
				$('.expense-items-6').data().expanded = true;
			}
		}
	})
};

//display list of expenses for each category
function displayGasExpenses() {
	$('.expense-list').on('click', '.detailsBtn-1', function(event) {
		let dataAttr = $('.expense-items-1').data().expanded;

		$.ajax({
			type: 'GET',
			url: '/items/gas',
			dataType: 'json',
			headers: {Authorization: `Bearer ${token}`},
			success: function(data) {
				if (data.expenses.length === 0 && dataAttr === false) {
					$('.expense-items-1').html(`<p>Currently no expenditures here.</p>`);
					$('.detailsBtn-1').text('Hide Details');
					$('.expense-items-1').data().expanded = true;
				} else if (dataAttr === false) { //check data attr value before displaying.
					$('.detailsBtn-1').text('Hide Details');
					for (index in data.expenses) {
						$('.expense-items-1').append(
						`<p><span class='expDate'>${data.expenses[index].date}</span>
						<span class='expDescr'>${data.expenses[index].description}</span>
						<span class='expCost'>${data.expenses[index].cost}</span> 
						<span class='expCategory' hidden>${data.expenses[index].category}</span> 
						<button class='editBtn' type='submit' role='button'>Edit</button>
						<button class='delBtn' type='submit' role='button'>Delete</button>
						<span class='expId' hidden>${data.expenses[index].created}</span></p>`); 
					}
					$('.expense-items-1').data().expanded = true; //change data attr to true in order to hide exp details.
				} else {	//hide exp details and set data attr to false
					$('.expense-items-1').empty().data().expanded = false;
					$('.detailsBtn-1').text('Show Details');
				}
			}
		})
	});
};

function displayRestaurantExpenses() {
	$('.expense-list').on('click', '.detailsBtn-2', function(event) {
		let dataAttr = $('.expense-items-2').data().expanded;

		$.ajax({
			type: 'GET',
			url: '/items/restaurants',
			dataType: 'json',
			headers: {Authorization: `Bearer ${token}`},
			success: function(data) {
				if (data.expenses.length === 0 && dataAttr === false) {
					$('.expense-items-2').html(`<p>Currently no expenditures here.</p>`);
					$('.detailsBtn-2').text('Hide Details');
					$('.expense-items-2').data().expanded = true;
				} else if (dataAttr === false) { 
					$('.detailsBtn-2').text('Hide Details');
					for (index in data.expenses) {
						$('.expense-items-2').append(	
						`<p><span class='expDate'>${data.expenses[index].date}</span>
						<span class='expDescr'>${data.expenses[index].description}</span>
						<span class='expCost'>${data.expenses[index].cost}</span>
						<span class='expCategory' hidden>${data.expenses[index].category}</span> 
						<button class='editBtn' type='submit' role='button'>Edit</button> 
						<button class='delBtn' type='submit' role='button'>Delete</button>
						<span class='expId' hidden>${data.expenses[index].created}</span></p>`);
					}
					$('.expense-items-2').data().expanded = true; 
				} else {
					$('.expense-items-2').empty().data().expanded = false;
					$('.detailsBtn-2').text('Show Details');
				}
			}
		}) 
	});
};

function displayEntertainmentExpenses() {
	$('.expense-list').on('click', '.detailsBtn-3', function(event) {
		let dataAttr = $('.expense-items-3').data().expanded;

		$.ajax({
			type: 'GET',
			url: '/items/entertainment',
			dataType: 'json',
			headers: {Authorization: `Bearer ${token}`},
			success: function(data) {
				if (data.expenses.length === 0 && dataAttr === false) {
					$('.expense-items-3').html(`<p>Currently no expenditures here.</p>`);
					$('.detailsBtn-3').text('Hide Details');
					$('.expense-items-3').data().expanded = true;
				} else if (dataAttr === false) {
					$('.detailsBtn-3').text('Hide Details');
					for (index in data.expenses) {
						$('.expense-items-3').append(
						`<p><span class='expDate'>${data.expenses[index].date}</span>
						<span class='expDescr'>${data.expenses[index].description}</span>
						<span class='expCost'>${data.expenses[index].cost}</span>
						<span class='expCategory' hidden>${data.expenses[index].category}</span> 
						<button class='editBtn' type='submit' role='button'>Edit</button>
						<button class='delBtn' type='submit' role='button'>Delete</button>
						<span class='expId' hidden>${data.expenses[index].created}</span></p>`);
					}
					$('.expense-items-3').data().expanded = true;
				} else {
					$('.expense-items-3').empty().data().expanded = false;
					$('.detailsBtn-3').text('Show Details');
				}
			}
		})
	});
};

function displayGroceryExpenses() {
	$('.expense-list').on('click', '.detailsBtn-4', function(event) {
		let dataAttr = $('.expense-items-4').data().expanded;

		$.ajax({
			type: 'GET',
			url: '/items/groceries',
			dataType: 'json',
			headers: {Authorization: `Bearer ${token}`},
			success: function(data) {
				if (data.expenses.length === 0 && dataAttr === false) {
					$('.expense-items-4').html(`<p>Currently no expenditures here.</p>`);
					$('.detailsBtn-4').text('Hide Details');
					$('.expense-items-4').data().expanded = true;
				} else if (dataAttr === false) {
					$('.detailsBtn-4').text('Hide Details');
					for (index in data.expenses) {
						$('.expense-items-4').append(
						`<p><span class='expDate'>${data.expenses[index].date}</span>
						<span class='expDescr'>${data.expenses[index].description}</span>
						<span class='expCost'>${data.expenses[index].cost}</span>
						<span class='expCategory' hidden>${data.expenses[index].category}</span> 
						<button class='editBtn' type='submit' role='button'>Edit</button>
						<button class='delBtn' type='submit' role='button'>Delete</button>
						<span class='expId' hidden>${data.expenses[index].created}</span></p>`);
					}
					$('.expense-items-4').data().expanded = true;
				} else {
					$('.expense-items-4').empty().data().expanded = false;
					$('.detailsBtn-4').text('Show Details');
				}
			}
		})
	});
};

function displayMedicalExpenses() {
	$('.expense-list').on('click', '.detailsBtn-5', function(event) {
		let dataAttr = $('.expense-items-5').data().expanded;

		$.ajax({
			type: 'GET',
			url: '/items/medical',
			dataType: 'json',
			headers: {Authorization: `Bearer ${token}`},
			success: function(data) {
				if (data.expenses.length === 0 && dataAttr === false) {
					$('.expense-items-5').html(`<p>Currently no expenditures here.</p>`);
					$('.detailsBtn-5').text('Hide Details');
					$('.expense-items-5').data().expanded = true;
				} else if (dataAttr === false) {
					$('.detailsBtn-5').text('Hide Details');
					for (index in data.expenses) {
						$('.expense-items-5').append(
						`<p><span class='expDate'>${data.expenses[index].date}</span>
						<span class='expDescr'>${data.expenses[index].description}</span>
						<span class='expCost'>${data.expenses[index].cost}</span> 
						<span class='expCategory' hidden>${data.expenses[index].category}</span> 
						<button class='editBtn' type='submit' role='button'>Edit</button>
						<button class='delBtn' type='submit' role='button'>Delete</button>
						<span class='expId' hidden>${data.expenses[index].created}</span></p>`);
					}
					$('.expense-items-5').data().expanded = true;
				} else {
					$('.expense-items-5').empty().data().expanded = false;
					$('.detailsBtn-5').text('Show Details');
				}
			}
		})
	});
};

function displayMiscExpenses() {
	$('.expense-list').on('click', '.detailsBtn-6', function(event) {
		let dataAttr = $('.expense-items-6').data().expanded;

		$.ajax({
			type: 'GET',
			url: '/items/misc',
			dataType: 'json',
			headers: {Authorization: `Bearer ${token}`},
			success: function(data) {
				if (data.expenses.length === 0 && dataAttr === false) {
					$('.expense-items-6').html(`<p>Currently no expenditures here.</p>`);
					$('.detailsBtn-6').text('Hide Details');
					$('.expense-items-6').data().expanded = true;
				} else if (dataAttr === false) {
					$('.detailsBtn-6').text('Hide Details');
					for (index in data.expenses) {
						$('.expense-items-6').append(
						`<p><span class='expDate'>${data.expenses[index].date}</span>
						<span class='expDescr'>${data.expenses[index].description}</span>
						<span class='expCost'>${data.expenses[index].cost}</span>
						<span class='expCategory' hidden>${data.expenses[index].category}</span> 
						<button class='editBtn' type='submit' role='button'>Edit</button>
						<button class='delBtn' type='submit' role='button'>Delete</button>
						<span class='expId' hidden>${data.expenses[index].created}</span></p>`);
					}
					$('.expense-items-6').data().expanded = true;
				} else {
					$('.expense-items-6').empty().data().expanded = false;
					$('.detailsBtn-6').text('Show Details');
				}
			}
		})
	});
};
//enter a new expense
function enterNewExpense() {
	$('#entry-form').submit(function(event) {
		event.preventDefault();
		//:selected selector works for <option> elements (selects all elements that are selected)
		const category = $('#category').find(':selected').text(); 
		const date = $('#date').val();
		const description = $('#description').val();
		const cost = $('#cost').val();

		const newEntry = {
			category: category,
			date: date,
			description: description,
			cost: cost
		};

		$.ajax({
			type: 'POST',
			url: '/items/entry',
			contentType: 'application/json',
			data: JSON.stringify(newEntry),
			dataType: 'json',
			headers: {Authorization: `Bearer ${token}`},
			success: function(data) {
				//appends expense thru getAndDisplayExpenses()
				$('#entry-form').trigger('reset'); 
				$('#entry-error').empty();
				displayAllTotal();
				displayExpTotals();
				$('#entry-page').hide(100);
				$('#home-page').fadeIn(800);

				//close exp details since need need to run getAndDisplayExpenses() for new entry to show up
				$('.expense-items-1').empty().data().expanded = false;	
				$('.detailsBtn-1').text('Show Details');
				$('.expense-items-2').empty().data().expanded = false;
				$('.detailsBtn-2').text('Show Details');
				$('.expense-items-3').empty().data().expanded = false;
				$('.detailsBtn-3').text('Show Details');
				$('.expense-items-4').empty().data().expanded = false;
				$('.detailsBtn-4').text('Show Details');
				$('.expense-items-5').empty().data().expanded = false;
				$('.detailsBtn-5').text('Show Details');
				$('.expense-items-6').empty().data().expanded = false;
				$('.detailsBtn-6').text('Show Details');
			},
			error: function(error) {
				if (description === '' || cost === '' || date === '') {
					$('#entry-error').html('Please fill in date, description, and cost');
				} else if (isNaN(cost)) {
					$('#entry-error').html('Cost needs to be a number');
				}
			}
		})
	});
};
//edit expense
function updateExpense() {
	let idCurr;
	$('li').on('click', '.editBtn', function(event) {
		// console.log(event.target);
		idCurr = $(event.target).closest('p').find('.expId').text(); 
		const dateCurr = new Date ($(event.target).closest('p').find('.expDate').text());
		const descriptionCurr = $(event.target).closest('p').find('.expDescr').text();
		const costCurr = $(event.target).closest('p').find('.expCost').text();
		const categoryCurr = $(event.target).closest('p').find('.expCategory').text();

		//target the classes in the form and set equal to their values
		$('#selectCat select').val(categoryCurr);
		$('#date-2').val(dateCurr.toISOString().substr(0, 10)); //date format so it gets placed in form input
		$('#description-2').val(descriptionCurr);
		$('#cost-2').val(costCurr);

		$('#home-page').hide(100);
		$('#update-page').fadeIn(800);
	})
	//put this outside, seperate from above click event so only last edit button is targeted instead of all previous ones
	$('#update-form').submit(function(event) {	
	event.preventDefault();

		const newCategory = $('#category-2').find(':selected').text(); 
		const newDate = $('#date-2').val();
		const newDescr = $('#description-2').val();
		const newCost = $('#cost-2').val();

		const updateEntry = {
			id: idCurr,
			category: newCategory,
			date: newDate,
			description: newDescr,
			cost: newCost
		}

		$.ajax({	//need to do form submittal to store in db. Once submitted, backend will display to frontend.
			type: 'PUT',
			url:`/items/update/${idCurr}`,
			contentType: 'application/json',
			data: JSON.stringify(updateEntry),
			dataType: 'json',
			headers: {Authorization: `Bearer ${token}`},
			success: function(data) {
				displayAllTotal();
				displayExpTotals();
				$('#update-page').hide(100);
				$('#home-page').fadeIn(800);
				$('#update-form').trigger('reset');

				//close exp details since need to run getAndDisplayExpenses() for update entry to show up
				$('.expense-items-1').empty().data().expanded = false;	
				$('.detailsBtn-1').text('Show Details');
				$('.expense-items-2').empty().data().expanded = false;
				$('.detailsBtn-2').text('Show Details');
				$('.expense-items-3').empty().data().expanded = false;
				$('.detailsBtn-3').text('Show Details');
				$('.expense-items-4').empty().data().expanded = false;
				$('.detailsBtn-4').text('Show Details');
				$('.expense-items-5').empty().data().expanded = false;
				$('.detailsBtn-5').text('Show Details');
				$('.expense-items-6').empty().data().expanded = false;
				$('.detailsBtn-6').text('Show Details');
			}
		})
	});
};

function deleteExpense() {
	$('li').on('click', '.delBtn', function(event) {
		const id = $(event.target).closest('p').find('.expId').text(); //.closest doesn't require selector to already be in DOM?
													   //.expId still inside <p>
		$.ajax({
			type:'delete',
			url: `/items/entry/${id}`,
			headers: {Authorization: `Bearer ${token}`},
			success: function(data) {
				$(event.target).closest('p').remove();
				displayAllTotal();
				displayExpTotals();
			}
		})
	})
};

//start function when request is made to display expenses (below)
function getAndDisplayExpenses() {
	displayGasExpenses();
	displayGroceryExpenses();
	displayRestaurantExpenses();
	displayEntertainmentExpenses();
	displayMedicalExpenses();
	displayMiscExpenses();	
}

$(function() {
	getAndDisplayExpenses();
	enterNewExpense();
	updateExpense();
	deleteExpense();

	$('section').hide();
	$('#login-page').fadeIn(1000); 

	//to choose to sign up
	$('#signupBtn').click(function(event) {	//login page
		$('#signup-error').empty();
		$('#login-page').hide(100);
		$('#signup-page').fadeIn(800); //smoother display- instead of .show()
		$('#login-form').trigger('reset');
	});

	//cancel sign up
	$('#cancelBtn').click(function(event) { //sign up page
		$('#signup-form').trigger('reset');
		$('#signup-success').empty();
		$('#loginerror').empty();
		$('#signup-page').hide(100);
		$('#login-page').fadeIn(800);
	});

	//log out
	$('.signoutBtn').click(function(event) { //homepage & new entry page
		$('#username').empty();
		location.reload(); //instead of hide & show
	});

	//to open new entry form
	$('#newExp').click(function(event) { //homepage page
		$('#entry-error').empty();
		$('#home-page').hide(100);
		$('#entry-page').fadeIn(800);
	});

	//cancel new entry
	$('#abortBtn').click(function(event) { //new entry page
		$('#entry-form').trigger('reset');
		$('#entry-page').hide(100);
		$('#home-page').fadeIn(800);
	});

	//cancel update entry
	$('#abortBtn-2').click(function(event) { //update entry page
		$('#update-form').trigger('reset');
		$('#update-page').hide(100);
		$('#home-page').fadeIn(800);
	});

	//To REGISTER new account 
	$('#signup-form').submit(function(event) {
		event.preventDefault();
		$('.signup-success').empty();

		const first = $('#firstname-reg').val();
		const last = $('#lastname-reg').val();
		const user = $('#username-reg').val();
		const pass = $('#password-reg').val();

		const newUser = {
			firstName: first,
			lastName: last,
			username: user,
			password: pass
		};

		$.ajax({
			type: 'POST',
			url: '/users/register',
			contentType: 'application/json',
			data: JSON.stringify(newUser),
			dataType: 'json',
			success: function(data) {
				$('#signup-success').html('You have successfully signed up!');
				$('#signup-form').trigger('reset'); //clear form
				$('#signup-error').empty();
				$('#loginerror').empty();
				$('#signup-page').hide(250);
				$('#login-page').fadeIn(800);
			},
			error: function(res) {
				if (first === '' || user === '' || pass === '') {
					$('#signup-error').html('Please provide first name, username, and password');
				} else if (res.responseJSON.message === 'Username already taken') {
					$('#signup-error').html('Username already taken.');
				} else if (pass.length < 6 || pass.length > 72) {
					$('#signup-error').html('Password needs to be between 6 to 72 characters');
				} else if (res.responseJSON.message === 'Cannot start or end with whitespace') {
					$('#signup-error').html('Username and password cannot start or end with empty spaces');
				} 
			}
		})
	});

	//To LOGIN user 
	$('#login-form').submit(function(event) {
		event.preventDefault();

		const username = $('#login-name').val();
		const password = $('#login-pw').val();

		const loginObj = {
			username: username,
			password: password
		};

		$.ajax({
			type: 'POST',
			url: '/auth/login',
			contentType: 'application/json',
			data: JSON.stringify(loginObj),
			dataType: 'json',
			success: function(data) {
				$('#loginerror').empty();
				$('#signup-success').empty();
				$('#login-form').trigger('reset');
				$('#login-page').hide(100);
				$('#home-page').fadeIn(800);
				$('#username').html(`Logged in as: ${username}`);
				token = data.authToken;
				displayAllTotal();
				displayExpTotals();	//run here since token is given after you log in to access this protected data.
				
			},
			error: function() {
				if (username === '' || password === '') {
					$('#loginerror').html('Please enter username and password');
				}
				else {$('#loginerror').html('Incorrect username or password');}
			}
		})

	});	

});