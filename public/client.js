//To display totals for all expense categories
function displayExpTotals() {
	const categoryArr = ['gas', 'restaurants', 'entertainment', 'groceries', 'medical', 'misc'];

	for (i = 0; i < categoryArr.length; i++) {
		$.ajax({
			type: 'GET',
			url: `/items/${categoryArr[i]}`,	
			dataType: 'json',
			success: function(data) {
				if (data.expenses[0].category === 'gas') {
					let totalExp = 0;							
					for (index in data.expenses) {
						totalExp += Number(data.expenses[index].cost);
					}
					$('.total-1').html("$" + totalExp.toFixed(2));	//round to 2 decimals (also converts to string)
				} else if (data.expenses[0].category === 'restaurants') {
					let totalExp2 = 0;							
					for (index in data.expenses) {
						totalExp2 += Number(data.expenses[index].cost);
					}
					$('.total-2').html("$" + totalExp2.toFixed(2));
				} else if (data.expenses[0].category === 'entertainment') {
					let totalExp3 = 0;							
					for (index in data.expenses) {
						totalExp3 += Number(data.expenses[index].cost);
					}
					$('.total-3').html("$" + totalExp3.toFixed(2));
				} else if (data.expenses[0].category === 'groceries') {
					let totalExp4 = 0;							
					for (index in data.expenses) {
						totalExp4 += Number(data.expenses[index].cost);
					}
					$('.total-4').html("$" + totalExp4.toFixed(2));
				} else if (data.expenses[0].category === 'medical') {
					let totalExp5 = 0;							
					for (index in data.expenses) {
						totalExp5 += Number(data.expenses[index].cost);
					}
					$('.total-5').html("$" + totalExp5.toFixed(2));
				} else if (data.expenses[0].category === 'misc') {
					let totalExp6 = 0;							
					for (index in data.expenses) {
						totalExp6 += Number(data.expenses[index].cost);
					}
					$('.total-6').html("$" + totalExp6.toFixed(2));
				} 
			}
		})
	}
};

//display list of expenses for each category
function displayGasExpenses() {
	$('.expense-list').on("click", ".detailsBtn-1", function(event) {
		let dataAttr = $('.expense-items-1').data().expanded;

		$.ajax({
			type: 'GET',
			url: '/items/gas',
			dataType: 'json',
			success: function(data) {
				if (data.expenses.length === 0 && dataAttr === false) {
					$('.expense-items-1').html(`<p>Currently no expenditures here.</p>`);
					$('.detailsBtn-1').text('Hide Details');
					$('.expense-items-1').data().expanded = true;
				} else if (dataAttr === false) { //check data attr value before displaying.
					$('.detailsBtn-1').text('Hide Details');
					for (index in data.expenses) {
						$('.expense-items-1').append(
						`<p>${data.expenses[index].date} ${data.expenses[index].description} ${data.expenses[index].cost} 
						<button type="submit">Edit</button> <button type="submit">Delete</button></p>`);
					}
					$('.expense-items-1').data().expanded = true; //change data attr to true in order to hide exp details.
				} else {	//hide exp details and set data attr to false
					$('.expense-items-1').empty().data().expanded = false;
					$('.detailsBtn-1').text('Show Details');
				}
			}
		})
	});
}

function displayRestaurantExpenses() {
	$('.expense-list').on("click", ".detailsBtn-2", function(event) {
		let dataAttr = $('.expense-items-2').data().expanded;

		$.ajax({
			type: 'GET',
			url: '/items/restaurants',
			dataType: 'json',
			success: function(data) {
				if (data.expenses.length === 0 && dataAttr === false) {
					$('.expense-items-2').html(`<p>Currently no expenditures here.</p>`);
					$('.detailsBtn-2').text('Hide Details');
					$('.expense-items-2').data().expanded = true;
				} else if (dataAttr === false) { 
					$('.detailsBtn-2').text('Hide Details');
					for (index in data.expenses) {
						$('.expense-items-2').append(
						`<p>${data.expenses[index].date} ${data.expenses[index].description} ${data.expenses[index].cost} 
						<button type="submit">Edit</button> <button type="submit">Delete</button></p>`);
					}
					$('.expense-items-2').data().expanded = true; 
				} else {
					$('.expense-items-2').empty().data().expanded = false;
					$('.detailsBtn-2').text('Show Details');
				}
			}
		})
	});
}

function displayEntertainmentExpenses() {
	$('.expense-list').on("click", ".detailsBtn-3", function(event) {
		let dataAttr = $('.expense-items-3').data().expanded;

		$.ajax({
			type: 'GET',
			url: '/items/entertainment',
			dataType: 'json',
			success: function(data) {
				if (data.expenses.length === 0 && dataAttr === false) {
					$('.expense-items-3').html(`<p>Currently no expenditures here.</p>`);
					$('.detailsBtn-3').text('Hide Details');
					$('.expense-items-3').data().expanded = true;
				} else if (dataAttr === false) {
					$('.detailsBtn-3').text('Hide Details');
					for (index in data.expenses) {
						$('.expense-items-3').append(
						`<p>${data.expenses[index].date} ${data.expenses[index].description} ${data.expenses[index].cost}
						<button type="submit">Edit</button> <button type="submit">Delete</button></p>`);
					}
					$('.expense-items-3').data().expanded = true;
				} else {
					$('.expense-items-3').empty().data().expanded = false;
					$('.detailsBtn-3').text('Show Details');
				}
			}
		})
	});
}

