<svelte:head>
	<title>Music - LOGAN</title>
	<meta name="description" content="Listen to the latest music from LOGAN" />
</svelte:head>

<div class="container">
	<h1>Music</h1>
	
	<div class="albums">
		<div class="album">
			<!-- Spotify Embed -->
			<iframe style="border-radius:12px" src="https://open.spotify.com/embed/artist/6cC51nqcNy2Qhth9AguhIF?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>			<a href="https://spotify.com" target="_blank" rel="noopener noreferrer" class="stream-button">
				Stream on Spotify
			</a>
		</div>
		<div class="album">
			<!-- Apple Music Embed (Direct iframe) -->
			<iframe src="https://embed.music.apple.com/us/artist/logan/1737493715" width="100%" height="450" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="" loading="lazy"></iframe>
		
			<a href="https://music.apple.com/us/artist/nicky-saturn/1573096259" target="_blank" rel="noopener noreferrer" class="stream-button">
				Stream on Apple Music
			</a>
		</div>
		
	</div>
</div>

<style>
	.albums {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin: 2rem 0;
	}

	.album {
		text-align: center;
		padding: 1rem;
		background: var(--color-bg-1);
		border-radius: 8px;
	}

	.stream-button {
  display: inline-flex;
  align-items: center;
  padding: 0.95rem 1.5rem;
  background-color: var(--color-theme-1);
  color: white;
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: bold;
  font-size: 1.05rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(26, 123, 161, 0.2);
  margin-top: 1rem;
}

.stream-button:hover {
  background-color: var(--color-theme-2);
  color: white;
}

	@media (max-width: 768px) {
		.albums {
			grid-template-columns: 1fr;
			padding: 0 1rem;
		}
	}
</style>
