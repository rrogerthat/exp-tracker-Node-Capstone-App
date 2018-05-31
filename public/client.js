//get data from mock database
function getExpenses(callbackFn) {
	setTimeout(function() {callbackFn(MOCK_EXPENSES)}, 100);
}

//display expenses to html page
function displayGasExpenses(data) {
	let counter = 0;	
	for (index in data.gas) {
		counter += Number(data.gas[index].cost);
	}
	$('.total-1').html("$" + counter.toFixed(2));	//add total for all gas

	$('.expense-list').on("click", ".detailsBtn-1", function(event) {
		let dataAttr = $('.expense-items-1').data().expanded;

		if (data.gas.length === 0 && dataAttr === false) {
			$('.expense-items-1').html(`<p>Currently no expenditures here.</p>`);
			$('.detailsBtn-1').text('Hide Details');
			$('.expense-items-1').data().expanded = true;
		} else if (dataAttr === false) { //check data attr value before displaying.
			$('.detailsBtn-1').text('Hide Details');
			for (index in data.gas) {
				$('.expense-items-1').append(
				`<p>${data.gas[index].date} ${data.gas[index].description} ${data.gas[index].cost} 
				<button type="submit">Edit</button> <button type="submit">Delete</button></p>`);
			}
			$('.expense-items-1').data().expanded = true; //change data attr to true in order to hide exp details.
		} else {	//hide exp details and set data attr to false
			$('.expense-items-1').empty().data().expanded = false;
			$('.detailsBtn-1').text('Show Details');
		}
	});
}

function displayGroceryExpenses(data) {
	let counter = 0;	
	for (index in data.groceries) {
		counter += Number(data.groceries[index].cost);
	}
	$('.total-2').html("$" + counter.toFixed(2));	//round to 2 decimals (also converts to string)

	$('.expense-list').on("click", ".detailsBtn-2", function(event) {
		let dataAttr = $('.expense-items-2').data().expanded;

		if (data.groceries.length === 0 && dataAttr === false) {
			$('.expense-items-2').html(`<p>Currently no expenditures here.</p>`);
			$('.detailsBtn-2').text('Hide Details');
			$('.expense-items-2').data().expanded = true;
		} else if (dataAttr === false) {
			$('.detailsBtn-2').text('Hide Details');		
			for (index in data.groceries) {
				$('.expense-items-2').append(
				`<p>${data.groceries[index].date} ${data.groceries[index].description} ${data.groceries[index].cost}
				<button type="submit">Edit</button> <button type="submit">Delete</button></p>`);
			}
			$('.expense-items-2').data().expanded = true;
		} else {
			$('.expense-items-2').empty().data().expanded = false;
			$('.detailsBtn-2').text('Show Details');
		}
	});
}

function displayRestaurantExpenses(data) {
	let counter = 0;	
	for (index in data.restaurants) {
		counter += Number(data.restaurants[index].cost);
	}
	$('.total-3').html("$" + counter.toFixed(2));

	$('.expense-list').on("click", ".detailsBtn-3", function(event) {
		let dataAttr = $('.expense-items-3').data().expanded;

		if (data.restaurants.length === 0 && dataAttr === false) {
			$('.expense-items-3').html(`<p>Currently no expenditures here.</p>`);
			$('.detailsBtn-3').text('Hide Details');
			$('.expense-items-3').data().expanded = true;
		} else if (dataAttr === false) {
			$('.detailsBtn-3').text('Hide Details');
			for (index in data.restaurants) {
				$('.expense-items-3').append(
				`<p>${data.restaurants[index].date} ${data.restaurants[index].description} ${data.restaurants[index].cost}
				<button type="submit">Edit</button> <button type="submit">Delete</button></p>`);
			}
			$('.expense-items-3').data().expanded = true;
		} else {
			$('.expense-items-3').empty().data().expanded = false;
			$('.detailsBtn-3').text('Show Details');
		}
	});
}

function displayEntertainmentExpenses(data) {
	let counter = 0;	
	for (index in data.entertainment) {
		counter += Number(data.entertainment[index].cost);
	}
	$('.total-4').html("$" + counter.toFixed(2));

	$('.expense-list').on("click", ".detailsBtn-4", function(event) {
		let dataAttr = $('.expense-items-4').data().expanded;

		if (data.entertainment.length === 0 && dataAttr === false) {
			$('.expense-items-4').html(`<p>Currently no expenditures here.</p>`);
			$('.detailsBtn-4').text('Hide Details');
			$('.expense-items-4').data().expanded = true;
		} else if (dataAttr === false) {
			$('.detailsBtn-4').text('Hide Details');
			for (index in data.entertainment) {
				$('.expense-items-4').append(
				`<p>${data.entertainment[index].date} ${data.entertainment[index].description} ${data.entertainment[index].cost}
				<button type="submit">Edit</button> <button type="submit">Delete</button></p>`);
			}
			$('.expense-items-4').data().expanded = true;
		} else {
			$('.expense-items-4').empty().data().expanded = false;
			$('.detailsBtn-4').text('Show Details');
		}
	});
}