function displayGroceryExpenses() {
	$('.expense-list').on("click", ".detailsBtn-4", function(event) {
		let dataAttr = $('.expense-items-4').data().expanded;

		$.ajax({
			type: 'GET',
			url: '/items/groceries',
			dataType: 'json',
			success: function(data) {
				if (data.expenses.length === 0 && dataAttr === false) {
					$('.expense-items-4').html(`<p>Currently no expenditures here.</p>`);
					$('.detailsBtn-4').text('Hide Details');
					$('.expense-items-4').data().expanded = true;
				} else if (dataAttr === false) {
					$('.detailsBtn-4').text('Hide Details');
					for (index in data.expenses) {
						$('.expense-items-4').append(
						`<p>${data.expenses[index].date} ${data.expenses[index].description} ${data.expenses[index].cost}
						<button type="submit">Edit</button> <button type="submit">Delete</button></p>`);
					}
					$('.expense-items-4').data().expanded = true;
				} else {
					$('.expense-items-4').empty().data().expanded = false;
					$('.detailsBtn-4').text('Show Details');
				}
			}
		})
	});
}

function displayMedicalExpenses() {
	$('.expense-list').on("click", ".detailsBtn-5", function(event) {
		let dataAttr = $('.expense-items-5').data().expanded;

		$.ajax({
			type: 'GET',
			url: '/items/medical',
			dataType: 'json',
			success: function(data) {
				if (data.expenses.length === 0 && dataAttr === false) {
					$('.expense-items-5').html(`<p>Currently no expenditures here.</p>`);
					$('.detailsBtn-5').text('Hide Details');
					$('.expense-items-5').data().expanded = true;
				} else if (dataAttr === false) {
					$('.detailsBtn-5').text('Hide Details');
					for (index in data.expenses) {
						$('.expense-items-5').append(
						`<p>${data.expenses[index].date} ${data.expenses[index].description} ${data.expenses[index].cost}
						<button type="submit">Edit</button> <button type="submit">Delete</button></p>`);
					}
					$('.expense-items-5').data().expanded = true;
				} else {
					$('.expense-items-5').empty().data().expanded = false;
					$('.detailsBtn-5').text('Show Details');
				}
			}
		})
	});
}

function displayMiscExpenses() {
	$('.expense-list').on("click", ".detailsBtn-6", function(event) {
		let dataAttr = $('.expense-items-6').data().expanded;

		$.ajax({
			type: 'GET',
			url: '/items/misc',
			dataType: 'json',
			success: function(data) {
				if (data.expenses.length === 0 && dataAttr === false) {
					$('.expense-items-6').html(`<p>Currently no expenditures here.</p>`);
					$('.detailsBtn-6').text('Hide Details');
					$('.expense-items-6').data().expanded = true;
				} else if (dataAttr === false) {
					$('.detailsBtn-6').text('Hide Details');
					for (index in data.expenses) {
						$('.expense-items-6').append(
						`<p>${data.expenses[index].date} ${data.expenses[index].description} ${data.expenses[index].cost}
						<button type="submit">Edit</button> <button type="submit">Delete</button></p>`);
					}
					$('.expense-items-6').data().expanded = true;
				} else {
					$('.expense-items-6').empty().data().expanded = false;
					$('.detailsBtn-6').text('Show Details');
				}
			}
		})
	});
}

//start function when request is made to display expenses (below)
function getAndDisplayExpenses() {
	displayExpTotals();
	displayGasExpenses();
	displayGroceryExpenses();
	displayRestaurantExpenses();
	displayEntertainmentExpenses();
	displayMedicalExpenses();
	displayMiscExpenses();	
}

$(function() {
	getAndDisplayExpenses();
	$('section').hide();
	$('#login-page').show();

	//to choose to sign up
	$('#signupBtn').click(function(event) {	//login page
		event.preventDefault();
		$('#login-page').hide(100);
		$('#signup-page').show(300);
	});

	//cancel sign up
	$('#cancelBtn').click(function(event) { //sign up page
		event.preventDefault();
		$('#signup-page').hide(100);
		$('#login-page').show(300);
	});

	//log out
	$('#signoutBtn').click(function(event) { //homepage page
		event.preventDefault();
		$('#home-page').hide(100);
		$('#login-page').show(300);
	});

	//new exp entry
	$('#newExp').click(function(event) { //homepage page
		event.preventDefault();
		$('#home-page').hide(100);
		$('#entry-page').show(300);
	});

	//exp entry entered
	$('#entryBtn').click(function(event) { //new entry page
		event.preventDefault();
		$('#entry-page').hide(100);
		$('#home-page').show(300);
	});

	//cancel new entry
	$('#abortBtn').click(function(event) { //new entry page
		event.preventDefault();
		$('#entry-page').hide(100);
		$('#home-page').show(300);
	});

	//To REGISTER new account 
	$('#signup-form').submit(function(event) {
		event.preventDefault();

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
				alert('You have successfully signed up!');
				$('#signup-form').trigger('reset'); //clear form
				$('#signup-page').hide(150);
				$('#login-page').show(400);
				// $('#login-afterreg').after('You have successfully signed up!');
			},
			error: function(res) {
				if(res.responseJSON.message === 'Username already taken') {
					alert('Username already taken.');
				} else if (pass.length < 6 || pass.length > 72) {
					alert('Password needs to be between 6 to 72 characters.');
				} else if (res.responseJSON.message === 'Cannot start or end with whitespace') {
					alert('Username and password cannot start or end with empty spaces.');
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
				$('#login-form').trigger('reset');
				$('#login-page').hide(100);
				$('#home-page').show(300);
			},
			error: function() {
				alert('Please check username and/or password.');
			}
		})

	});	

});