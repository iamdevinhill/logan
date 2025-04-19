<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabaseClient';
    import { fade } from 'svelte/transition';
    
    // Import images with proper error handling
    import artistImage1 from '$lib/images/logan1.jpg';
    import artistImage2 from '$lib/images/logan2.jpg';
    import artistImage3 from '$lib/images/logan3.jpg';
  
    const images = [artistImage1, artistImage2, artistImage3];
  
    let currentImageIndex = 0;
    let opacity = 1;
    let showPopup = false;
    let intervalId;
  
    let fullName = '';
    let email = '';
    let phone = '';
    let message = '';
    let messageType = 'error';
    let submitted = false;
    let isSubmitting = false;
  
    // Improved phone formatting with reactive declaration
    $: formattedPhone = formatPhoneNumber(phone.replace(/\D/g, ''));
  
    function formatPhoneNumber(digits) {
      if (!digits) return '';
      if (digits.length <= 3) {
        return digits;
      } else if (digits.length <= 6) {
        return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else {
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
      }
    }
  
    // Prevent typing more than 10 digits with improved handling
    function preventExtraDigits(e) {
      const digits = phone.replace(/\D/g, '');
      // Allow control keys (backspace, delete, arrows)
      if (!e.ctrlKey && !e.metaKey && !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
        if (/\d/.test(e.key) && digits.length >= 10) {
          e.preventDefault();
        }
      }
    }
  
    function handlePhoneInput(e) {
      let digits = e.target.value.replace(/\D/g, '');
      if (digits.length > 10) digits = digits.slice(0, 10);
      phone = formatPhoneNumber(digits);
    }
  
    // Improved form validation
    function validateForm() {
      // Name validation - require at least two words
      const nameWords = fullName.trim().split(/\s+/).filter((part) => part.length > 0);
      if (nameWords.length < 2) {
        message = 'Please enter your full name (first and last).';
        return false;
      }
  
      // Email validation with better regex
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!emailRegex.test(email)) {
        message = 'Please enter a valid email address.';
        return false;
      }
  
      // Phone validation - must be exactly 10 digits
      const cleanedPhone = phone.replace(/\D/g, '');
      // Check for valid length and prevent repeated digits like 1111111111
      if (cleanedPhone.length !== 10) {
        message = 'Please enter a valid 10-digit phone number.';
        return false;
      }
      
      if (/^(.)\1{9}$/.test(cleanedPhone)) {
        message = 'Please enter a valid phone number (not all same digits).';
        return false;
      }
  
      return true;
    }
  
    // Improved form submission with better error handling
    const handleSubmit = async () => {
      message = '';
      messageType = 'error';
      isSubmitting = true;
  
      if (!validateForm()) {
        isSubmitting = false;
        return;
      }
  
      try {
        const body = {
          full_name: fullName.trim(),
          email_address: email.trim(),
          phone_number: phone.replace(/\D/g, '')
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
        } else {
          message = "Thanks for signing up! You'll receive updates soon.";
          messageType = 'success';
          fullName = '';
          email = '';
          phone = '';
          await new Promise((r) => setTimeout(r, 300));
          submitted = true;
          localStorage.setItem('popupDismissed', 'true');
          
          // Auto-hide success message after 5 seconds
          setTimeout(() => {
            closePopup();
          }, 5000);
        }
      } catch (err) {
        console.error('Form submission error:', err);
        message = `Unexpected error: ${err.message || 'Please try again later.'}`;
      } finally {
        isSubmitting = false;
      }
    };
  
    function closePopup() {
      showPopup = false;
      localStorage.setItem('popupDismissed', 'true');
    }
  
    // Improved slideshow with cleanup
    function startSlideshow() {
      intervalId = setInterval(() => {
        opacity = 0;
        setTimeout(() => {
          currentImageIndex = (currentImageIndex + 1) % images.length;
          opacity = 1;
        }, 1000);
      }, 5000);
    }
  
    // Enhanced onMount with proper error handling
    onMount(async () => {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
        }
        
        if (!sessionData?.session) {
          const { error: signInError } = await supabase.auth.signInAnonymously();
          if (signInError) {
            console.error('Anonymous sign-in error:', signInError);
          }
        }
        
        startSlideshow();
  
        const dismissed = localStorage.getItem('popupDismissed');
        if (dismissed !== 'true') {
          setTimeout(() => (showPopup = true), 1000);
        }
      } catch (err) {
        console.error('Initialization error:', err);
      }
      
      // Cleanup function
      return () => {
        if (intervalId) clearInterval(intervalId);
      };
    });
  </script>
  
  <svelte:head>
    <title>LOGAN - Official Website</title>
    <meta name="description" content="Official website of LOGAN" />
  </svelte:head>
  
  <section class="hero" aria-label="LOGAN featured images">
    <div
      class="background"
      style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url({images[currentImageIndex]}); opacity: {opacity}"
      aria-hidden="true"
    ></div>
    <div class="hero-content">
      <h1>LOGAN</h1>
      <p class="tagline">New Single Out Now</p>
      <a href="/music" class="cta-button">Listen Here</a>
    </div>
  </section>
  
  {#if showPopup}
    <div class="popup-overlay" on:click|self={closePopup} role="dialog" aria-labelledby="popup-title">
      <div class="popup-container">
        <button class="close-button" on:click={closePopup} aria-label="Close popup">×</button>
        <div class="popup-content">
          <h2 class="popup-title" id="popup-title">
            Sign up for LOGAN's mailing list for updates on new music, shows, and more.
          </h2>
  
          {#if !submitted}
          <form on:submit|preventDefault={handleSubmit} class="form-group" novalidate>
            <div class="form-field">
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
            
            <div class="form-field">
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
            
            <div class="form-field">
              <label for="phone">Phone Number</label>
              <input
                id="phone"
                class="form-input"
                type="tel"
                bind:value={phone}
                on:keydown={preventExtraDigits}
                on:input={handlePhoneInput}
                maxlength="14"
                placeholder="10 Digits (No dashes)"
                required
                aria-required="true"
              />
            </div>
            
            <button class="form-button" type="submit" disabled={isSubmitting}>
              {#if isSubmitting}Submitting...{:else}Submit{/if}
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
  {/if}
  
  <style>
    .hero {
      height: calc(100vh - 5rem);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      transition: opacity 1s ease-in-out;
    }
    .hero-content {
      position: relative;
      z-index: 3;
      padding: 2rem;
    }
    h1 {
      font-size: 4rem;
      margin: 0;
      letter-spacing: 0.2em;
    }
    .tagline {
      font-size: 1.5rem;
      margin: 1rem 0 2rem;
    }
    .cta-button {
      display: inline-flex;
      align-items: center;
      padding: 1rem 2rem;
      background-color: var(--color-theme-1);
      color: white;
      border-radius: 0.75rem;
      font-weight: bold;
      font-size: 1.05rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      transition: all 0.3s ease;
      box-shadow: 0 2px 6px rgba(26, 123, 161, 0.2);
      text-decoration: none;
    }
    .cta-button:hover {
      background-color: var(--color-theme-2);
    }
    .cta-button:focus {
      outline: 3px solid rgba(26, 123, 161, 0.5);
      outline-offset: 2px;
    }
  
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
    }
    .popup-container {
      background-color: white;
      border-radius: 8px;
      width: 90%;
      max-width: 650px;
      position: relative;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      max-height: 90vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background: none;
      border: none;
      font-size: 24px;
      cursor: pointer;
      color: #666;
      z-index: 2;
      padding: 5px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
    .close-button:hover {
      color: #000;
      background-color: rgba(0, 0, 0, 0.05);
    }
    .close-button:focus {
      outline: 3px solid rgba(26, 123, 161, 0.5);
      outline-offset: 2px;
    }
    .popup-content {
      padding: 2rem;
      overflow-y: auto;
      flex: 1;
    }
    .popup-content h2.popup-title {
      color: var(--color-theme-1);
      margin-top: 0;
      font-size: 1.8rem;
      text-align: center;
    }
  
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-top: 1rem;
    }
    .form-field {
      display: flex;
      flex-direction: column;
    }

    .form-field label {
  font-weight: 500;
  font-size: 0.95rem;
  color: #2d3748;
  margin-left: 0.5rem;
  margin-bottom: 0.375rem;
}
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
    .form-input {
      padding: 0.75rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      background-color: white;
      color: black;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .form-input:focus {
      outline: none;
      border-color: var(--color-theme-1);
      box-shadow: 0 0 0 3px rgba(26, 123, 161, 0.3);
    }
  
    .form-button {
      width: 100%;
      padding: 0.75rem;
      background-color: var(--color-theme-1);
      color: white;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }
    .form-button:hover:not(:disabled) {
      background-color: var(--color-theme-2);
    }
    .form-button:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .form-button:focus {
      outline: 3px solid rgba(26, 123, 161, 0.5);
      outline-offset: 2px;
    }
    
    /* Updated success message styling to match the second code */
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
  
    .feedback {
      border-radius: 0.75rem;
      padding: 1rem;
      margin-top: 1.25rem;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      text-align: center;
      font-weight: 500;
    }
    
    .feedback.error {
      background-color: #c53030;
      color: var(--color-bg-0, white);
      border: 1px solid #feb2b2;
    }
    
    .feedback.success {
      background-color: #f0fff4;
      color: #2f855a;
      border: 1px solid #c6f6d5;
    }
  
    @media (max-width: 768px) {
      h1 {
        font-size: 2.5rem;
      }
      .tagline {
        font-size: 1.2rem;
      }
      .cta-button {
        padding: 0.8rem 1.5rem;
        font-size: 0.9rem;
      }
      .popup-container {
        width: 95%;
        max-height: 80vh;
      }
      .popup-content {
        padding: 1.5rem;
      }
      .form-group {
        gap: 0.75rem;
      }
      .success-icon {
        width: 56px;
        height: 56px;
        font-size: 1.8rem;
      }
      .success-message p {
        font-size: 1.1rem;
      }
    }
  </style>