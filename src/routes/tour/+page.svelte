<svelte:head>
	<title>Tour - LOGAN</title>
	<meta name="description" content="Check out upcoming tour dates and get tickets" />
</svelte:head>

<div class="container">
	<h1>Tour Dates</h1>
	
	<div class="tour-dates">
		<div class="tour-date">
			<!-- <div class="date">
				<span class="day">15</span>
				<span class="month">DEC</span>
			</div> -->
			<div class="details">
				<h3>Coming Soon</h3>
			</div>
			<!-- <a href="#" class="ticket-button">Get Tickets</a> -->
		</div>
	</div>
</div>

<style>
	.tour-dates {
		max-width: 800px;
		margin: 2rem auto;
		padding: 0 1rem;
	}

	.tour-date {
		display: flex;
		align-items: center;
		padding: 1.5rem;
		margin-bottom: 1rem;
		background: var(--color-bg-1);
		border-radius: 8px;
	}

	.date {
		text-align: center;
		min-width: 80px;
		margin-right: 2rem;
	}

	.day {
		display: block;
		font-size: 2rem;
		font-weight: bold;
	}

	.month {
		display: block;
		font-size: 1rem;
	}

	.details {
		flex-grow: 1;
	}

	.details h3 {
		margin: 0;
	}

	.details p {
		margin: 0.5rem 0 0;
		opacity: 0.8;
	}

	.ticket-button {
		padding: 0.5rem 1rem;
		background-color: var(--color-theme-1);
		color: white;
		border-radius: 4px;
		white-space: nowrap;
	}

	.ticket-button:hover {
		background-color: var(--color-theme-2);
		color: white;
	}

	@media (max-width: 600px) {
		.tour-date {
			flex-direction: column;
			text-align: center;
			gap: 1rem;
			padding: 1rem;
		}

		.date {
			margin-right: 0;
		}

		.ticket-button {
			width: 100%;
			text-align: center;
		}
	}
</style>