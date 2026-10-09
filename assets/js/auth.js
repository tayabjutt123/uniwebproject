/**
 * Novaflow - Authentication Interactions
 * Handles password visibility, password strength calculation, and validation
 */

document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggles();
  initPasswordStrength();
  initConfirmPasswordMatch();
  initPlanSelectors();
  initAuthForms();
});

/**
 * Toggle Password Visibility (Eye Icon)
 */
function initPasswordToggles() {
  const toggleButtons = document.querySelectorAll('[data-toggle-password]');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-toggle-password');
      const input = document.getElementById(targetId);
      const eyeIcon = btn.querySelector('.eye-open');
      const eyeOffIcon = btn.querySelector('.eye-closed');

      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        if (eyeIcon) eyeIcon.classList.add('hidden');
        if (eyeOffIcon) eyeOffIcon.classList.remove('hidden');
      } else {
        input.type = 'password';
        if (eyeIcon) eyeIcon.classList.remove('hidden');
        if (eyeOffIcon) eyeOffIcon.classList.add('hidden');
      }
    });
  });
}

/**
 * Password Strength Meter for Sign Up
 */
function initPasswordStrength() {
  const passwordInput = document.getElementById('signup-password');
  const strengthBars = document.querySelectorAll('.strength-bar-segment');
  const strengthText = document.getElementById('strength-label');
  const ruleLength = document.getElementById('rule-length');
  const ruleNumber = document.getElementById('rule-number');
  const ruleSpecial = document.getElementById('rule-special');
  const ruleUpper = document.getElementById('rule-upper');

  if (!passwordInput || !strengthText) return;

  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let score = 0;

    const hasLength = val.length >= 8;
    const hasUpper = /[A-Z]/.test(val) && /[a-z]/.test(val);
    const hasNumber = /[0-9]/.test(val);
    const hasSpecial = /[^A-Za-z0-9]/.test(val);

    // Update rule checklist markers
    updateRule(ruleLength, hasLength);
    updateRule(ruleUpper, hasUpper);
    updateRule(ruleNumber, hasNumber);
    updateRule(ruleSpecial, hasSpecial);

    if (hasLength) score++;
    if (hasUpper) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    // Color definitions
    const colors = [
      'bg-slate-200',
      'bg-red-500',
      'bg-amber-500',
      'bg-yellow-500',
      'bg-emerald-500'
    ];
    const labels = ['Weak', 'Weak', 'Fair', 'Good', 'Strong'];

    strengthBars.forEach((bar, index) => {
      bar.className = 'strength-bar-segment h-1.5 rounded-full flex-1 transition-all duration-300 ' +
        (index < score ? colors[score] : 'bg-slate-200');
    });

    strengthText.textContent = val.length === 0 ? 'Enter password' : labels[score];
    strengthText.className = 'text-xs font-semibold ' + 
      (val.length === 0 ? 'text-slate-400' : 
       score <= 1 ? 'text-red-500' :
       score === 2 ? 'text-amber-500' :
       score === 3 ? 'text-yellow-600' : 'text-emerald-600');
  });

  function updateRule(element, isValid) {
    if (!element) return;
    const icon = element.querySelector('.rule-icon');
    if (isValid) {
      element.classList.remove('text-slate-400');
      element.classList.add('text-emerald-600', 'font-medium');
      if (icon) icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>';
    } else {
      element.classList.add('text-slate-400');
      element.classList.remove('text-emerald-600', 'font-medium');
      if (icon) icon.innerHTML = '<circle cx="12" cy="12" r="4" fill="currentColor"/>';
    }
  }
}

/**
 * Confirm Password Match Verification
 */
function initConfirmPasswordMatch() {
  const passwordInput = document.getElementById('signup-password');
  const confirmInput = document.getElementById('signup-confirm-password');
  const matchNotice = document.getElementById('password-match-error');

  if (!passwordInput || !confirmInput || !matchNotice) return;

  function checkMatch() {
    if (confirmInput.value.length === 0) {
      matchNotice.classList.add('hidden');
      confirmInput.classList.remove('border-red-500', 'border-emerald-500');
      return;
    }
    if (passwordInput.value === confirmInput.value) {
      matchNotice.classList.add('hidden');
      confirmInput.classList.remove('border-red-500');
      confirmInput.classList.add('border-emerald-500');
    } else {
      matchNotice.classList.remove('hidden');
      confirmInput.classList.remove('border-emerald-500');
      confirmInput.classList.add('border-red-500');
    }
  }

  confirmInput.addEventListener('input', checkMatch);
  passwordInput.addEventListener('input', checkMatch);
}

/**
 * Interactive Plan Radio Selector Cards
 */
function initPlanSelectors() {
  const planCards = document.querySelectorAll('[data-plan-card]');
  planCards.forEach(card => {
    card.addEventListener('click', () => {
      planCards.forEach(c => {
        c.classList.remove('border-indigo-600', 'bg-indigo-50/50', 'ring-2', 'ring-indigo-600');
        c.classList.add('border-slate-200');
        const radio = c.querySelector('input[type="radio"]');
        if (radio) radio.checked = false;
      });
      card.classList.add('border-indigo-600', 'bg-indigo-50/50', 'ring-2', 'ring-indigo-600');
      card.classList.remove('border-slate-200');
      const activeRadio = card.querySelector('input[type="radio"]');
      if (activeRadio) activeRadio.checked = true;
    });
  });
}

/**
 * Auth Forms Submit Validation & Feedback
 */
function initAuthForms() {
  const signinForm = document.getElementById('signin-form');
  const signupForm = document.getElementById('signup-form');

  if (signinForm) {
    signinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('signin-email').value;
      const pass = document.getElementById('signin-password').value;
      const feedback = document.getElementById('signin-feedback');

      if (!email || !pass) {
        if (feedback) {
          feedback.textContent = 'Please fill in both email and password.';
          feedback.classList.remove('hidden', 'text-emerald-600');
          feedback.classList.add('text-red-500');
        }
        return;
      }

      // Simulated authentic login success
      const btn = signinForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span class="inline-block animate-spin mr-2">⟳</span> Authenticating...`;
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        if (feedback) {
          feedback.textContent = '✓ Authentication successful! Redirecting to dashboard...';
          feedback.classList.remove('hidden', 'text-red-500');
          feedback.classList.add('text-emerald-600');
        }
      }, 1000);
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pass = document.getElementById('signup-password').value;
      const confirmPass = document.getElementById('signup-confirm-password').value;
      const terms = document.getElementById('signup-terms');
      const feedback = document.getElementById('signup-feedback');

      if (pass !== confirmPass) {
        if (feedback) {
          feedback.textContent = 'Passwords do not match.';
          feedback.classList.remove('hidden', 'text-emerald-600');
          feedback.classList.add('text-red-500');
        }
        return;
      }

      if (terms && !terms.checked) {
        if (feedback) {
          feedback.textContent = 'Please agree to the Terms of Service to continue.';
          feedback.classList.remove('hidden', 'text-emerald-600');
          feedback.classList.add('text-red-500');
        }
        return;
      }

      const btn = signupForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = `<span class="inline-block animate-spin mr-2">⟳</span> Creating Account...`;
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        if (feedback) {
          feedback.textContent = '✓ Account created successfully! Welcome to Novaflow.';
          feedback.classList.remove('hidden', 'text-red-500');
          feedback.classList.add('text-emerald-600');
        }
      }, 1000);
    });
  }
}
