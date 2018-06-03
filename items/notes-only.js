//under router.js
//display expenses by category
router.get('/:category', (req, res) => {	//request to /items/:category
	Expense
	.find({category: {$in:req.params.category.split('|')}}) //string to array
	.then(items => {
		console.log(items);
		res.json({
			expenses: items.map(item => {	//or function(item) {}		//do math on front end
				return item.serialize();	//remember to put 'return'
			}) //if more than one object put in key, list of obj auto. put inside an array 
		})
	})
	.catch(err => {
		console.error(err);
		res.status(500).json({ message: 'Internal server error' });
	});
});

//under client.js
	//To display total gas expenses
	const categoryArr = ['gas', 'restaurants', 'entertainment', 'groceries', 'medical', 'otherNecessities', 'misc'];

		$.ajax({
			type: 'GET',
			url: `/items/${categoryArr.join('|')}`,	//convert to string
			dataType: 'json',
			success: function(data) {
				let totalExp = 0;							
				for (index in data.expenses) {
					totalExp += Number(data.expenses[index].cost);
				}
				console.log(data);
				// if (i === 0) {
				// 	$('.total-1').html("$" + totalExp.toFixed(2));	//add total for all gas
				// }
			}
		})