let token; //global variable

//To display totals for all expense categories
function displayExpTotals() {
	const categoryArr = ['gas', 'restaurants', 'entertainment', 'groceries', 'medical', 'misc'];

	for (i = 0; i < categoryArr.length; i++) {
		$.ajax({
			type: 'GET',
			url: `/items/${categoryArr[i]}`,	
			dataType: 'json',
			headers: {Authorization: `Bearer ${token}`},
			success: function(data) {
				if (data.expenses[0].category == undefined) {
					console.log(data.expenses[0].category);
				}
				const category = data.expenses[0].category;

				if (category === 'gas') {
					let totalExp = 0;							
					for (index in data.expenses) {
						totalExp += Number(data.expenses[index].cost);
					}
					$('.total-1').html("$" + totalExp.toFixed(2));	//round to 2 decimals (also converts to string)
				} else if (category === 'restaurants') {
					let totalExp2 = 0;							
					for (index in data.expenses) {
						totalExp2 += Number(data.expenses[index].cost);
					}
					$('.total-2').html("$" + totalExp2.toFixed(2));
				} else if (category === 'entertainment') {
					let totalExp3 = 0;							
					for (index in data.expenses) {
						totalExp3 += Number(data.expenses[index].cost);
					}
					$('.total-3').html("$" + totalExp3.toFixed(2));
				} else if (category === 'groceries') {
					let totalExp4 = 0;							
					for (index in data.expenses) {
						totalExp4 += Number(data.expenses[index].cost);
					}
					$('.total-4').html("$" + totalExp4.toFixed(2));
				} else if (category === 'medical') {
					let totalExp5 = 0;							
					for (index in data.expenses) {
						totalExp5 += Number(data.expenses[index].cost);
					}
					$('.total-5').html("$" + totalExp5.toFixed(2));
				} else if (category === 'misc') {
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
						`<p><span class="expDate">${data.expenses[index].date}</span>
						<span class="expDescr">${data.expenses[index].description}</span>
						<span class="expCost">${data.expenses[index].cost}</span> 
						<span class="expCategory" hidden>${data.expenses[index].category}</span> 
						<button class="editBtn" type="submit">Edit</button> <button class="delBtn" type="submit">Delete</button>
						<span class="expId" hidden>${data.expenses[index].created}</span></p>`); //in order to delete
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
	$('.expense-list').on("click", ".detailsBtn-2", function(event) {
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
						$('.expense-items-2').append(	//hidden element to target ID to delete in db
						`<p><span class="expDate">${data.expenses[index].date}</span>
						<span class="expDescr">${data.expenses[index].description}</span>
						<span class="expCost">${data.expenses[index].cost}</span>
						<span class="expCategory" hidden>${data.expenses[index].category}</span> 
						<button class="editBtn" type="submit">Edit</button> <button class="delBtn" type="submit">Delete</button>
						<span class="expId" hidden>${data.expenses[index].created}</span></p>`);
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
	$('.expense-list').on("click", ".detailsBtn-3", function(event) {
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
						`<p><span class="expDate">${data.expenses[index].date}</span>
						<span class="expDescr">${data.expenses[index].description}</span>
						<span class="expCost">${data.expenses[index].cost}</span>
						<span class="expCategory" hidden>${data.expenses[index].category}</span> 
						<button class="editBtn" type="submit">Edit</button> <button class="delBtn" type="submit">Delete</button>
						<span class="expId" hidden>${data.expenses[index].created}</span></p>`);
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
	$('.expense-list').on("click", ".detailsBtn-4", function(event) {
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
						`<p><span class="expDate">${data.expenses[index].date}</span>
						<span class="expDescr">${data.expenses[index].description}</span>
						<span class="expCost">${data.expenses[index].cost}</span>
						<span class="expCategory" hidden>${data.expenses[index].category}</span> 
						<button class="editBtn" type="submit">Edit</button> <button class="delBtn" type="submit">Delete</button>
						<span class="expId" hidden>${data.expenses[index].created}</span></p>`);
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
	$('.expense-list').on("click", ".detailsBtn-5", function(event) {
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
						`<p><span class="expDate">${data.expenses[index].date}</span>
						<span class="expDescr">${data.expenses[index].description}</span>
						<span class="expCost">${data.expenses[index].cost}</span>
						<span class="expCategory" hidden>${data.expenses[index].category}</span> 
						<button class="editBtn" type="submit">Edit</button> <button class="delBtn" type="submit">Delete</button>
						<span class="expId" hidden>${data.expenses[index].created}</span></p>`);
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
	$('.expense-list').on("click", ".detailsBtn-6", function(event) {
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
						`<p><span class="expDate">${data.expenses[index].date}</span>
						<span class="expDescr">${data.expenses[index].description}</span>
						<span class="expCost">${data.expenses[index].cost}</span>
						<span class="expCategory" hidden>${data.expenses[index].category}</span> 
						<button class="editBtn" type="submit">Edit</button> <button class="delBtn" type="submit">Delete</button>
						<span class="expId" hidden>${data.expenses[index].created}</span></p>`);
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

function enterNewExpense() {
	$('#entry-form').submit(function(event) {
		event.preventDefault();
		//:selected selector works for <option> elements (selects all elements that are selected)
		const category = $('#category').find(":selected").text(); 
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
				displayExpTotals();
				$('#entry-page').hide(100);
				$('#home-page').show(300);

				//close since need need to run getAndDisplayExpenses() for new entry to show up
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
				console.log(error);
			}
		})
	});
};

function updateExpense() {
	let idCurr;
	$('li').on('click', '.editBtn', function(event) {
		// console.log(event.target);	//queing up all the event listeners with event.target
		idCurr = $(event.target).closest('p').find('.expId').text(); //every edit you clicked gets changed in current session
		const dateCurr = new Date ($(event.target).closest('p').find('.expDate').text());
		const descriptionCurr = $(event.target).closest('p').find('.expDescr').text();
		const costCurr = $(event.target).closest('p').find('.expCost').text();
		const categoryCurr = $(event.target).closest('p').find('.expCategory').text();

		//target the classes in the form and set equal to dateCurr, etc.
		$('#selectCat select').val(categoryCurr);
		$('#date-2').val(dateCurr.toISOString().substr(0, 10)); //date format so it gets placed in input
		$('#description-2').val(descriptionCurr);
		$('#cost-2').val(costCurr);

		$('#home-page').hide(100);
		$('#update-page').show(300);
	})
		//put this outside, seperate from above click event so only last edit button is targeted instead of all previous ones
	$('#update-form').submit(function(event) {	
	event.preventDefault();

		const newCategory = $('#category-2').find(":selected").text(); 
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
				displayExpTotals();
				$('#update-page').hide(100);
				$('#home-page').show(300);
				$('#update-form').trigger('reset');

				//close since need need to run getAndDisplayExpenses() for update entry to show up
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
	$('#login-page').show();

	//to choose to sign up
	$('#signupBtn').click(function(event) {	//login page
		$('#login-page').hide(100);
		$('#signup-page').show(300);
	});

	//cancel sign up
	$('#cancelBtn').click(function(event) { //sign up page
		$('#signup-form').trigger('reset');
		$('#signup-page').hide(100);
		$('#login-page').show(300);
	});

	//log out
	$('#signoutBtn').click(function(event) { //homepage page
		// $('#home-page').hide(100);
		// $('#login-page').show(300);
		$('#username').empty();
		location.reload();
	});

	//to open new entry form
	$('#newExp').click(function(event) { //homepage page
		$('#home-page').hide(100);
		$('#entry-page').show(300);
	});

	//cancel new entry
	$('#abortBtn').click(function(event) { //new entry page
		$('#entry-form').trigger('reset');
		$('#entry-page').hide(100);
		$('#home-page').show(300);
	});

	//cancel update entry
	$('#abortBtn-2').click(function(event) { //update entry page
		$('#update-form').trigger('reset');
		$('#update-page').hide(100);
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
				$('#home-page').show(600);
				$('#username').html(`Logged in as: ${username}`);
				token = data.authToken;
				displayExpTotals();	//run here since token is given after you log in to access this protected data.
			},
			error: function() {
				alert('Please check username and/or password.');
			}
		})

	});	

});