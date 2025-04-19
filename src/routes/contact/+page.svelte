<script>
	import { supabase } from '$lib/supabaseClient';
	import { fade } from 'svelte/transition';
  
	let fullName = '';
	let email = '';
	let phone = '';
	let message = '';
	let messageType = 'error'; // 'success' or 'error'
	let isSubmitting = false;
	let submitted = false;
  
	// Format phone number as user types
	$: formattedPhone = formatPhoneNumber(phone);
  
	function formatPhoneNumber(value) {
	  // Strip non-digits
	  const digits = value.replace(/\D/g, '');
	  
	  // Format as (XXX) XXX-XXXX
	  if (digits.length <= 3) {
		return digits;
	  } else if (digits.length <= 6) {
		return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
	  } else {
		return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
	  }
	}
  
	function validateForm() {
	  // Full name validation - must have at least first and last name
	  const nameWords = fullName.trim().split(/\s+/).filter(part => part.length > 0);
	  if (nameWords.length < 2) {
		message = 'Please enter your full name (first and last).';
		return false;
	  }
	  
	  // Email validation with more comprehensive regex
	  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!emailRegex.test(email)) {
        message = 'Please enter a valid email address.';
        return false;
      }
	  
	  // Phone validation - must be exactly 10 digits after stripping non-digits
	  const cleanedPhone = phone.replace(/\D/g, '');
	  if (cleanedPhone.length !== 10) {
		message = 'Please enter a valid 10-digit phone number.';
		return false;
	  }
	  
	  // Check for repeated digits like 1111111111
	  if (/^(.)\1{9}$/.test(cleanedPhone)) {
        message = 'Please enter a valid phone number (not all same digits).';
        return false;
      }
	  
	  return true;
	}
  
	const handleSubmit = async () => {
	  // Reset message
	  message = '';
	  isSubmitting = true;
	  
	  if (!validateForm()) {
		messageType = 'error';
		isSubmitting = false;
		return;
	  }
  
	  try {
		const body = {
		  full_name: fullName.trim(),
		  email_address: email.trim(),
		  phone_number: phone.replace(/\D/g, '') // Store only digits in database
		};
  
		const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
		
		if (sessionError) {
		  throw new Error('Authentication error: ' + sessionError.message);
		}
		
		const token = sessionData?.session?.access_token;
  
		const res = await fetch('/api/signup', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
			...(token && { Authorization: `Bearer ${token}` })
		  },
		  body: JSON.stringify(body)
		});
  
		// Handle non-JSON responses
		const contentType = res.headers.get("content-type");
		let result;
		
		if (contentType && contentType.indexOf("application/json") !== -1) {
		  result = await res.json();
		} else {
		  const text = await res.text();
		  result = { error: text };
		}
  
		if (!res.ok) {
		  message = `Error: ${result.error || 'Something went wrong. Please try again.'}`;
		  messageType = 'error';
		} else {
		  message = 'Thanks for signing up! You\'ll receive updates soon.';
		  messageType = 'success';
		  fullName = email = phone = '';
		  submitted = true;
		  setTimeout(() => {
			submitted = false;
			message = '';
		  }, 5000);
		}
	  } catch (err) {
		console.error('Form submission error:', err);
		message = `Unexpected error: ${err.message || 'Please try again later.'}`;
		messageType = 'error';
	  } finally {
		isSubmitting = false;
	  }
	};
  
	function handlePhoneInput(e) {
	  const input = e.target;
	  const digits = input.value.replace(/\D/g, '');

	  // Only allow first 10 digits
	  const limitedDigits = digits.slice(0, 10);
	  const formatted = formatPhoneNumber(limitedDigits);

	  // Manually set the input field's visible value
	  input.value = formatted;

	  // Update phone state
	  phone = formatted;
	}

	// Prevent typing more than 10 digits
	function preventExtraDigits(e) {
	  const digits = phone.replace(/\D/g, '');
	  // Allow control keys (backspace, delete, arrows)
	  if (!e.ctrlKey && !e.metaKey && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
		if (/\d/.test(e.key) && digits.length >= 10) {
		  e.preventDefault();
		}
	  }
	}
  </script>
  
  <svelte:head>
	<title>Contact - LOGAN</title>
	<meta name="description" content="Get in touch with LOGAN for bookings, collaborations, or join the mailing list for updates." />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </svelte:head>
  
  <h1>Contact</h1>
  <div class="container">
	<div class="contact-content">
	  <div class="contact-info">
		<div class="card get-in-touch">
			<h2>Get in Touch</h2>
			<p>For booking inquiries and other business opportunities:</p>
			<a 
			  href="mailto:logansongofficial@gmail.com?body=Hello%20LOGAN%2C%0A%0AI%20am%20contacting%20you%20to%20talk%20about%20%5Byour%20message%5D.%0A%0AThanks!%0A%0ABest%2C%0A%5BYour%20Name%5D" 
			  class="email-button"
			>
			  <span class="icon">✉️</span> Email Now
			</a>
		  </div>
		  
  
		<div class="card mailing-list">
		  <h2>Join the Mailing List</h2>
		  <p>Sign up to receive updates on new music, upcoming shows, and exclusive content.</p>
  
		  {#if !submitted}
			<form on:submit|preventDefault={handleSubmit} class="contact-form" novalidate>
			  <div class="input-group">
				<label for="fullName">Full Name</label>
				<input 
				  id="fullName"
				  class="form-input" 
				  type="text" 
				  bind:value={fullName} 
				  placeholder="First and Last Name"
				  required 
				  aria-required="true"
				/>
			  </div>
			  
			  <div class="input-group">
				<label for="email">Email Address</label>
				<input 
				  id="email"
				  class="form-input" 
				  type="email" 
				  bind:value={email} 
				  placeholder="your@email.com"
				  required 
				  aria-required="true"
				/>
			  </div>
			  
			  <div class="input-group">
				<label for="phone">Phone Number</label>
				<input 
				  id="phone"
				  class="form-input" 
				  type="tel" 
				  value={phone}
				  on:input={handlePhoneInput}
				  on:keydown={preventExtraDigits}
				  maxlength="14"
				  placeholder="10 Digits (No dashes)"
				  required 
				  aria-required="true"
				/>
			  </div>
			  
			  <button class="form-button" type="submit" disabled={isSubmitting}>
				{#if isSubmitting}
				  Submitting...
				{:else}
				  Join Now
				{/if}
			  </button>
			</form>
		  {:else}
			<div class="success-message" transition:fade role="alert">
			  <div class="success-icon">✓</div>
			  <p>You've successfully joined the mailing list!</p>
			</div>
		  {/if}
  
		  {#if message && !submitted}
			<div class="feedback {messageType}" transition:fade role="alert">
			  <p>{message}</p>
			</div>
		  {/if}
		</div>
	  </div>
	</div>
  </div>
  
  <style>
	.container {
	  max-width: 1200px;
	  margin: 0 auto;
	  padding: 2rem 1rem;
	}
  
	.page-title {
	  font-size: 2.5rem;
	  margin-bottom: 2rem;
	  text-align: center;
	  color: var(--color-theme-1);
	}
  
	.contact-content {
	  display: flex;
	  justify-content: center;
	}
  
	.contact-info {
	  display: flex;
	  flex-direction: column;
	  gap: 2rem;
	  width: 100%;
	  max-width: 800px;
	}
  
	.card {
      background-color: var(--color-bg-1);
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
  
	h2 {
	  font-size: 1.75rem;
	  margin-bottom: 1rem;
	  color: var(--color-theme);
	}
  
	.get-in-touch p {
	  margin-bottom: 1.5rem;
	  font-size: 1.1rem;
	}
  
	.email-button {
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
    }
  
	.email-button:hover {
		background-color: var(--color-theme-2);
		color: white;
	}
  
	.icon {
	  margin-right: 0.5rem;
	  font-size: 1.2rem;
	}
  
	.contact-form {
	  display: flex;
	  flex-direction: column;
	  gap: 1.25rem;
	  margin-top: 1.5rem;
	}
  
	.input-group {
	  display: flex;
	  flex-direction: column;
	  gap: 0.375rem;
	}
  
	.input-group label {
	  font-weight: 500;
	  font-size: 0.95rem;
	  color: var(--color-text);
	  margin-left: 0.5rem;
	}
  
	.form-input {
	  padding: 0.875rem 1rem;
	  border: 2px solid #e2e8f0;
	  border-radius: 0.75rem;
	  background-color: white;
	  color: #2d3748;
	  font-size: 1rem;
	  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
	  transition: all 0.2s ease;
	}
  
	.form-input:hover {
	  border-color: #cbd5e0;
	}
  
	.form-input:focus {
	  outline: none;
	  border-color: var(--color-theme-1);
	  box-shadow: 0 0 0 3px rgba(26, 123, 161, 0.15);
	}
  
	.form-button {
	  margin-top: 0.5rem;
	  padding: 0.95rem;
	  background-color: var(--color-theme-1);
	  color: white;
	  font-weight: bold;
	  border: none;
	  border-radius: 0.75rem;
	  font-size: 1.05rem;
	  cursor: pointer;
	  transition: all 0.3s ease;
	  box-shadow: 0 2px 6px rgba(26, 123, 161, 0.2);
	}
  
	.form-button:hover:not(:disabled) {
		background-color: var(--color-theme-2);
		color: white;
	}
  
	.form-button:active:not(:disabled) {
	  transform: translateY(0);
	}
  
	.form-button:disabled {
	  background-color: #90cdf4;
	  cursor: not-allowed;
	}
  
	.feedback {
	  margin-top: 1.25rem;
	  text-align: center;
	  font-weight: 500;
	  padding: 1rem;
	  border-radius: 0.75rem;
	  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
	}
  
	.error {
	  background-color: #c53030;
	  color: var(--color-bg-0);
	  border: 1px solid #feb2b2;
	}
  
	.success {
	  background-color: #f0fff4;
	  color: #2f855a;
	  border: 1px solid #c6f6d5;
	}
  
	.success-message {
	  text-align: center;
	  padding: 2rem 1rem;
	}
  
	.success-icon {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  width: 64px;
	  height: 64px;
	  background-color: #48bb78;
	  color: white;
	  font-size: 2rem;
	  border-radius: 50%;
	  margin: 0 auto 1.5rem;
	}
  
	.success-message p {
	  font-size: 1.25rem;
	  font-weight: 600;
	  color: #2f855a;
	}
  
	@media (max-width: 640px) {
	  .page-title {
		font-size: 2rem;
	  }
  
	  .card {
		padding: 1.5rem;
	  }
  
	  h2 {
		font-size: 1.5rem;
	  }
	}
  </style>