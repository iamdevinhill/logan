<svelte:head>
	<title>Videos - LOGAN</title>
	<meta name="description" content="Watch the latest music videos from LOGAN" />
</svelte:head>

<div class="container">
	<h1>Videos</h1>
	
	<div class="videos">
		<div class="video">
			<div class="video-container">
				<iframe
					src="https://www.youtube.com/embed/-GS_tnCkLvw?si=13rBcznlJEX5tSOk" 
					title="Starving"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
			<h3>"Starving"</h3>
		</div>
		<br>

		<div class="video">
			<div class="video-container">
				<iframe
				src="https://www.youtube.com/embed/TXs_ybw6M4c?si=k6AaBEypLijEXmp6" 
					title="Back Burner"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
			<h3>"Back Burner"</h3>
		</div>
		<br>

		<div class="video">
			<div class="video-container">
				<iframe
				src="https://www.youtube.com/embed/9XINBKhO4Qw?si=TFaPUM1NwcE2FuiH" 
					title="It's been a minute"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
			<h3>"It's been a minute"</h3>
		</div>
		<br>
	</div>
</div>

<style>
	.videos {
		display: inline;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		gap: 2rem;
		margin: 2rem 0;
	}

	.video {
		background: var(--color-bg-1);
		padding: 1rem;
		border-radius: 8px;
	}

	.video-container {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
		overflow: hidden;
		margin-bottom: 1rem;
	}

	.video-container iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 4px;
	}

	h3 {
		margin: 0;
		text-align: center;
		font-size: 1.5rem;
	}
</style>