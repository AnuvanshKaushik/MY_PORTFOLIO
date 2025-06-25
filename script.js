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

  // EXPANDED PROJECT DATA - ADD MORE PROJECTS HERE
  const projectData = {
    'ai-image-generator': {
      title: 'AI Image Generator',
      category: 'Web Development',
      description: 'Integrated Cloudinary to streamline image storage, optimization, and delivery, enhancing the overall performance and scalability of the application. Developed a responsive front-end using React, paired with a robust Node.js and Express back-end to ensure seamless API integration and a smooth, efficient user experience across devices.',
      images: [
        '/ProjectCoverImage/Aiimagegen1.png',
        '/ProjectCoverImage/Aiimagegen2.png',
        '/ProjectCoverImage/Aiimagegen3.png'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Cloudinary API'],
      liveUrl: 'https://image-generator-l4ui.vercel.app/',
      githubUrl: 'https://github.com/AnuvanshKaushik/IMAGE_GENERATOR'
    },
    'stock-prediction': {
      title: 'Stock Prediction Analysis',
      category: 'Data Science',
      description: 'Applied Min-Max scaling to normalize stock price data and created time-step based sequential datasets for improved temporal pattern recognition in the prediction model. Visualized true versus predicted stock prices to evaluate model performance across both training and testing periods, highlighting the models ability to capture stock price trends accurately.',
      images: [
        '/ProjectCoverImage/Stock1.png',
        '/ProjectCoverImage/Stock2.png',
        '/ProjectCoverImage/Stock3.png',
        '/ProjectCoverImage/Stock4.png'
      ],
      technologies: ['Python', 'TensorFlow', 'Pandas', 'NumPy', 'Matplotlib'],
      liveUrl: 'https://github.com/username/stock-prediction',
      githubUrl: 'https://github.com/username/stock-prediction'
    },
    'Sales Prediction': {
      title: 'Sales Prediction System',
      category: 'Data Science',
      description: 'Developed a sales prediction web application using HTML, CSS, and JavaScript for a responsive front-end interface, integrated with a Flask back-end. Utilized a Random Forest Regression model for accurate prediction of sales based on historical data. The system allows users to input relevant features and receive real-time sales forecasts, combining machine learning with a user-friendly web interface.',
      images: [
        '/ProjectCoverImage/Sale1.png',
        '/ProjectCoverImage/Sale2.png',
        '/ProjectCoverImage/Sale3.png',
      ],
      technologies: ['html', 'css', 'javascript', 'flask', 'python', 'machine learning'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/AnuvanshKaushik/SALES_PREDICTION'
    },
    'Whether': {
      title: 'Whether Forecasting System',
      category: 'Web Development',
      description: 'Developed a weather forecasting web application using HTML, CSS, and JavaScript that fetches real-time weather data from a public API. The app displays current temperature, weather conditions, humidity, and wind speed with a clean, responsive user interface for a smooth user experience across devices.',
     images: [
        '/ProjectCoverImage/Whether1.png',
        '/ProjectCoverImage/Whether2.png',
        '/ProjectCoverImage/Whether3.png',
        '/ProjectCoverImage/Whether4.png'
      ],
      technologies: ['React Native', 'Firebase', 'Redux', 'AsyncStorage'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/AnuvanshKaushik/Whether_Forecasting'
    },
  }

  // FIXED PROJECT MODAL FUNCTIONALITY
  const projectModal = document.querySelector(".project-modal")
  const projectItems = document.querySelectorAll(".project-item")
  const closeModal = document.querySelector(".close-modal")

  // Open project modal with improved ID detection
  projectItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      // Try multiple ways to get project ID
      let projectId = item.getAttribute("data-project-id") || 
                     item.getAttribute("data-project") ||
                     item.id

      // If no ID found, create one based on index or content
      if (!projectId) {
        const projectKeys = Object.keys(projectData)
        projectId = projectKeys[index] || projectKeys[0] // Use index or first project as fallback
        
        // Log warning for debugging
        console.warn(`No project ID found for project item ${index}. Using: ${projectId}`)
      }

      const project = projectData[projectId]
      
      if (project) {
        // Update modal content
        const modalTitle = document.querySelector(".modal-title")
        const modalCategory = document.querySelector(".modal-category")
        const modalDescription = document.querySelector(".modal-description")
        
        if (modalTitle) modalTitle.textContent = project.title
        if (modalCategory) modalCategory.textContent = project.category
        if (modalDescription) modalDescription.textContent = project.description
        
        // Update gallery
        const galleryMain = document.querySelector(".gallery-main img")
        if (galleryMain && project.images.length > 0) {
          galleryMain.src = project.images[0]
          galleryMain.alt = `${project.title} - Main Image`
        }
        
        // Update thumbnails
        const galleryThumbs = document.querySelector(".gallery-thumbs")
        if (galleryThumbs) {
          galleryThumbs.innerHTML = project.images.map((img, imgIndex) => 
            `<div class="thumb-item ${imgIndex === 0 ? 'active' : ''}" data-index="${imgIndex}">
              <img src="${img}" alt="${project.title} - Image ${imgIndex + 1}">
            </div>`
          ).join('')
        }
        
        // Update tech stack
        const techStack = document.querySelector(".tech-stack")
        if (techStack) {
          techStack.innerHTML = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
          ).join('')
        }
        
        // Update links
        const modalLinks = document.querySelector(".modal-links")
        if (modalLinks) {
          modalLinks.innerHTML = `
            <a href="${project.liveUrl}" target="_blank" class="btn primary-btn">
              <i class="fas fa-external-link-alt"></i> Live Demo
            </a>
            <a href="${project.githubUrl}" target="_blank" class="btn secondary-btn">
              <i class="fab fa-github"></i> View Code
            </a>
          `
        }
        
        // Show modal
        if (projectModal) {
          projectModal.classList.add("active")
          document.body.style.overflow = "hidden"
        }
      } else {
        console.error(`Project data not found for ID: ${projectId}`)
        alert('Project details not available. Please check the project configuration.')
      }
    })
  })

  // Close modal functionality
  if (closeModal) {
    closeModal.addEventListener("click", () => {
      projectModal.classList.remove("active")
      document.body.style.overflow = "auto"
    })
  }

  // Close modal when clicking outside
  if (projectModal) {
    projectModal.addEventListener("click", (e) => {
      if (e.target === projectModal) {
        projectModal.classList.remove("active")
        document.body.style.overflow = "auto"
      }
    })
  }

  // Gallery navigation
  let currentImageIndex = 0
  
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("prev-btn")) {
      const images = document.querySelectorAll(".thumb-item")
      currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1
      updateGalleryImage(currentImageIndex)
    }
    
    if (e.target.classList.contains("next-btn")) {
      const images = document.querySelectorAll(".thumb-item")
      currentImageIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0
      updateGalleryImage(currentImageIndex)
    }
    
    if (e.target.closest(".thumb-item")) {
      const thumbItem = e.target.closest(".thumb-item")
      currentImageIndex = parseInt(thumbItem.getAttribute("data-index"))
      updateGalleryImage(currentImageIndex)
    }
  })

  function updateGalleryImage(index) {
    const mainImage = document.querySelector(".gallery-main img")
    const thumbItems = document.querySelectorAll(".thumb-item")
    const activeThumb = document.querySelector(".thumb-item.active")
    
    if (activeThumb) {
      activeThumb.classList.remove("active")
    }
    
    if (thumbItems[index]) {
      thumbItems[index].classList.add("active")
      const newImageSrc = thumbItems[index].querySelector("img").src
      if (mainImage) {
        mainImage.src = newImageSrc
      }
    }
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && projectModal && projectModal.classList.contains("active")) {
      projectModal.classList.remove("active")
      document.body.style.overflow = "auto"
    }
  })

  // Rest of your existing code remains the same...
  // [All other functions remain unchanged]

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
