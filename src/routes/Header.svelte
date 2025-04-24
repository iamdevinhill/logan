<script>
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';
	
	let menuOpen = false;
	
	function handleClickOutside(event) {
	  const nav = document.querySelector('.nav-container');
	  const toggle = document.querySelector('.menu-toggle');
	  if (menuOpen && nav && !nav.contains(event.target) && !toggle.contains(event.target)) {
		menuOpen = false;
	  }
	}
	</script>
	
	<svelte:window on:click={handleClickOutside} />
	
	<header class:menu-open={menuOpen}>
	  <nav>
		<div class="logo">
		  <a href="/">LOGAN</a>
		</div>
		<button 
		  class="menu-toggle" 
		  on:click={() => menuOpen = !menuOpen} 
		  aria-label="Toggle menu"
		  aria-expanded={menuOpen}
		>
		  <span class="hamburger" class:active={menuOpen}>
			<span class="line"></span>
			<span class="line"></span>
			<span class="line"></span>
		  </span>
		</button>
		
		<div 
		  class="nav-container"
		  class:open={menuOpen}
		>
		  <ul class="nav-links">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			  <a href="/" on:click={() => menuOpen = false}>Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/music' ? 'page' : undefined}>
			  <a href="/music" on:click={() => menuOpen = false}>Music</a>
			</li>
			<li aria-current={$page.url.pathname === '/videos' ? 'page' : undefined}>
			  <a href="/videos" on:click={() => menuOpen = false}>Videos</a>
			</li>
			<li aria-current={$page.url.pathname === '/tour' ? 'page' : undefined}>
			  <a href="/tour" on:click={() => menuOpen = false}>Tour</a>
			</li>
			<li aria-current={$page.url.pathname === '/contact' ? 'page' : undefined}>
			  <a href="/contact" on:click={() => menuOpen = false}>Contact</a>
			</li>
		  </ul>
		  <div class="social-icons">
			<a href="https://open.spotify.com/artist/6cC51nqcNy2Qhth9AguhIF?si=cvpQ7HPOSriISxQQ_ySq6w" aria-label="Spotify"><i class="fab fa-spotify"></i></a>
			<a href="https://music.apple.com/us/artist/logan/1737493715" aria-label="Apple Music"><i class="fab fa-apple"></i></a>
			<a href="https://www.youtube.com/@Logansongsofficial" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
			<a href="https://www.tiktok.com/@logansongsofficial" aria-label="TikTok"><i class="fab fa-tiktok"></i></a>
			<a href="https://www.instagram.com/logansongsofficial/" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
		  </div>
		</div>
	  </nav>
	</header>
	
	<style>
	  header {
		background-color: var(--color-theme-1);
		padding: 1.5rem 0;
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 1000;
		transition: background-color 0.3s ease;
	  }
	
	  header.menu-open {
		background-color: transparent;
	  }
	
	  nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
		position: relative;
		font-size: large;
	  }
	
	  .logo a {
		font-size: 1.5rem;
		font-weight: bold;
		color: white;
		z-index: 1001;
		position: relative;
	  }
	
	  .menu-toggle {
		display: none;
		background: none;
		border: none;
		padding: 0.5rem;
		cursor: pointer;
		z-index: 1001;
	  }
	
	  .hamburger {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 24px;
		height: 20px;
	  }
	
	  .line {
		display: block;
		width: 100%;
		height: 2px;
		background-color: white;
		transition: all 0.3s ease;
	  }
	
	  .hamburger.active .line:nth-child(1) {
		transform: translateY(9px) rotate(45deg);
	  }
	
	  .hamburger.active .line:nth-child(2) {
		opacity: 0;
	  }
	
	  .hamburger.active .line:nth-child(3) {
		transform: translateY(-9px) rotate(-45deg);
	  }
	
	  .nav-container {
		display: flex;
		align-items: center;
		gap: 2rem;
	  }
	
	  .nav-links {
		display: flex;
		gap: 2rem;
		list-style: none;
		margin: 0;
		padding: 0;
	  }
	
	  .nav-links a {
		color: white;
		font-weight: 500;
		transition: color 0.2s ease;
	  }
	
	  .nav-links a:hover {
		color: var(--color-bg-2, #1a1a1a);
	  }
	
	  .social-icons {
		display: flex;
		gap: 1rem;
	  }
	
	  .social-icons a {
		color: white;
		font-size: 1.2rem;
		transition: color 0.2s ease;
	  }
	
	  .social-icons a:hover {
		color: var(--color-bg-2, #1a1a1a);
	  }
	
	  @media (max-width: 768px) {
		.menu-toggle {
		  display: block;
		}
	
		.nav-container {
		  display: none;
		  position: fixed;
		  top: 0;
		  left: 0;
		  right: 0;
		  bottom: 0;
		  background-color: var(--color-theme-1);
		  padding: 5rem 2rem;
		  flex-direction: column;
		  align-items: center;
		  justify-content: center;
		  font-size: x-large;
		  z-index: 1000;
		}
	
		.nav-container.open {
		  display: flex;
		  animation: slideIn 0.3s ease forwards;
		}
	
		@keyframes slideIn {
		  from {
			opacity: 0;
			transform: translateY(-20px);
		  }
		  to {
			opacity: 1;
			transform: translateY(0);
		  }
		}
	
		.nav-links {
		  flex-direction: column;
		  align-items: center;
		  gap: 2rem;
		}
	
		.nav-links a {
		  font-size: 1.5rem;
		}
	
		.social-icons {
		  margin-top: 3rem;
		  font-size: 1.5rem;
		}
	  }
	</style>