function displayMedicalExpenses(data) {
	let counter = 0;	
	for (index in data.medical) {
		counter += Number(data.medical[index].cost);
	}
	$('.total-5').html("$" + counter.toFixed(2));

	$('.expense-list').on("click", ".detailsBtn-5", function(event) {
		let dataAttr = $('.expense-items-5').data().expanded;

		if (data.medical.length === 0 && dataAttr === false) {
			$('.expense-items-5').html(`<p>Currently no expenditures here.</p>`);
			$('.detailsBtn-5').text('Hide Details');
			$('.expense-items-5').data().expanded = true;
		} else if (dataAttr === false) {
			$('.detailsBtn-5').text('Hide Details');
			for (index in data.medical) {
				$('.expense-items-5').append(
				`<p>${data.medical[index].date} ${data.medical[index].description} ${data.medical[index].cost}
				<button type="submit">Edit</button> <button type="submit">Delete</button></p>`);
			}
			$('.expense-items-5').data().expanded = true;
		} else {
			$('.expense-items-5').empty().data().expanded = false;
			$('.detailsBtn-5').text('Show Details');
		}
	});
}

function displayOtherNecessitiesExpenses(data) {
	let counter = 0;	
	for (index in data.otherNecessities) {
		counter += Number(data.otherNecessities[index].cost);
	}
	$('.total-6').html("$" + counter.toFixed(2));

	$('.expense-list').on("click", ".detailsBtn-6", function(event) {
		let dataAttr = $('.expense-items-6').data().expanded;

		if (data.otherNecessities.length === 0 && dataAttr === false) {
			$('.expense-items-6').html(`<p>Currently no expenditures here.</p>`);
			$('.detailsBtn-6').text('Hide Details');
			$('.expense-items-6').data().expanded = true;
		} else if (dataAttr === false) {
			$('.detailsBtn-6').text('Hide Details');
			for (index in data.otherNecessities) {
				$('.expense-items-6').append(
				`<p>${data.otherNecessities[index].date} ${data.otherNecessities[index].description} ${data.otherNecessities[index].cost}
				<button type="submit">Edit</button> <button type="submit">Delete</button></p>`);
			}
			$('.expense-items-6').data().expanded = true;
		} else {
			$('.expense-items-6').empty().data().expanded = false;
			$('.detailsBtn-6').text('Show Details');
		}
	});
}

function displayMiscExpenses(data) {
	let counter = 0;	
	for (index in data.misc) {
		counter += Number(data.misc[index].cost);
	}
	$('.total-7').html("$" + counter.toFixed(2));

	$('.expense-list').on("click", ".detailsBtn-7", function(event) {
		let dataAttr = $('.expense-items-7').data().expanded;

		if (data.misc.length === 0 && dataAttr === false) {
			$('.expense-items-7').html(`<p>Currently no expenditures here.</p>`);
			$('.detailsBtn-7').text('Hide Details');
			$('.expense-items-7').data().expanded = true;
		} else if (dataAttr === false) {
			$('.detailsBtn-7').text('Hide Details');
			for (index in data.misc) {
				$('.expense-items-7').append(
				`<p>${data.misc[index].date} ${data.misc[index].description} ${data.misc[index].cost}
				<button type="submit">Edit</button> <button type="submit">Delete</button></p>`);
			}
			$('.expense-items-7').data().expanded = true;
		} else {
			$('.expense-items-7').empty().data().expanded = false;
			$('.detailsBtn-7').text('Show Details');
		}
	});
}

//start function when request is made to display expenses
function getAndDisplayExpenses() {
	getExpenses(displayGasExpenses);
	getExpenses(displayGroceryExpenses);
	getExpenses(displayRestaurantExpenses);
	getExpenses(displayEntertainmentExpenses);
	getExpenses(displayMedicalExpenses);
	getExpenses(displayOtherNecessitiesExpenses);
	getExpenses(displayMiscExpenses);	
}

$(function() {
	getAndDisplayExpenses();
	$('section').hide();
	$('#login-page').show();

	//to login
	$('#loginBtn').click(function(event) {	//login page
		event.preventDefault();
		$('#login-page').hide(100);
		$('#home-page').show(300);
	});

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

//------------------Form submittals-----------------------
	//To register new account 
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
		}

		$.ajax({
			type: 'POST',
			url: '/users/register',
			contentType: 'application/json',
			data: JSON.stringify(newUser),
			dataType: 'json',
			success: function(data) {
				alert('You have successfully signed up!');
				$("#signup-form").trigger('reset'); //clear form
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

});