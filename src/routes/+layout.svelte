<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</svelte:head>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<div class="footer-content">
			<div class="social-icons">
				<a href="https://open.spotify.com/artist/6cC51nqcNy2Qhth9AguhIF?si=cvpQ7HPOSriISxQQ_ySq6w" aria-label="Spotify"><i class="fab fa-spotify"></i></a>
				<a href="https://music.apple.com/us/artist/logan/1737493715" aria-label="Apple Music"><i class="fab fa-apple"></i></a>
				<a href="https://www.youtube.com/channel/UCqP_T_jF7st7wQf6IkdR-Xw" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
				<a href="https://www.tiktok.com/@logansongsofficial" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
				<a href="https://www.instagram.com/logansongsofficial/" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
			  </div>
			<p>&copy; {new Date().getFullYear()} LOGAN. All rights reserved.</p>
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		padding-top: 5rem;
	}

	footer {
		background-color: var(--color-bg-1);
		padding: 2rem 0;
		margin-top: 2rem;
	}

	.footer-content {
		max-width: 1200px;
		margin: 0 auto;
		text-align: center;
	}

	.social-icons {
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.social-icons a {
		font-size: 1.5rem;
	}
</style>