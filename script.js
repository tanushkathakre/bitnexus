const url =
'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';

const options = {
method: 'GET',
headers: {
	'X-RapidAPI-Key': 'c8d09f4c33msh53fe2a20274a710p1be166jsn0265e1a0f41a',
	'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
},
};

const renderData = (coins) => {
const coinDataElement = document.getElementById('coinData');
coinDataElement.innerHTML = '';

coins.forEach((coin) => {
	const row = document.createElement('tr');
	const changeColor = coin.change < 0 ? 'red' : 'green';
	row.innerHTML = `
		<td>${coin.rank}</td>
		<td>${coin.name}</td>
		<td>
		<img src="${coin.iconUrl}" alt="${coin.name}" style="width: 24px; height: 24px;">
		
		</td>
		<td>${coin.price}</td>
		<td style="color: ${changeColor}">${coin.change}</td>
		<td>${coin.marketCap}</td>
		<td>${coin['24hVolume']}</td>
	`;
	coinDataElement.appendChild(row);
});
};

const filterData = (searchValue, coins) => {
const filteredCoins = coins.filter((coin) =>
	coin.name.toLowerCase().includes(searchValue.toLowerCase())
);
renderData(filteredCoins);
};

const getprice = () => {
fetch(url, options)
	.then((response) => response.json())
	.then((response) => {
		const coins = response.data.coins;
		renderData(coins);

		const searchInput = document.getElementById('searchInput');
		const searchButton = document.getElementById('searchButton');

		const filterCoins = () => {
			const searchValue = searchInput.value;
			filterData(searchValue, coins);
		};

		searchButton.addEventListener('click', filterCoins);
	})
	.catch((err) => console.error(err));
};

getprice();