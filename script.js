// Initialize when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize skill bars
  const progressBars = document.querySelectorAll(".progress-line span")
  progressBars.forEach((bar) => {
    const percent = bar.getAttribute("data-percent")
    bar.style.width = percent
  })

  // Initialize skill circles
  const circles = [
    { id: "number1", percent: 90 },
    { id: "number2", percent: 85 },
    { id: "number3", percent: 80 },
    { id: "number4", percent: 75 },
    { id: "number5", percent: 80 },
    { id: "number6", percent: 75 },
  ]

  circles.forEach((circle) => {
    const element = document.getElementById(circle.id)
    if (element) {
      element.textContent = `${circle.percent}%`
    }
  })

  // Typing effect
  const typingElement = document.querySelector(".typing")
  const words = ["Web Developer", "Software Engineer", "Software Tester", "Data Analyst"]
  let wordIndex = 0
  let charIndex = 0
  let isDeleting = false

  function type() {
    const currentWord = words[wordIndex]
    const currentChar = currentWord.substring(0, charIndex)
    typingElement.textContent = currentChar

    if (!isDeleting && charIndex < currentWord.length) {
      // Type the word
      charIndex++
      setTimeout(type, 100)
    } else if (isDeleting && charIndex > 0) {
      // Delete the word
      charIndex--
      setTimeout(type, 50)
    } else {
      // Switch to next word
      isDeleting = !isDeleting
      if (isDeleting) {
        setTimeout(type, 1000) // Pause before deleting
      } else {
        wordIndex = (wordIndex + 1) % words.length
        setTimeout(type, 500) // Pause before typing next word
      }
    }
  }

  // Start typing effect
  type()

  // Header scroll effect
  const header = document.querySelector("header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Theme toggle
  const themeToggle = document.querySelector(".theme-toggle")
  const body = document.body

  // Check for saved theme preference
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme")
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
  } else {
    body.classList.remove("dark-theme")
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
  }

  themeToggle.addEventListener("click", () => {
    // Toggle dark theme class
    body.classList.toggle("dark-theme")

    // Update icon and save preference
    if (body.classList.contains("dark-theme")) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>'
      localStorage.setItem("theme", "dark")
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>'
      localStorage.setItem("theme", "light")
    }
  })

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger")
  const navLinks = document.querySelector(".nav-links")

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    hamburger.classList.toggle("active")

    if (hamburger.classList.contains("active")) {
      hamburger.querySelector("span:nth-child(1)").style.transform = "rotate(45deg) translate(5px, 6px)"
      hamburger.querySelector("span:nth-child(2)").style.opacity = "0"
      hamburger.querySelector("span:nth-child(3)").style.transform = "rotate(-45deg) translate(5px, -6px)"
    } else {
      hamburger.querySelector("span:nth-child(1)").style.transform = "none"
      hamburger.querySelector("span:nth-child(2)").style.opacity = "1"
      hamburger.querySelector("span:nth-child(3)").style.transform = "none"
    }
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active")
      hamburger.classList.remove("active")
      hamburger.querySelector("span:nth-child(1)").style.transform = "none"
      hamburger.querySelector("span:nth-child(2)").style.opacity = "1"
      hamburger.querySelector("span:nth-child(3)").style.transform = "none"
    })
  })

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll("section")
  const navItems = document.querySelectorAll(".nav-links a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active")
      }
    })
  })

  // Scroll to top button
  const scrollToTopBtn = document.querySelector(".scroll-to-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("active")
    } else {
      scrollToTopBtn.classList.remove("active")
    }
  })

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Project filtering with animation
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectItemsFiltered = document.querySelectorAll(".project-item")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      btn.classList.add("active")

      const filterValue = btn.getAttribute("data-filter")

      projectItemsFiltered.forEach((item) => {
        if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, 200)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 200)
        }
      })
    })
  })

  // Skill progress bars animation
  const skillsSection = document.querySelector(".skills")
  let skillsAnimated = false

  window.addEventListener("scroll", () => {
    if (!skillsAnimated && isElementInViewport(skillsSection)) {
      animateSkills()
      skillsAnimated = true
    }
  })

  // Experience section animation
  const experienceSection = document.querySelector(".experience")
  let experienceAnimated = false

  window.addEventListener("scroll", () => {
    if (!experienceAnimated && isElementInViewport(experienceSection)) {
      animateExperience()
      experienceAnimated = true
    }
  })

  // Achievements section animation
  const achievementsSection = document.querySelector(".achievements")
  let achievementsAnimated = false

  window.addEventListener("scroll", () => {
    if (!achievementsAnimated && isElementInViewport(achievementsSection)) {
      animateAchievements()
      achievementsAnimated = true
    }
  })

  // Check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect()
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0
  }

  // Animate skills when they come into view
  function animateSkills() {
    const progressBars = document.querySelectorAll(".progress-line span")
    progressBars.forEach((bar) => {
      const percent = bar.getAttribute("data-percent")
      bar.style.width = percent

      // Add percentage text after the bar
      bar.setAttribute("data-after", percent)
    })

    const skillCircles = document.querySelectorAll(".skill-circle")
    skillCircles.forEach((circle, index) => {
      // Get the correct number element based on its ID
      const numberElement = circle.querySelector(".inner-circle div")
      if (!numberElement) return

      const percentText = numberElement.textContent
      const percent = Number.parseInt(percentText)
      if (isNaN(percent)) return

      // Animate the percentage number when in viewport
      let counter = 0
      const interval = setInterval(() => {
        if (counter >= percent) {
          clearInterval(interval)
        } else {
          counter += 1
          numberElement.textContent = counter + "%"
        }
      }, 20)

      // Style the outer circle with gradient based on percentage
      const outerCircle = circle.querySelector(".outer-circle")
      outerCircle.style.background = `conic-gradient(var(--primary-color) ${percent * 3.6}deg, var(--light-color) 0deg)`
    })
  }

  // Animate experience timeline
  function animateExperience() {
    const timelineItems = document.querySelectorAll(".timeline-item")
    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "1"
        item.style.transform = "translateY(0)"
      }, index * 300)
    })
  }

  // Animate achievements
  function animateAchievements() {
    const achievementItems = document.querySelectorAll(".achievement-item, .stat-item, .cert-item")
    achievementItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "1"
        item.style.transform = "translateY(0)"
      }, index * 200)
    })

    // Animate stat numbers
    const statNumbers = document.querySelectorAll(".stat-number")
    statNumbers.forEach((stat) => {
      const finalNumber = stat.textContent
      const number = parseInt(finalNumber.replace("+", ""))
      let counter = 0
      const increment = number / 50

      const timer = setInterval(() => {
        counter += increment
        if (counter >= number) {
          stat.textContent = finalNumber
          clearInterval(timer)
        } else {
          stat.textContent = Math.floor(counter) + "+"
        }
      }, 50)
    })
  }

  // Form submission with validation
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Simple validation
      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address")
        return
      }

      // Here you would typically send the form data to a server
      // For demo purposes, we'll just log it to console
      console.log({
        name,
        email,
        subject,
        message,
      })

      // Show success message with animation
      const formElements = contactForm.elements
      for (let i = 0; i < formElements.length; i++) {
        formElements[i].disabled = true
      }

      const successMessage = document.createElement("div")
      successMessage.className = "success-message"
      successMessage.innerHTML = `
        <div class="success-icon"><i class="fas fa-check-circle"></i></div>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for your message, ${name}! I will get back to you soon.</p>
      `
      contactForm.innerHTML = ""
      contactForm.appendChild(successMessage)

      // Reset form after 5 seconds
      setTimeout(() => {
        contactForm.innerHTML = `
          <div class="input-row">
            <div class="input-group">
              <input type="text" id="name" required>
              <label for="name">Your Name</label>
            </div>
            <div class="input-group">
              <input type="email" id="email" required>
              <label for="email">Your Email</label>
            </div>
          </div>
          <div class="input-group">
            <input type="text" id="subject" required>
            <label for="subject">Subject</label>
          </div>
          <div class="input-group">
            <textarea id="message" rows="5" required></textarea>
            <label for="message">Your Message</label>
          </div>
          <button type="submit" class="btn primary-btn">Send Message</button>
        `
      }, 5000)
    })
  }

  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Initialize timeline items with initial styles
  const timelineItems = document.querySelectorAll(".timeline-item")
  timelineItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(50px)"
    item.style.transition = "all 0.6s ease"
  })

  // Initialize achievement items with initial styles
  const achievementItems = document.querySelectorAll(".achievement-item, .stat-item, .cert-item")
  achievementItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(30px)"
    item.style.transition = "all 0.6s ease"
  })

  // Update footer copyright year
  const footerYear = document.querySelector('footer .footer-content p')
  if (footerYear) {
    const currentYear = new Date().getFullYear()
    footerYear.textContent = footerYear.textContent.replace('2025', currentYear)
  }
})
